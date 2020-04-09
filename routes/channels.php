<?php

use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Broadcast;

/*
|--------------------------------------------------------------------------
| Broadcast Channels
|--------------------------------------------------------------------------
|
| Here you may register all of the event broadcasting channels that your
| application supports. The given channel authorization callbacks are
| used to check if an authenticated user can listen to the channel.
|
*/

Broadcast::channel('request.friend.to.{userId}', function ($user, $userId) {
    return \Auth::check();
});

Broadcast::channel('confirm.friend.to.{userId}', function ($user, $userId) {
    return \Auth::check();
});

Broadcast::channel('message.to.room.{userId}', function ($user, $roomId) {
    $roomsIds = $user->rooms->pluck('id');

    return $roomsIds->contains($roomId);
});

Broadcast::channel('App.User.{id}', function ($user, $id) {
    return (int) $user->id === (int) $id;
});
