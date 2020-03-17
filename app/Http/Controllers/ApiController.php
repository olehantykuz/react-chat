<?php


namespace App\Http\Controllers;


class ApiController extends Controller
{
    protected $guard;

    public function __construct()
    {
        $this->guard = 'api';
    }
}
