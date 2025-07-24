<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use ApiPlatform\Metadata\ApiResource;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use App\Traits\HasUuid;
use Spatie\Permission\Traits\HasRoles;
// API requests
use ApiPlatform\Metadata\GetCollection;
use ApiPlatform\Metadata\Get;
use ApiPlatform\Metadata\Post;
use ApiPlatform\Metadata\Patch;
use ApiPlatform\Metadata\Delete;

use App\Contracts\BelongsToUser;
use App\Traits\AutoAssignsUserId;
use App\Api\State\AssignEventRegistrationUserProcessor;

#[ApiResource( 
    operations: [
        new GetCollection(security: "is_granted('super-admin') or is_granted('volunteer')"),
        new Get(security: "is_granted('super-admin') or is_granted('volunteer')"),
        new Post(
            security: "is_granted('super-admin') or is_granted('user')",
            processor: AssignEventRegistrationUserProcessor::class
        ),
        new Patch(security: "is_granted('super-admin') or is_granted('volunteer')"),
        new Delete(security: "is_granted('super-admin')")
    ]
)]

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


