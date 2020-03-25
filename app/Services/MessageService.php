<?php


namespace App\Services;

use App\Models\User;
use App\Models\Message;

class MessageService
{
    /**
     * @param User $user
     * @param string $text
     *
     * @return Message
     */
    public function create(User $user, string $text)
    {
        /** @var Message $message */
        $message = $user->messages()->create([
            'text' => $text
        ]);
        $message->load('user');

        return $message;
    }

    /**
     * @return \Illuminate\Database\Eloquent\Builder[]|\Illuminate\Database\Eloquent\Collection
     */
    public function getAll()
    {
        return Message::with('user')->get();
    }
}
