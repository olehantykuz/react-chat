<?php

namespace App\Http\Controllers\App;

use App\Http\Controllers\ApiController;
use App\Http\Requests\CreateMessage;
use App\Models\Room;
use App\Models\User;
use App\Services\MessageService;
use App\Services\RoomService;
use Illuminate\Http\Request;
use App\Events\MessageSent;
use Illuminate\Http\JsonResponse;
use App\Http\Resources\Message as MessageResource;

class RoomsController extends ApiController
{
    /**
     * @var MessageService
     */
    protected $messageService;
    /**
     * @var RoomService
     */
    protected $roomService;

    public function __construct()
    {
        $this->messageService = new MessageService();
        $this->roomService = new RoomService();
        parent::__construct();
    }

    /**
     * @param Room $room
     * @return JsonResponse
     */
    public function fetchConversation (Room $room)
    {
        return response()->json([
            'messages' => MessageResource::collection(
                $this->roomService->getMessagesByRoom($room)
            ),
        ]);
    }

    /**
     * @param Room $room
     * @param Request $request
     * @return JsonResponse
     */
    public function sendMessage(Room $room, Request $request)
    {
        $validator = \Validator::make($request->all(), with(new CreateMessage())->rules());
        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 400);
        }

        /** @var User $user */
        $user = \Auth::user();
        $message = $this->messageService->create($user, $room, $request->input('text'));
        broadcast(new MessageSent($message, $room))->toOthers();

        return response()->json(['message' => $message]);
    }
}
