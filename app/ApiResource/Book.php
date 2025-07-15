<?php 

namespace App\ApiResource;

use ApiPlatform\Metadata\Get;

#[Get(uriTemplate: '/my_custom_book/{id}')]

class Book 
{
    public function __construct(public string $id, public string $title) {}
}
