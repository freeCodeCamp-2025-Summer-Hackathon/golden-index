<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Category extends Model
{
    protected $table = "categories";
    protected $primaryKey = 'category_id';  // Custom primary key

    protected $fillable = [
        'name',
        'description',
    ];
}
