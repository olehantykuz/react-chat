<?php


namespace App\Services;

use App\Models\Room;
use App\Models\User;
use App\Models\Message;

class MessageService
{
    /**
     * @param User $user
     * @param Room $room
     * @param string $text
     *
     * @return Message
     */
    public function create(User $user, Room $room, string $text)
    {
        $message = new Message;
        $message->text = $text;
        $message->user()->associate($user);
        $message->room()->associate($room);
        $message->save();

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
