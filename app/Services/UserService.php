<?php


namespace App\Services;

use App\Models\User;
use Illuminate\Support\Collection;
use Illuminate\Support\Facades\Hash;

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
}
