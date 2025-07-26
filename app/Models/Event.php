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
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Symfony\Component\Serializer\Attribute\Groups;
use App\Api\State\EventProcessor;

#[ApiResource(
    operations: [
        new GetCollection(
            security: "is_granted('super-admin') or is_granted('organisation-admin') or is_granted('event-organiser')",
            description: 'Retrieve all events with filtering and pagination support'
        ),
        new Get(
            security: "is_granted('super-admin') or is_granted('organisation-admin') or is_granted('event-organiser')",
            description: 'Retrieve a specific event by ID'
        ),
        new Post(
            security: "is_granted('super-admin') or is_granted('organisation-admin') or is_granted('event-organiser')",
            description: 'Create a new event',
            processor: EventProcessor::class,
        ),
        new Patch(
            security: "is_granted('super-admin') or is_granted('organisation-admin') or is_granted('event-organiser')",
            description: 'Update an existing event'
        ),
        new Delete(
            security: "is_granted('super-admin')",
            description: 'Delete an event (super-admin only)'
        )
    ],
    description: 'Event management system for volunteer opportunities',
    normalizationContext: ['groups' => ['event:read']],
    denormalizationContext: ['groups' => ['event:write']],
    paginationEnabled: true,
    paginationItemsPerPage: 15,
    paginationMaximumItemsPerPage: 100
)]
class Event extends Model
{
    use HasFactory, HasUuids;

    protected $table = 'events';
    protected $primaryKey = 'event_id';
    public $incrementing = false;
    protected $keyType = 'string';

    protected $fillable = [
        'organisation_id',
        'event_title',
        'event_description',
        'start_datetime',
        'end_datetime',
        'location',
        'event_address',
        'is_virtual',
        'max_volunteers',
        'current_volunteers',
        'is_urgent',
        'recurrence_pattern',
        'category_id',
        'event_status_id',
        'is_high_risk',
        'is_group_friendly',
        'required_skills',
    ];

    protected $casts = [
        'start_datetime' => 'datetime',
        'end_datetime' => 'datetime',
        'is_virtual' => 'boolean',
        'is_urgent' => 'boolean',
        'is_high_risk' => 'boolean',
        'is_group_friendly' => 'boolean',
        'required_skills' => 'array',
        'max_volunteers' => 'integer',
        'current_volunteers' => 'integer',
    ];

    // Relationships - NO Groups attributes here
    public function organisation(): BelongsTo
    {
        return $this->belongsTo(Organisation::class, 'organisation_id', 'organisation_id');
    }

    public function category(): BelongsTo
    {
        return $this->belongsTo(Category::class, 'category_id', 'category_id');
    }

    public function eventStatus(): BelongsTo
    {
        return $this->belongsTo(EventStatus::class, 'event_status_id', 'event_status_id');
    }

    public function registrations(): HasMany
    {
        return $this->hasMany(EventRegistration::class, 'event_id', 'event_id');
    }

    public function timeLogs(): HasMany
    {
        return $this->hasMany(VolunteerTimeLog::class, 'event_id', 'event_id');
    }

    public function volunteers()
    {
        return $this->belongsToMany(User::class, 'event_registration', 'event_id', 'user_id')
                    ->withPivot('event_registration_status', 'approved_at', 'notes')
                    ->withTimestamps();
    }

    // Keep only these accessor methods - these work fine
    #[Groups(['event:read'])]
    public function getIsFullAttribute(): bool
    {
        return $this->max_volunteers && $this->current_volunteers >= $this->max_volunteers;
    }

    #[Groups(['event:read'])]
    public function getRemainingVolunteerSlotsAttribute(): ?int
    {
        return $this->max_volunteers ? $this->max_volunteers - $this->current_volunteers : null;
    }

    #[Groups(['event:read'])]
    public function getDurationInHoursAttribute(): float
    {
        return $this->start_datetime->diffInHours($this->end_datetime);
    }

    // REMOVE THESE PROBLEMATIC METHODS:
    // public function getOrganisationAttribute()
    // public function getCategoryAttribute() 
    // public function getEventStatusAttribute()

    // Scopes remain the same
    public function scopeActive($query)
    {
        return $query->whereHas('eventStatus', function ($q) {
            $q->where('event_status_name', '!=', 'cancelled');
        });
    }

    public function scopeUpcoming($query)
    {
        return $query->where('start_datetime', '>', now());
    }

    public function scopeUrgent($query)
    {
        return $query->where('is_urgent', true);
    }

    public function scopeVirtual($query)
    {
        return $query->where('is_virtual', true);
    }

    public function scopeInPerson($query)
    {
        return $query->where('is_virtual', false);
    }

    public function canAcceptVolunteers(): bool
    {
        return !$this->is_full && $this->start_datetime->isFuture();
    }

    public function incrementVolunteerCount(): void
    {
        $this->increment('current_volunteers');
    }

    public function decrementVolunteerCount(): void
    {
        $this->decrement('current_volunteers');
    }
}
