<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use ApiPlatform\Metadata\ApiResource;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use App\Traits\HasUuid;

#[ApiResource]
class EventRegistration extends Model
{
    use HasFactory;
    use HasUuid;

    protected $table = 'event_registration';
    protected $primaryKey = 'registration_id';
    protected $keyType = 'string';
    public $incrementing = false;

    protected $fillable = ['user_id', 'event_id', 'event_registration_status', 'created_at', 'updated_at', 'approved_at', 'notes'];

    protected $casts = [
        'created_at' => 'datetime',
        'updated_at' => 'datetime',
        'approved_at' => 'datetime',
    ];

    /**
     * Get the user that owns the registration.
     */
    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class, 'user_id', 'user_id');
    }

    /**
     * Get the event that the registration belongs to.
     */
    public function event(): BelongsTo
    {
        return $this->belongsTo(Event::class, 'event_id', 'event_id');
    }
}


