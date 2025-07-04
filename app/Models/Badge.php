<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

class Badge extends Model
{
    protected $table = 'badges';
    protected $primaryKey = 'badge_id';
    public $incrementing = true;

    protected $fillable = [
        'name',
        'description',
        'icon',
        'criteria',
        'points_value'
    ];

    protected $casts = [
        'criteria' => 'array',
        'points_value' => 'integer',
        'created_at' => 'datetime',
        'updated_at' => 'datetime',
    ];

    protected $attributes = [
        'points_value' => 0
    ];

    /**
     * Users who earned this badge
     */
    public function users(): BelongsToMany
    {
        return $this->belongsToMany(User::class, 'user_badges', 'badge_id', 'user_id')
            ->withPivot('earned_at', 'progress_data')
            ->withTimestamps();
    }

    /**
     * Check if a specific user has earned this badge
     */
    public function hasBeenEarnedBy(string $userId): bool
    {
        return $this->users()->where('user_id', $userId)->exists();
    }

    /**
     * Get the progress data for a specific user
     */
    public function getUserProgress(string $userId): ?array
    {
        return $this->users()
            ->where('user_id', $userId)
            ->first()
            ?->pivot
            ?->progress_data;
    }

    /**
     * Scope for badges earned by a specific user
     */
    public function scopeEarnedBy($query, string $userId)
    {
        return $query->whereHas('users', fn($q) => $q->where('user_id', $userId));
    }

}