<?php


namespace App\Services;

use App\Models\User;
use Illuminate\Support\Collection;
use Illuminate\Support\Facades\Hash;
use Carbon\Carbon;

class UserService
{
    /**
     * @param array $data
     * @return mixed
     */
    public function create(array $data)
    {
        return User::create([
            'name' => $data['name'],
            'email' => $data['email'],
            'password' => Hash::make($data['password']),
        ]);
    }

    /**
     * @param string $query
     * @param int $senderId
     * @param int|null $count
     * @return mixed
     */
    public function findNewContacts(?string $query, int $senderId, ?int $count = 5)
    {
        $excludeIds = [$senderId];

        if (!$query || $query === ' ') {
            $q = User::whereNotIn('id', $excludeIds);
        } else {
            $q = User::where('name', 'like', '%' . $query . '%')
                ->orWhere('email', 'like', '%' . $query . '%')
                ->whereNotIn('id', $excludeIds);
        }

        return $q->take($count)
            ->get();
    }

    /**
     * @param User $sender
     * @param User $recipient
     * @return array|null
     */
    public function requestToFriend(User $sender, User $recipient)
    {
        /** @var Collection $contacted */
        $contacted = $sender->contacted->pluck('id');
        if ($contacted->contains($recipient->id)) {

            return null;
        }

        return $sender->friendsOfMine()
            ->syncWithoutDetaching([$recipient->id]);
    }

    /**
     * @param User $acceptor
     * @param User $recipient
     * @return int|null
     */
    public function confirmFriendsInvite(User $acceptor, User $recipient)
    {
        /** @var Collection $requestedIds */
        $requestedIds = $acceptor->requestFriendsBy->pluck('id');
        if ($requestedIds->contains($recipient->id)) {

            return $acceptor->requestFriendsBy()
                ->updateExistingPivot($recipient->id, ['accepted_at' => Carbon::now()]);
        }

        return null;
    }

    /**
     * @param User $user
     * @return User
     */
    public function loadFriendRelations(User $user)
    {
        $user->load(['requestedFriendsTo', 'requestFriendsBy']);
        $user->friends;

        return $user;
    }
}
