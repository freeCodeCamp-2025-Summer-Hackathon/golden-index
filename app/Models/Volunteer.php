<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use App\Traits\HasUuid;
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
            security: "is_granted('super-admin') or is_granted('user')",
            processor: AssignUserProcessor::class
        ),
        new Patch(security: "is_granted('super-admin') or is_granted('volunteer')"),
        new Delete(security: "is_granted('super-admin')")
    ]
)]
class Volunteer extends Model implements BelongsToUser
{
    use HasFactory, HasUuid, HasRoles, AutoAssignsUserId;

    protected $primaryKey = 'volunteer_id';
    protected $keyType = 'string';
    public $incrementing = false;

    protected $fillable = [
        'user_id',
        'onboarding_status',
        'bio',
        'skills',
        'experience',
        'availability',
    ];

    protected $casts = [
        'skills' => 'array',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    protected static function booted(): void
    {
        static::created(function (Volunteer $volunteer) {
            // Assign 'volunteer' role to the user if not already assigned
            $user = $volunteer->user;
        
            if ($user && !$user->hasRole('volunteer')) {
                $user->assignRole('volunteer');
            }
        });
    }

}
