<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class EventStatus extends Model
{
    use HasFactory;

    protected $table = 'event_status';
    protected $primaryKey = 'event_status_id';

    protected $fillable = [
        'event_status_name',
        'description',
    ];

    public function events(): HasMany
    {
        return $this->hasMany(Event::class, 'event_status_id', 'event_status_id');
    }
}
