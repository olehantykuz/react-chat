<?php

namespace App\Http\Controllers\App;

use App\Http\Controllers\ApiController;
use App\Http\Requests\CreateMessage;
use App\Models\User;
use App\Services\MessageService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;
use App\Events\MessageSent;

class ChatsController extends ApiController
{
    protected $messageService;

    public function __construct()
    {
        $this->messageService = new MessageService();
        parent::__construct();
    }

    /**
     * Fetch all messages
     *
     * @return \Illuminate\Http\JsonResponse
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
     * @return \Illuminate\Http\JsonResponse
     */
    public function sendMessage(Request $request)
    {
        $validator = Validator::make($request->all(), with(new CreateMessage())->rules());
        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 400);
        }

        /** @var User $user */
        $user = Auth::user();
        $message = $this->messageService->create(
            $user, $request->input('text')
        );
        broadcast(new MessageSent($message))->toOthers();

        return response()->json(['message' => $message]);
    }
}
