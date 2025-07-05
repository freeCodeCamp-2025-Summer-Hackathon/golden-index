<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Notifications\Notifiable;
use App\Traits\HasUuid;

class Organisation extends Model
{
    use HasFactory, Notifiable, HasUuid;

    protected $keyType = 'string';
    public $incrementing = false;
    protected $primaryKey = 'organisation_id';

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'organisation_name',
        'organisation_description',
        'organisation_email',
        'organisation_phone',
        'organisation_address',
        'website',
        'is_verified',
        'is_active',
        'contact_info',
        'mission_statement',
        'org_type',
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
            'created_at' => 'datetime',
            'updated_at' => 'datetime',
        ];
    }

    /**
     * The users that belong to the organisation.
     */
    public function users()
    {
        return $this->belongsToMany(User::class, 'users_organisations', 'organisation_id', 'user_id');
    }

}
