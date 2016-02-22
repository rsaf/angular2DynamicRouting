<?php

namespace Gineign\Shop\Http\Controllers;
use Response;
use Illuminate\Http\Request;

use App\Http\Requests;
use App\Http\Controllers\Controller;
use Sentinel;
use Config;
class ApiController extends Controller
{

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function success($data)
    {
        return Response::json([
            'status'=>true,
            'result'=>$data
            ]);
    }
    public function fail($errorMessage)
    {
        return Response::json([
            'status'=>false,
            'result'=>$errorMessage
            ]);
    }

    public function auth(Request $request){
        if(Sentinel::check()){
            $user = Sentinel::getUser();
            $result = [];
            $result['avatar'] = $user->avatar->image;
            $result['nickname'] = $user->nickname;
            $result['sex'] = $user->sex;
            $result['email'] = $user->email;
            $result['phone'] = $user->phone;
            $result['roles'] = [];

            foreach ($user->roles as $key => $role) {
                $result['roles'][] = $role->name;
            }

            return $this->success($result);
        }else{
            return $this->fail('please login');
        }
    }
    

}
