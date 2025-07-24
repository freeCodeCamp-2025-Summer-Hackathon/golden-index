<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use ApiPlatform\Metadata\GetCollection;
use ApiPlatform\Metadata\Get;
use ApiPlatform\Metadata\Post;
use ApiPlatform\Metadata\Patch;
use ApiPlatform\Metadata\Delete;
use ApiPlatform\Metadata\ApiResource;
use App\Contracts\BelongsToUser;
use App\Traits\AutoAssignsUserId;
use App\Api\State\AssignUserProcessor;
use App\Api\State\AssignOrganisationUserProcessor;
use App\Traits\HasUuid;
use Spatie\Permission\Traits\HasRoles;

#[ApiResource( 
    operations: [
        new GetCollection(security: "is_granted('super-admin') or is_granted('organisation-admin') or is_granted('event-organiser')"),
        new Get(security: "is_granted('super-admin') or is_granted('organisation-admin') or is_granted('event-organiser')"),
        new Post(
            security: "is_granted('super-admin') or is_granted('organisation-admin') or is_granted('event-organiser')",
            processor: AssignUserProcessor::class),
        new Patch(security: "is_granted('super-admin') or is_granted('organisation-admin') or is_granted('event-organiser')"),
        new Delete(security: "is_granted('super-admin')")
    ]
)]
class Event extends Model
{
    use HasFactory, HasUuid, HasRoles, AutoAssignsUserId;

    protected $table = 'events';
    protected $primaryKey = 'event_id';
    protected $keyType = 'string';
    public $incrementing = false;

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
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
        'is_urgent',
        'recurrence_pattern',
        'category_id',
        'event_status_id',
        'is_high_risk',
        'is_group_friendly',
        'required_skills',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array
     */
    protected $casts = [
        'start_datetime'    => 'datetime',
        'end_datetime'      => 'datetime',
        'is_virtual'        => 'boolean',
        'is_urgent'         => 'boolean',
        'is_high_risk'      => 'boolean',
        'is_group_friendly' => 'boolean',
        'required_skills'   => 'array',
        'created_at'        => 'datetime',
        'updated_at'        => 'datetime',
    ];

    /**
     * The attributes that should have default values.
     *
     * @var array
     */
    protected $attributes = [
        'is_virtual'         => false,
        'current_volunteers' => 0,
        'is_urgent'          => false,
        'is_high_risk'       => false,
        'is_group_friendly'  => false,
    ];

    /**
     * Get the organization that owns the event.
     */
    public function organization(): BelongsTo
    {
        return $this->belongsTo(Organisation::class, 'organisation_id');
    }

    /**
     * Get the event category.
     */
    public function category(): BelongsTo
    {
        return $this->belongsTo(Category::class, 'category_id');
    }

    /**
     * Get the event status.
     */
    public function eventStatus(): BelongsTo
    {
        return $this->belongsTo(EventStatus::class, 'event_status_id', 'event_status_id');
    }

    /**
     * Scope a query to only include upcoming events.
     */
    public function scopeUpcoming($query)
    {
        return $query->where('start_datetime', '>', now());
    }

    /**
     * Scope a query to only include virtual events.
     */
    public function scopeVirtual($query)
    {
        return $query->where('is_virtual', true);
    }

    /**
     * Scope a query to only include urgent events.
     */
    public function scopeUrgent($query)
    {
        return $query->where('is_urgent', true);
    }

    /**
     * Check if the event has volunteer slots available.
     */
    public function hasVolunteerSlotsAvailable(): bool
    {
        if (is_null($this->max_volunteers)) {
            return true;
        }

        return $this->current_volunteers < $this->max_volunteers;
    }
}
