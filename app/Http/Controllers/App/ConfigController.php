<?php

namespace App\Http\Controllers\App;

use App\Http\Controllers\Controller;

class ConfigController extends Controller
{
    /**
     * @return \Illuminate\Http\JsonResponse
     */
    public function __invoke()
    {
        $config = [
            'broadcastChannelPrefix' => config('broadcasting.default') === 'redis'
                ? config('database.redis.options.prefix')
                : '',
            'broadcastDriver' => config('broadcasting.default'),
        ];

        return response()->json(['config' => $config]);
    }
}
