<?php

namespace App\Events;

use App\Models\User;
use Illuminate\Broadcasting\Channel;
use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Broadcasting\PresenceChannel;
use Illuminate\Broadcasting\PrivateChannel;
use Illuminate\Contracts\Broadcasting\ShouldBroadcast;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Queue\SerializesModels;

class FriendConfirm implements ShouldBroadcast
{
    use Dispatchable, InteractsWithSockets, SerializesModels;

    public $sender;
    public $recipient;
    public $roomId;

    /**
     * Create a new event instance.
     *
     * @param User $sender
     * @param User $recipient
     * @param int $roomId
     */
    public function __construct(User $sender, User $recipient, int $roomId)
    {
        $this->sender = $sender->withoutRelations();
        $this->recipient = $recipient;
        $this->roomId = $roomId;
    }

    /**
     * Get the channels the event should broadcast on.
     *
     * @return \Illuminate\Broadcasting\Channel|array
     */
    public function broadcastOn()
    {
        return new PrivateChannel('confirm.friend.to.' . $this->recipient->id);
    }

    /**
     * @return string
     */
    public function broadcastAs()
    {
        return 'confirm.friend';
    }
}
