<?php
namespace App\Models;

use App\Traits\HasUuid;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class VolunteerTimeLog extends Model
{
    use HasFactory, HasUuid;

    protected $primaryKey = 'volunteer_time_log_id';
    public $incrementing  = false;
    protected $keyType    = 'string';

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'user_id',
        'event_id',
        'check_in_time',
        'check_out_time',
        'log_method',
        'is_disputed',
        'hours_logged',
        'dispute_reason',
        'volunteer_time_log_status',
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var list<string>
     */
    protected $hidden = [

    ];

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'check_in_time'  => 'datetime',
            'check_out_time' => 'datetime',
            'is_disputed'    => 'boolean',
            'hours_logged'   => 'decimal:2',
            'created_at'     => 'datetime',
            'updated_at'     => 'datetime',
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
