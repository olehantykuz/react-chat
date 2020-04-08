<?php

namespace App\Http\Controllers\App;

use App\Events\FriendConfirm;
use App\Events\FriendRequest;
use App\Http\Controllers\ApiController;
use App\Http\Resources\Room as RoomResource;
use App\Models\User;
use App\Services\RoomService;
use App\Services\UserService;
use Illuminate\Contracts\Validation\Validator;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use App\Http\Resources\User as UserResource;

class ContactController extends ApiController
{
    /** @var UserService  */
    protected $userService;
    /** @var RoomService  */
    protected $roomService;

    /**
     * ContactController constructor.
     */
    public function __construct()
    {
        $this->userService = new UserService();
        $this->roomService = new RoomService();
        parent::__construct();
    }

    /**
     * @param Request $request
     * @return JsonResponse|\Illuminate\Http\Resources\Json\AnonymousResourceCollection
     */
    public function searchNewContacts(Request $request)
    {
        /** @var Validator $validator */
        $validator = \Validator::make($request->all(), [
            'query' => 'nullable|string'
        ]);
        if ($validator->fails()) {

            return response()->json(['errors' => $validator->errors()], 400);
        }

        $query = $request->get('query', '');
        /** @var User $authUser */
        $authUser = \Auth::user();
        $users = $this->userService->findNewContacts($query, $authUser);

        return UserResource::collection($users);
    }

    /**
     * @param User $user
     * @return JsonResponse
     */
    public function addToFriend(User $user)
    {
        /** @var User $sender */
        $sender = \Auth::user();

        $result = $this->userService->requestToFriend($sender, $user);
        if ($result) {
            broadcast(new FriendRequest($sender, $user))->toOthers();

            return response()->json(['recipient' => new UserResource($user)], 200);
        }

        return response()->json(['error' => 'Contact already exists'], 400);
    }

    /**
     * @param User $user
     * @return JsonResponse
     */
    public function confirmFriend(User $user)
    {
        /** @var User $sender */
        $sender = \Auth::user();
        $result = $this->userService->confirmFriendsInvite($sender, $user);

        if ($result) {
            $room = $this->roomService->create(collect([$sender->id, $user->id]));
            $this->userService->loadRooms($user);
            broadcast(new FriendConfirm($sender, $user, $room))->toOthers();

            return response()->json([
                'recipient' => new UserResource($user),
                'room' => new RoomResource($room),
                'roomId' => $room->id,
            ], 200);
        }

        return response()->json(['error' => 'Friend request not found'], 404);
    }

}
