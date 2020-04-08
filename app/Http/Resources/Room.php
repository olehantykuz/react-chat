<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class Room extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array
     */
    public function toArray($request)
    {
        return [
            'id' => $this->id,
            'name' => $this->name,
            'isGroup' => $this->is_group,
            'users' => User::collection($this->users),
            'messages' => Message::collection($this->whenLoaded('messages')),
        ];
    }
}
