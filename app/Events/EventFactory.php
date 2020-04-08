<?php

namespace App\Events;

use App\Events\Queueable\ConfirmFriend as ConfirmFriendQueue;
use App\Events\Now\ConfirmFriend as ConfirmFriendNow;
use App\Events\Queueable\RequestFriend as RequestFriendQueue;
use App\Events\Now\RequestFriend as RequestFriendNow;
use App\Events\Queueable\SentMessage as SentMessageQueue;
use App\Events\Now\SentMessage as SentMessageNow;
use App\Models\Message;
use App\Models\Room;
use App\Models\User;

class EventFactory
{
    /**
     * @var bool
     */
    protected $isQueue;

    /**
     * EventFactory constructor.
     */
    public function __construct()
    {
        $this->isQueue = config('queue.default') !== 'sync';
    }

    /**
     * @param User $sender
     * @param User $recipient
     * @param Room $room
     * @return ConfirmFriendNow|ConfirmFriendQueue
     */
    public function makeConfirmFriendEvent(User $sender, User $recipient, Room $room)
    {
        return $this->isQueue
            ? new ConfirmFriendQueue($sender, $recipient, $room)
            : new ConfirmFriendNow($sender, $recipient, $room);
    }

    /**
     * @param User $sender
     * @param User $recipient
     * @return RequestFriendNow|RequestFriendQueue
     */
    public function makeRequestFriendEvent(User $sender, User $recipient)
    {
        return $this->isQueue
            ? new RequestFriendQueue($sender, $recipient)
            : new RequestFriendNow($sender, $recipient);
    }

    /**
     * @param Message $message
     * @param Room $room
     * @return SentMessageNow|SentMessageQueue
     */
    public function makeSentMessageEvent(Message $message, Room $room)
    {
        return $this->isQueue
            ? new SentMessageQueue($message, $room)
            : new SentMessageNow($message, $room);
    }
}
