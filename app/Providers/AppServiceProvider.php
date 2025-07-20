<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;
use Laravel\Passport\Passport;
use Inertia\Inertia;
use App\Api\State\AssignUserProcessor;
use App\Api\State\AssignOrganisationUserProcessor;
use ApiPlatform\State\ProcessorInterface;
use ApiPlatform\Laravel\Eloquent\State\PersistProcessor;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        $this->app->when(AssignUserProcessor::class)
        ->needs(ProcessorInterface::class)
        ->give(PersistProcessor::class);

        $this->app->when(AssignOrganisationUserProcessor::class)
        ->needs(ProcessorInterface::class)
        ->give(function () {
            return $this->app->make(PersistProcessor::class);
        });
    }
}
