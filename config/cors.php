<?php

return [
    'paths' => ['api/*'],
    'allowed_methods' => ['*'],
    'allowed_origins' => ['http://localhost:3000'], // Your React frontend origin
    'allowed_origins_patterns' => [],
    'allowed_headers' => ['Authorization', 'Content-Type', 'X-Requested-With'],
    'exposed_headers' => ['Authorization'],
    'max_age' => 0,
    'supports_credentials' => false, // No cookies = false for JWT
];
