<?php
namespace App\Models;

use App\Traits\HasUuid;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use ApiPlatform\Metadata\ApiResource;
use Spatie\Permission\Traits\HasRoles;
use ApiPlatform\Metadata\GetCollection;
use ApiPlatform\Metadata\Get;
use ApiPlatform\Metadata\Post;
use ApiPlatform\Metadata\Patch;
use ApiPlatform\Metadata\Delete;
use App\Contracts\BelongsToUser;
use App\Traits\AutoAssignsUserId;
use App\Api\State\AssignUserProcessor;

#[ApiResource(
    operations: [
        new GetCollection(security: "is_granted('super-admin') or is_granted('volunteer')"),
        new Get(security: "is_granted('super-admin') or is_granted('volunteer')"),
        new Post(
            security: "is_granted('super-admin') or is_granted('volunteer')",
        ),
        new Patch(security: "is_granted('super-admin') or is_granted('volunteer')"),
        new Delete(security: "is_granted('super-admin')")
    ]
)]
class VolunteerTimeLog extends Model
{
    use HasFactory, HasUuid, HasRoles;

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
