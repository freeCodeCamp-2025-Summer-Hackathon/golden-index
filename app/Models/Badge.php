<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Badge extends Model
{
    protected $table      = 'badges';
    protected $primaryKey = 'badge_id';
    public $incrementing  = true;

    protected $fillable = [
        'name',
        'description',
        'icon',
        'criteria',
        'points_value',
    ];

    protected $casts = [
        'criteria'     => 'array',
        'points_value' => 'integer',
    ];

    protected $attributes = [
        'points_value' => 0,
    ];

    // Relationship through pivot model
    public function userBadges(): HasMany
    {
        return $this->hasMany(UserBadge::class, 'badge_id');
    }

    // Many-to-many shortcut (optional)
    public function users(): BelongsToMany
    {
        return $this->belongsToMany(User::class, 'user_badges', 'badge_id', 'user_id')
            ->using(UserBadge::class)
            ->withPivot('earned_at', 'progress_data');
    }
}
