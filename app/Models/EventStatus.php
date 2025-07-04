<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class EventStatus extends Model
{
    protected $table = 'event_status';
    protected $primaryKey = 'event_status_id';
    public $incrementing = true;
    protected $keyType = 'int';
    public $timestamps = false;

    protected $fillable = ['event_status_name', 'description'];

    public function event()
    {
        return $this->hasMany(Event::class, 'event_status_id', 'event_status_id');
    }
}
