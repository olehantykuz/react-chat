<?php

namespace App\Models;

use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Tymon\JWTAuth\Contracts\JWTSubject;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

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
     * @return \Illuminate\Database\Eloquent\Relations\HasMany
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
            ->wherePivot('accepted_at', '!=', null) // to filter only accepted
            ->withPivot('accepted_at')
            ->withTimestamps();
    }

    /**
     * @return BelongsToMany
     */
    public function friendsOf()
    {
        return $this->belongsToMany(self::class, 'friends', 'friend_id', 'user_id')
            ->wherePivot('accepted_at', '!=', null) // to filter only accepted
            ->withPivot('accepted_at')
            ->withTimestamps();
    }

    /**
     * @return mixed
     */
    public function getFriendsAttribute()
    {
        if ( !array_key_exists('friends', $this->relations)) {
            $this->loadFriends();
        }

        return $this->getRelation('friends');
    }

    protected function loadFriends()
    {
        if ( !array_key_exists('friends', $this->relations)) {
            $this->setRelation('friends', $this->mergeFriends());
        }
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
