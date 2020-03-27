<?php

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
    Route::group(['middleware' => 'auth:api'], function () {
        Route::group(['prefix' => 'chat'], function () {
            Route::group(['prefix' => 'messages'], function () {
                Route::get('/', 'ChatsController@fetchMessages');
                Route::post('/', 'ChatsController@sendMessage');
            });
        });
        Route::group(['prefix' => 'contacts'], function () {
            Route::get('search/new', 'ContactController@searchNewContacts');
        });
    });
});
