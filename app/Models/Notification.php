<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use App\Traits\HasUuid;

class Notification extends Model
{
    use HasUuid;
    protected $table = 'notifications';
    protected $primaryKey = 'notification_id';

    protected $fillable = [
        'user_id',
        'notifications_title',
        'message',
        'type',
        'is_read',
        'read_at',
        'metadata'
    ];

    protected $casts = [
        'read_at' => 'datetime',
        'created_at' => 'datetime',
        'is_read' => 'boolean',
        'metadata' => 'array',
    ];
}