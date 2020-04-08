<?php

namespace App\Events\Queueable;

use App\Events\MessageSent;
use Illuminate\Contracts\Broadcasting\ShouldBroadcast;

class SentMessage extends MessageSent implements ShouldBroadcast
{

}
