<?php

namespace App\Events;

use App\Models\Room;
use App\Models\User;
use Illuminate\Broadcasting\Channel;
use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Broadcasting\PresenceChannel;
use Illuminate\Broadcasting\PrivateChannel;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Queue\SerializesModels;

class FriendConfirm
{
    use Dispatchable, InteractsWithSockets, SerializesModels;

    public $sender;
    public $recipient;
    public $room;

    /**
     * Create a new event instance.
     *
     * @param User $sender
     * @param User $recipient
     * @param Room $room
     */
    public function __construct(User $sender, User $recipient, Room $room)
    {
        $this->sender = $sender->withoutRelations();
        $this->recipient = $recipient;
        $this->room = $room;
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
