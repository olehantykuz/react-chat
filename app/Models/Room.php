<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Support\Carbon;

/**
 * App\Models\Room
 *
 * @property int $id
 * @property string|null $name
 * @property int $is_group
 * @property Carbon|null $deleted_at
 * @property Carbon|null $created_at
 * @property Carbon|null $updated_at
 * @property-read Collection|Message[] $messages
 * @property-read int|null $messages_count
 * @property-read Collection|User[] $users
 * @property-read int|null $users_count
 * @method static bool|null forceDelete()
 * @method static Builder|Room newModelQuery()
 * @method static Builder|Room newQuery()
 * @method static \Illuminate\Database\Query\Builder|Room onlyTrashed()
 * @method static Builder|Room query()
 * @method static bool|null restore()
 * @method static Builder|Room whereCreatedAt($value)
 * @method static Builder|Room whereDeletedAt($value)
 * @method static Builder|Room whereId($value)
 * @method static Builder|Room whereIsGroup($value)
 * @method static Builder|Room whereName($value)
 * @method static Builder|Room whereUpdatedAt($value)
 * @method static \Illuminate\Database\Query\Builder|Room withTrashed()
 * @method static \Illuminate\Database\Query\Builder|Room withoutTrashed()
 * @mixin \Eloquent
 */
class Room extends Model
{
    use SoftDeletes;

    /**
     * Fields that are mass assignable
     *
     * @var array
     */
    protected $fillable = [
        'name',
        'is_group',
    ];

    /**
     * @return BelongsToMany
     */
    public function users()
    {
        return $this->belongsToMany(User::class, 'room_user');
    }

    /**
     * @return HasMany
     */
    public function messages()
    {
        return $this->hasMany(Message::class);
    }

}
