<?php
// app/Traits/AutoAssignsUserId.php
namespace App\Traits;

trait AutoAssignsUserId
{
    public function setUserId(?string $userId): void
    {
        $this->user_id = $userId;
    }
}
