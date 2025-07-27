<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;
use Illuminate\Support\Facades\Log;

class DumpRequestMiddleware
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
        {
            if (app()->environment('local')) {
            Log::debug('Raw Request Body:', $request->all());

            // or if you want it dumped in browser too
            dump('Raw Request Body:', $request->all());
        }

        return $next($request);
    }
}
