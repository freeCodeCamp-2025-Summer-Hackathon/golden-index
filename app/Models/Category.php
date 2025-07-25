<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Category extends Model
{
    protected $table = "categories";
    protected $primaryKey = 'category_id';  // Custom primary key
    public $incrementing = true;
    protected $keyType = 'int';

    protected $fillable = [
        'category_name',
        'category_description',
    ];

    /**
     * Define the data type casting for model attributes.
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
}
