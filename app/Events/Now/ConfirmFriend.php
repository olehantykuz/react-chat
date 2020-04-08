<?php

namespace App\Events\Now;

use App\Events\FriendConfirm;
use Illuminate\Contracts\Broadcasting\ShouldBroadcastNow;

class ConfirmFriend extends FriendConfirm implements ShouldBroadcastNow
{

}
