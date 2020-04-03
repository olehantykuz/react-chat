<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\DatabaseNotification;
use Illuminate\Notifications\DatabaseNotificationCollection;
use Illuminate\Notifications\Notifiable;
use Illuminate\Support\Carbon;
use Tymon\JWTAuth\Contracts\JWTSubject;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

/**
 * App\Models\User
 *
 * @property int $id
 * @property string $name
 * @property string $email
 * @property Carbon|null $email_verified_at
 * @property string $password
 * @property string|null $remember_token
 * @property Carbon|null $created_at
 * @property Carbon|null $updated_at
 * @property-read Collection|User[] $contactsFrom
 * @property-read int|null $contacts_from_count
 * @property-read Collection|User[] $contactsTo
 * @property-read int|null $contacts_to_count
 * @property-read Collection|User[] $friendsOf
 * @property-read int|null $friends_of_count
 * @property-read Collection|User[] $friendsOfMine
 * @property-read int|null $friends_of_mine_count
 * @property-read mixed $contacted
 * @property-read mixed $friends
 * @property-read Collection|\App\Models\Message[] $messages
 * @property-read int|null $messages_count
 * @property-read DatabaseNotificationCollection|DatabaseNotification[] $notifications
 * @property-read int|null $notifications_count
 * @property-read Collection|User[] $requestFriendsBy
 * @property-read int|null $request_friends_by_count
 * @property-read Collection|User[] $requestedFriendsTo
 * @property-read int|null $requested_friends_to_count
 * @method static Builder|User newModelQuery()
 * @method static Builder|User newQuery()
 * @method static Builder|User query()
 * @method static Builder|User whereCreatedAt($value)
 * @method static Builder|User whereEmail($value)
 * @method static Builder|User whereEmailVerifiedAt($value)
 * @method static Builder|User whereId($value)
 * @method static Builder|User whereName($value)
 * @method static Builder|User wherePassword($value)
 * @method static Builder|User whereRememberToken($value)
 * @method static Builder|User whereUpdatedAt($value)
 * @mixin \Eloquent
 */
class User extends Authenticatable implements JWTSubject
{
    use Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'name', 'email', 'password',
    ];

    /**
     * The attributes that should be hidden for arrays.
     *
     * @var array
     */
    protected $hidden = [
        'password', 'remember_token',
    ];

    /**
     * The attributes that should be cast to native types.
     *
     * @var array
     */
    protected $casts = [
        'email_verified_at' => 'datetime',
    ];

    /**
     * A user can have many messages
     *
     * @return HasMany
     */
    public function messages()
    {
        return $this->hasMany(Message::class);
    }

    /**
     * User can have many friendship requests sent
     *
     * @return BelongsToMany
     */
    public function contactsTo()
    {
        return $this->belongsToMany(self::class, 'friends', 'user_id', 'friend_id')
            ->withTimestamps();
    }

    /**
     * User can have many incoming friendship requests
     *
     * @return BelongsToMany
     */
    public function contactsFrom()
    {
        return $this->belongsToMany(self::class, 'friends', 'friend_id', 'user_id')
            ->withTimestamps();
    }

    /**
     * All user contacts (incoming and outgoing)
     *
     * @return mixed
     */
    public function getContactedAttribute()
    {
        if ( !array_key_exists('contacted', $this->relations)) {
            $this->setRelation('contacted',
                $this->contactsTo->merge($this->contactsFrom)
            );
        }

        return $this->getRelation('contacted');
    }

    /**
     * @return BelongsToMany
     */
    public function requestedFriendsTo()
    {
        return $this->belongsToMany(self::class, 'friends', 'user_id', 'friend_id')
            ->wherePivot('accepted_at', '=', null)
            ->withTimestamps();
    }

    /**
     * @return BelongsToMany
     */
    public function requestFriendsBy()
    {
        return $this->belongsToMany(self::class, 'friends', 'friend_id', 'user_id')
            ->wherePivot('accepted_at', '=', null)
            ->withTimestamps();
    }

    /**
     * @return BelongsToMany
     */
    public function friendsOfMine()
    {
        return $this->belongsToMany(self::class, 'friends', 'user_id', 'friend_id')
            ->wherePivot('accepted_at', '!=', null)
            ->withPivot('accepted_at')
            ->withTimestamps();
    }

    /**
     * @return BelongsToMany
     */
    public function friendsOf()
    {
        return $this->belongsToMany(self::class, 'friends', 'friend_id', 'user_id')
            ->wherePivot('accepted_at', '!=', null)
            ->withPivot('accepted_at')
            ->withTimestamps();
    }

    /**
     * @return mixed
     */
    public function getFriendsAttribute()
    {
        if ( !$this->relationLoaded('friends')) {
            $this->setRelation('friends', $this->mergeFriends());
        }

        return $this->getRelation('friends');
    }

    /**
     * @return mixed
     */
    protected function mergeFriends()
    {
        return $this->friendsOfMine->merge($this->friendsOf);
    }

    /**
     * Get the identifier that will be stored in the subject claim of the JWT.
     *
     * @return mixed
     */
    public function getJWTIdentifier()
    {
        return $this->getKey();
    }

    /**
     * Return a key value array, containing any custom claims to be added to the JWT.
     *
     * @return array
     */
    public function getJWTCustomClaims()
    {
        return [];
    }
}
