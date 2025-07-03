<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Relations\Pivot;

class UserBadge extends Pivot
{
    protected $table = 'user_badges';

    // Required because we're using UUID for user_id
    public $incrementing = false;
    protected $keyType   = 'string';

    protected $casts = [
        'earned_at'     => 'datetime',
        'progress_data' => 'array',
    ];

    // Relationships
    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function badge()
    {
        return $this->belongsTo(Badge::class, 'badge_id');
    }

}
