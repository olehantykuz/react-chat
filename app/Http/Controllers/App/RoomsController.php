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

class RoomsController extends ApiController
{
    protected $messageService;
    protected $roomService;

    public function __construct()
    {
        $this->messageService = new MessageService();
        $this->roomService = new RoomService();
        parent::__construct();
    }

    /**
     * Fetch all messages
     *
     * @return JsonResponse
     */
    public function fetchMessages()
    {
        return response()->json([
            'messages' => $this->messageService->getAll()
        ]);
    }

    /**
     * Save message
     *
     * @param  Request $request
     * @return JsonResponse
     */
    public function sendMessage(Request $request)
    {
        $validator = \Validator::make($request->all(), with(new CreateMessage())->rules());
        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 400);
        }

        /** @var User $user */
        $user = \Auth::user();
        $message = $this->messageService->create(
            $user, $request->input('text')
        );
        broadcast(new MessageSent($message))->toOthers();

        return response()->json(['message' => $message]);
    }
}
