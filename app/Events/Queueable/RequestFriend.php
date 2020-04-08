<?php

namespace App\Events\Queueable;

use App\Events\FriendRequest;
use Illuminate\Contracts\Broadcasting\ShouldBroadcast;

class RequestFriend extends FriendRequest implements ShouldBroadcast
{

}
