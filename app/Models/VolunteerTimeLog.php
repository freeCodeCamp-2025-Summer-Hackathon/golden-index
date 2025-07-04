<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Traits\HasUuid;

class VolunteerTimeLog extends Model
{
    use HasFactory,HasUuid;
    protected $table = 'volunteers_time_log';

    protected $primaryKey = 'volunteer_time_log_id';
    public $incrementing = false;
    protected $keyType = 'string';

    public $timestamps = true;

    protected $fillable = [
        'user_id',
        'event_id',
        'log_method',
        'dispute_reason',
        'status',
    ];

    
    protected function casts(): array
    {
        return [
            'check_in_time' => 'datetime',
            'check_out_time' => 'datetime',
            'is_disputed' => 'boolean',
            'hours_logged' => 'decimal:2',
            'created_at' => 'datetime',
            'updated_at' => 'datetime'
        ];
    }

    
    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function event()
    {
        return $this->belongsTo(Event::class);
    }
}
