<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Support\Facades\Auth;

class User extends JsonResource
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
            'email' => $this->email,
            'requestedFriendsTo' => self::collection($this->when(
                $this->checkIfNeedRelation('requestedFriendsTo'),
                $this->resource->requestedFriendsTo
            )),
            'requestFriendsBy' => self::collection($this->when(
                $this->checkIfNeedRelation('requestFriendsBy'),
                $this->resource->requestFriendsBy
            )),
            'friends' => self::collection($this->when(
                $this->checkIfNeedRelation('friends'),
                $this->resource->friends
            )),
        ];
    }

    /**
     * @param string $relationName
     * @return bool
     */
    protected function checkIfNeedRelation(string $relationName)
    {
        return (Auth::id() == $this->id) && $this->resource->relationLoaded($relationName);
    }
}
