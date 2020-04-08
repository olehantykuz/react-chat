<?php

namespace App\Events\Now;

use App\Events\FriendRequest;
use Illuminate\Contracts\Broadcasting\ShouldBroadcastNow;

class RequestFriend extends FriendRequest implements ShouldBroadcastNow
{

}
