<?php

namespace App\Services;

use App\Models\Room;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Collection;

class RoomService
{
    /**
     * @param Collection $participantsIds
     * @param string|null $name
     * @return Room|Model
     */
    public function create(Collection $participantsIds, ?string $name = null)
    {
        $room = Room::create(['name' => $name]);
        $room->users()->attach($participantsIds);

        return $room;
    }

    /**
     * @param Room $room
     * @return \Illuminate\Database\Eloquent\Collection
     */
    public function getMessagesByRoom(Room $room)
    {
        return $room->messages()
            ->with('user')
            ->get();
    }
}
