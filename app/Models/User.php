<?php
namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use App\Traits\HasUuid;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Passport\Contracts\OAuthenticatable;
use Laravel\Passport\HasApiTokens;

class User extends Authenticatable implements OAuthenticatable
{
    /** @use HasFactory<\Database\Factories\UserFactory> */
    use HasApiTokens, HasFactory, Notifiable, HasUuid;

    protected $keyType   = 'string';
    public $incrementing = false;

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'name',
        'email',
        'password',
        'phone',
        'user_type',
        'is_verified',
        'is_active',
        'profile_visibility',
        'privacy_settings',
        'timezone',
        'role_ids',
        'cv_file_path',
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var list<string>
     */
    protected $hidden = [
        'password',
        'remember_token',
        'privacy_settings',
        'role_ids',
    ];

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'password'          => 'hashed',
            'date_created'      => 'datetime',
            'last_login'        => 'datetime',
            'created_at'        => 'datetime',
            'updated_at'        => 'datetime',
            'is_verified'       => 'boolean',
            'is_active'         => 'boolean',
            'privacy_settings'  => 'array',
            'role_ids'          => 'array',
        ];
    }

    public function organisations()
    {
        return $this->belongsToMany(Organisation::class, 'users_organisations', 'user_id', 'organisation_id', );
    }

    public function badges(): BelongsToMany
    {
        return $this->belongsToMany(Badge::class, 'user_badges', 'user_id', 'badge_id')
            ->withPivot('earned_at', 'progress_data')
            ->withTimestamps();
    }
}
