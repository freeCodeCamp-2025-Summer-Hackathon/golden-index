<?php

namespace App\Models;

use ApiPlatform\Metadata\ApiResource;
use ApiPlatform\Metadata\GetCollection;
use ApiPlatform\Metadata\Get;
use ApiPlatform\Metadata\Post;
use ApiPlatform\Metadata\Patch;
use ApiPlatform\Metadata\Delete;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Symfony\Component\Serializer\Attribute\Groups;
use App\Contracts\BelongsToUser;
use App\Traits\AutoAssignsUserId;
use App\Api\State\AssignUserProcessor;

#[ApiResource(
    operations: [
        new GetCollection(
            security: "is_granted('super-admin') or is_granted('organisation-admin') or is_granted('event-organiser')",
            description: 'Retrieve all event registrations with filtering and pagination support'
        ),
        new Get(
            security: "is_granted('super-admin') or is_granted('organisation-admin') or is_granted('event-organiser') or object.user == user",
            description: 'Retrieve a specific event registration by ID'
        ),
        new Post(
            security: "is_granted('volunteer') or is_granted('event-organiser') or is_granted('organisation-admin') or is_granted('super-admin')",
            processor: AssignUserProcessor::class,
            description: 'Register for an event'
        ),
        new Patch(
            security: "is_granted('super-admin') or is_granted('organisation-admin') or is_granted('event-organiser')",
            description: 'Update event registration status (approve/reject)'
        ),
        new Delete(
            security: "is_granted('super-admin') or object.user == user",
            description: 'Cancel event registration'
        )
    ],
    description: 'Event registration management system',
    normalizationContext: ['groups' => ['registration:read']],
    denormalizationContext: ['groups' => ['registration:write']],
    paginationEnabled: true,
    paginationItemsPerPage: 15,
    paginationMaximumItemsPerPage: 100
)]
class EventRegistration extends Model implements BelongsToUser
{
    use HasFactory, HasUuids, AutoAssignsUserId;

    public const STATUS_PENDING = 'pending';
    public const STATUS_APPROVED = 'approved';
    public const STATUS_REJECTED = 'rejected';

    protected $table ='event_registration';
    protected $primaryKey = 'registration_id';
    public $incrementing = false;
    protected $keyType = 'string';


    protected $fillable = [
        'user_id',
        'event_id',
        'event_registration_status',
        'approved_at',
        'notes',
    ];

    protected $casts = [
        'created_at' => 'datetime',
        'updated_at' => 'datetime',
        'approved_at' => 'datetime',
    ];

    protected $attributes = [
        'event_registration_status' => 'pending',
    ];

    // Relationships
    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class, 'user_id', 'id');
    }

    public function event(): BelongsTo
    {
        return $this->belongsTo(Event::class, 'event_id', 'event_id');
    }

    // Helper methods
    public function approve(): bool
    {
        $this->event_registration_status = self::STATUS_APPROVED;
        $this->approved_at = now();
        
        $this->event->incrementVolunteerCount();
        
        return $this->save();
    }

    public function reject(): bool
    {
        $this->event_registration_status = self::STATUS_REJECTED;
        $this->approved_at = null;
        
        return $this->save();
    }

    public function cancel(): bool
    {
        // If was approved, decrement volunteer count
        if ($this->event_registration_status === 'approved') {
            $this->event->decrementVolunteerCount();
        }
        
        return $this->delete();
    }

    // Scopes
    public function scopePending($query)
    {
        return $query->where('event_registration_status', 'pending');
    }

    public function scopeApproved($query)
    {
        return $query->where('event_registration_status', 'approved');
    }

    public function scopeRejected($query)
    {
        return $query->where('event_registration_status', 'rejected');
    }

    public function scopeForEvent($query, $eventId)
    {
        return $query->where('event_id', $eventId);
    }

    public function scopeForUser($query, $userId)
    {
        return $query->where('user_id', $userId);
    }

    public static function boot()
    {
        parent::boot();

        static::creating(function ($registration) {
            // Check for duplicate registration
            $exists = static::where('user_id', $registration->user_id)
                           ->where('event_id', $registration->event_id)
                           ->exists();

            if ($exists) {
                throw new \InvalidArgumentException('User is already registered for this event');
            }
        });
    }
}
