<?php

namespace Gineign\Theater\Controllers;

use Illuminate\Http\Request;

use App\Http\Requests;
use App\Http\Controllers\Controller;
use Overtrue\Wechat\Auth;
use Response;
use Validator;
use Redis;
use Sentinel;
use App\Model\User;
class TheaterController extends Controller
{

    private $appId = 'wx6ff860b9cfb9949a';
    private $secret = 'e40c55f021be0e430588c935c7299d10';


    private $dummyUser = [
        'openid' => 'asfd',
        'headimgurl' => 'http://wx.qlogo.cn/mmopen/RgRVXateQcw6HzELsj6xPbScpLicpIiaYStWjYvDNlglYpXsu7zI1sd0hyad5LzpkBv8FfynyUufUFHrs7NDC6m38e5afrKooZ/0',
        'sex' =>1
    ];
    public function __construct(){
        //$this->middleware('wechat');
    }

    public function getIndex(Request $request)
    {
        return view('game/theater/theater');
    }
    public function getMobile(Request $request){

        //$this->middleware('wechat');
        if ($request->session()->has('user')) {
            $user = $request->session()->get('user');
        }else{
            $auth = new Auth($this->appId, $this->secret);
            $user = $auth->authorize($to = null, $scope = 'snsapi_userinfo', $state = 'STATE')->all();
            $request->session()->set('user', $user);
            $request->session()->save();
        }

        // $user = [];
        // if ($request->session()->has('user')) {
        //     $user = $request->session()->get('user');
        //   //  dd($user);
        // }

      //  $user = Sentinel::getUser();
        $redis = Redis::connection();

        $redis->publish('chat.user', json_encode($user));

        return view('game/theater/mobile');
    }

    public function getMessage(Request $request){

        $redis = Redis::connection();

        $redis->publish('chat.message', json_encode([
            'msg'      => 'System message',
            'nickname' => 'System',

        ]));

       // $redis->publish('chat.user', json_encode($this->dummyUser));

        return Response::json([
             'status'=>true
         ]);

    }

    public function postMobile(Request $request)
    {
        // $valid
        $validator = Validator::make($request->all(), [
            'message' => 'required',
        ]);
        if($validator->fails()){
            return Response::json([
                    'status'=>false,
                    'result'=>$validator->errors(),
                    'errorCode'=>10002
                ]);
        };

       if ($request->session()->has('user')) {
           $user = $request->session()->get('user');
       }else{
            return Response::json([
                'status'=>false,
                'result'=> 'user has not authenticated',
                'errorCode'=>  10001
                ]);
       }
       $redis = Redis::connection();
       $redis->publish('chat.message', json_encode([
           'msg'      => $request->message,
           'nickname' => $user['nickname'],
           'openid' => $user['openid'],
           'headimgurl' => $user['headimgurl']
       ]));

       return Response::json([
            'status'=>true
        ]);
    }


}
