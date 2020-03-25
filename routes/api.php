<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::group(['namespace' => 'App'], function () {
    Route::group(['middleware' => 'api'], function () {
        Route::get('config', 'ConfigController');
    });
    Route::group(['middleware' => 'api', 'prefix' => 'auth'], function () {
        Route::post('register', 'AuthController@register');
        Route::post('login', 'AuthController@login');
        Route::post('logout', 'AuthController@logout');
        Route::post('refresh', 'AuthController@refresh');
        Route::get('me', 'AuthController@me');
    });
    Route::group(['middleware' => 'auth:api', 'prefix' => 'chat'], function () {
        Route::get('messages', 'ChatsController@fetchMessages');
        Route::post('messages', 'ChatsController@sendMessage');
    });
});
