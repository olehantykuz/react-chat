<?php

namespace App\Events\Now;

use App\Events\MessageSent;
use Illuminate\Contracts\Broadcasting\ShouldBroadcastNow;

class SentMessage extends MessageSent implements ShouldBroadcastNow
{

}
