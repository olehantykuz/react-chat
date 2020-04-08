<?php

namespace App\Events;

use App\Models\Message;
use App\Models\Room;
use App\Models\User;
use Illuminate\Broadcasting\Channel;
use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Broadcasting\PresenceChannel;
use Illuminate\Broadcasting\PrivateChannel;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Queue\SerializesModels;

class MessageSent
{
    use Dispatchable, InteractsWithSockets, SerializesModels;

    /**
     * Message details
     *
     * @var Message
     */
    public $message;
    /**
     * @var User
     */
    public $room;

    /**
     * Create a new event instance.
     *
     * @param Message $message
     * @param Room $room
     */
    public function __construct(Message $message, Room $room)
    {
        $this->message = $message;
        $this->room = $room;
    }

    /**
     * Get the channels the event should broadcast on.
     *
     * @return \Illuminate\Broadcasting\Channel|array
     */
    public function broadcastOn()
    {
        return new PrivateChannel('message.to.room.' . $this->room->id);
    }

    /**
     * @return string
     */
    public function broadcastAs()
    {
        return 'message.send';
    }
}
