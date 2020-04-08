<?php

namespace App\Events\Queueable;

use App\Events\FriendConfirm;
use Illuminate\Contracts\Broadcasting\ShouldBroadcast;

class ConfirmFriend extends FriendConfirm implements ShouldBroadcast
{

}
