<?php

namespace App\Http\Controllers\App;

use App\Http\Controllers\ApiController;
use App\Http\Controllers\Controller;
use App\Services\UserService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;
use App\Http\Resources\User as UserResource;

class ContactController extends ApiController
{
    /** @var UserService  */
    protected $userService;

    /**
     * ContactController constructor.
     */
    public function __construct()
    {
        $this->userService = new UserService();
        parent::__construct();
    }

    /**
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse|\Illuminate\Http\Resources\Json\AnonymousResourceCollection
     */
    public function searchNewContacts(Request $request)
    {
        /** @var \Illuminate\Contracts\Validation\Validator $validator */
        $validator = Validator::make($request->all(), [
            'query' => 'nullable|string'
        ]);
        if ($validator->fails()) {

            return response()->json(['errors' => $validator->errors()], 400);
        }

        $query = $request->get('query', '');
        $users = $this->userService->findNewContacts($query, Auth::id());

        return UserResource::collection($users);
    }
}
