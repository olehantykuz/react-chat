<?php

namespace App\Http\Controllers\App;

use App\Http\Requests\LoginApiRequest;
use App\Http\Resources\User as UserResource;
use Illuminate\Http\Request;
use App\Http\Controllers\ApiController;
use App\Http\Requests\RegisterApiRequest;
use App\Services\UserService;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Validator;

class AuthController extends ApiController
{
    /**
     * Create a new AuthController instance.
     *
     * @return void
     */
    public function __construct()
    {
        parent::__construct();
        $this->middleware('auth:api', ['except' => ['login', 'register']]);
    }

    /**
     * @param Request $request
     * @param UserService $service
     * @return JsonResponse
     */
    public function register(Request $request, UserService $service)
    {
        $validator = Validator::make($request->all(), with(new RegisterApiRequest())->rules());
        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 400);
        }

        $service->create($request->all());

        return new JsonResponse('', 201);
    }

    /**
     * Get a JWT via given credentials.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function login(Request $request)
    {
        $validator = Validator::make($request->all(), with(new LoginApiRequest())->rules());
        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 400);
        }

        $credentials = request(['email', 'password']);

        if (! $token = auth($this->guard)->attempt($credentials)) {
            return response()->json(['error' => 'Unauthorized'], 401);
        }

        return $this->respondWithToken($token);
    }

    /**
     * Get the authenticated User.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function me()
    {
        return response()->json(['user' => new UserResource(auth($this->guard)->user())]);
    }

    /**
     * Log the user out (Invalidate the token).
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function logout()
    {
        auth($this->guard)->logout();

        return response()->json(['message' => 'Successfully logged out']);
    }

    /**
     * Refresh a token.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function refresh()
    {
        return $this->respondWithToken(auth($this->guard)->refresh());
    }

    /**
     * Get the token array structure.
     *
     * @param  string $token
     *
     * @return \Illuminate\Http\JsonResponse
     */
    protected function respondWithToken($token)
    {
        return response()->json([
            'access_token' => $token,
            'token_type' => 'bearer',
            'expires_in' => auth($this->guard)->factory()->getTTL() * 60,
            'user' => new UserResource(auth($this->guard)->user()),
        ]);
    }
}
