<?php

namespace App\Providers;

use Illuminate\Support\Facades\Broadcast;
use Illuminate\Support\ServiceProvider;
use Illuminate\Support\Facades\Route;
use Illuminate\Http\Request;

class BroadcastServiceProvider extends ServiceProvider
{
    /**
     * Bootstrap any application services.
     *
     * @return void
     */
    public function boot()
    {
        Route::post('broadcasting/auth', function () {
            $url = request()->hasHeader('Authorization') ? '/api' : '';

            $proxy = Request::create($url . '/broadcasting/auth', 'POST', request()->toArray());
            $proxy->headers = request()->headers;

            return app()->handle($proxy)->content();
        });

        Broadcast::routes(['prefix' => 'api', 'middleware' => ['auth:api']]);

        require base_path('routes/channels.php');
    }
}
