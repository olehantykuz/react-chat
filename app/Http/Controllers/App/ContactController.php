<?php

namespace App\Http\Controllers\App;

use App\Http\Controllers\ApiController;
use App\Models\User;
use App\Services\UserService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;
use Illuminate\Http\JsonResponse;
use App\Http\Resources\User as UserResource;

class ContactController extends ApiController
{
    /** @var UserService  */
    protected $userService;

    /**
     * ContactController constructor.
     */
    public function __construct()
    {
        $this->userService = new UserService();
        parent::__construct();
    }

    /**
     * @param Request $request
     * @return JsonResponse|\Illuminate\Http\Resources\Json\AnonymousResourceCollection
     */
    public function searchNewContacts(Request $request)
    {
        /** @var \Illuminate\Contracts\Validation\Validator $validator */
        $validator = Validator::make($request->all(), [
            'query' => 'nullable|string'
        ]);
        if ($validator->fails()) {

            return response()->json(['errors' => $validator->errors()], 400);
        }

        $query = $request->get('query', '');
        $users = $this->userService->findNewContacts($query, Auth::id());

        return UserResource::collection($users);
    }

    /**
     * @param User $user
     * @return JsonResponse
     */
    public function addToFriend(User $user)
    {
        /** @var User $sender */
        $sender = Auth::user();

        $result = $this->userService->requestToFriend($sender, $user);

        return $result
            ? response()->json(['contact' => 'Contact already exists'], 400)
            : response()->json(['id' => $result['attached'][0]], 200);
    }

    /**
     * @param User $user
     * @return JsonResponse
     */
    public function confirmFriend(User $user)
    {
        /** @var User $sender */
        $sender = Auth::user();
        $result = $this->userService->confirmFriendsInvite($sender, $user);

        return $result
            ? response()->json(['contact' => 'Friend request not found'], 404)
            : response()->json(['id' => $result], 200);
    }

}
