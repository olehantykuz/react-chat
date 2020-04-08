<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Query\Builder as QueryBuilder;
use Illuminate\Support\Carbon;
use Illuminate\Database\Eloquent\SoftDeletes;

/**
 * App\Models\Message
 *
 * @property int $id
 * @property int $user_id
 * @property string $text
 * @property Carbon|null $created_at
 * @property Carbon|null $updated_at
 * @property-read User $user
 * @method static Builder|Message newModelQuery()
 * @method static Builder|Message newQuery()
 * @method static Builder|Message query()
 * @method static Builder|Message whereCreatedAt($value)
 * @method static Builder|Message whereId($value)
 * @method static Builder|Message whereText($value)
 * @method static Builder|Message whereUpdatedAt($value)
 * @method static Builder|Message whereUserId($value)
 * @mixin \Eloquent
 * @property int $room_id
 * @property Carbon|null $deleted_at
 * @property-read Room $room
 * @method static bool|null forceDelete()
 * @method static QueryBuilder|Message onlyTrashed()
 * @method static bool|null restore()
 * @method static Builder|Message whereDeletedAt($value)
 * @method static Builder|Message whereRoomId($value)
 * @method static QueryBuilder|Message withTrashed()
 * @method static QueryBuilder|Message withoutTrashed()
 */
class Message extends Model
{
    use SoftDeletes;

    /**
     * Fields that are mass assignable
     *
     * @var array
     */
    protected $fillable = ['text'];

    /**
     * A message belong to a user
     *
     * @return BelongsTo
     */
    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function room()
    {
        return $this->belongsTo(Room::class);
    }
}
