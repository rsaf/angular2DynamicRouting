<?php

namespace Project\Jins\Controllers;
use Response;
use Illuminate\Http\Request;

use App\Http\Requests;
use App\Http\Controllers\Controller;
use Sentinel;
use Config;
use Overtrue\Wechat\Js;
use Overtrue\Wechat\Auth;
use App\Model\Image;
use Redis;
use Project\Jins\Model\UserSupport;
use Project\Jins\Model\UserBalloon;
use Project\Jins\Model\Coupon;
use Validator;
use Overtrue\Wechat\Card;
use App\Model\User;
use Gineign\Auth\Jobs\DownloadImage;
use Maatwebsite\Excel\Facades\Excel;
class ApiController extends Controller
{
    public function getIndex(Request $request){

      $auth = new Auth(Config::get('auth.wechat.appid'), Config::get('auth.wechat.secret'));
      $user = $auth->authorize($to = null,  $scope = 'snsapi_base')->all();


      dd($user);

        $auth = new Auth(Config::get('auth.wechat.appid'), Config::get('auth.wechat.secret'));
        $userData = $auth->authorize()->all();

        $user = Sentinel::registerAndActivate([
            'openid'  => $userData['openid'],
            'password' => bcrypt($userData['openid']),
            'nickname' => $userData['nickname'],
            'avatar_id' =>Image::create(['image' => $userData['headimgurl']])->image_id
        ]);
        Sentinel::login($user);

        dd($user);
    }

    public function anyBalloon(Request $request){
        $validator = Validator::make($request->all(), [
            'balloon_id' => 'required',
            'message'=>'required',
            'user_id' =>'required |exists:users,user_id'
        ]);
        if($validator->fails()){
            return Response::json([
                    'status'=>false,
                    'result'=>$validator->errors(),
                ]);
        };

        $user = User::find($request->user_id);
        if ($request->isInteract == 'false') {
            # code...
            $request->isInteract = false;
        }

        if($request->isInteract){

            $redis = Redis::connection();

            $redis->publish('chat.balloon', json_encode([
                'balloon_id'      => $request->balloon_id,
                'message' => $request->message,
                'user_id' => $user->user_id,
                'nickname' => $user->nickname,
                'avatar'  => $user->avatar->image
            ]));
        }

         UserBalloon::create([
                'user_id'=>$request->user_id,
                'balloon_id'=>$request->balloon_id,
                'message'=>$request->message
            ]);

         return Response::json([
              'status'=>true
          ]);
    }

    public function anyLuck(Request $request){

        $validator = Validator::make($request->all(), [
            'card_id' => 'required',
            'user_id' =>'required |exists:users,user_id'
        ]);
        if($validator->fails()){
            return Response::json([
                    'status'=>false,
                    'result'=>$validator->errors(),
                ]);
        };
        $user = User::find($request->user_id);

        if ($request->isInteract == 'false') {
            # code...
            $request->isInteract = false;
        }

        if($request->isInteract){

            $redis = Redis::connection();

            $redis->publish('chat.explosion', json_encode([
                'user_id' => $user->user_id,
            ]));

        }

        $card_id = 0;
        foreach (Coupon::$cards as $key => $card) {
            if ($request->card_id == $card) {
                # code...
               $card_id = $key;

            }
        }

        Coupon::create([
                'user_id'=>$request->user_id,
                'card_id'=> $card_id
            ]);
        return Response::json([
                'status'=>true
            ]);
    }
    public function anyClean(){
        if (Sentinel::getUser()) {
            $redis = Redis::connection();

            $redis->publish('chat.clean', json_encode([
                'user_id' => $user->user_id,
            ]));
            return Response::json([
                'status'=>true
            ]);
        }else{
            return Response::json([
                'status'=>false,
                'message' => 'user not logged in'
            ]);
        }

    }
    public function anyCheck($openid = null , $cardId = null){
         $card = new Card(Config::get('auth.wechat.appid'), Config::get('auth.wechat.secret'));
         //获取用户已领取卡券接口.  openid  card_id
         try {
            $check = $card->userCardLists($openid,$cardId);
         } catch (\Overtrue\Wechat\Exception $e) {
            return false;  //  用户未领取过该卡劵
         }
        return true;  //  用户已领过该卡劵
    }
    public function anyTestcard(){  //  测试

        $cardId = 'pchLNjnvZA5t94ps3aQDmY9-q-lc';
        $openid = 'ochLNjujAX1GEAyuJcp1wfIIGqlI';

        if($this->anyCheck($openid,$cardId)){
            dd('okokok');
        }else{
            dd('nonono');
        }
    }
    public function anyCard(Request $request){

         // dd(Coupon::$cards);
        $validator = Validator::make($request->all(), [
            'card' => 'required',
        ]);
        if($validator->fails()){
            return Response::json([
                    'status'=>false,
                    'result'=>$validator->errors(),
                ]);
        };
        $card = new Card(Config::get('auth.wechat.appid'), Config::get('auth.wechat.secret'));

        $a = $card->get($request->card);

        dd($a);
    }

    public function anyTest(Request $request){
        $redis = Redis::connection();

        $redis->publish('chat.balloon', json_encode([
            'msg'      => 'System message',
            'nickname' => 'System',

        ]));

       // $redis->publish('chat.user', json_encode($this->dummyUser));

        return Response::json([
             'status'=>true
         ]);
    }

    public function anyNew(){

         $card = new Card(Config::get('auth.wechat.appid'), Config::get('auth.wechat.secret'));
         $js = new Js(Config::get('auth.wechat.appid'), Config::get('auth.wechat.secret'));
         $config = $js->config(array('onMenuShareTimeline', 'onMenuShareAppMessage', 'chooseCard','addCard'),false,false , $json = false);

         $cardId = 'pLd2OuI7eLWYhaGABQ1O4AzjWMEw';


        $card_list = $card->attachExtension($cardId,[]);
        // 卡劵签名
        $signature = json_decode($card_list['cardExt'])->signature;

         return view('game.jins.test', compact('config','card','signature','cardId'));
    }

    public function anySupport(Request $request){

        $validator = Validator::make($request->all(), [
            'support_id' => 'required',
            'user_id' =>'required |exists:users,user_id'
        ]);
        if($validator->fails()){
            return Response::json([
                    'status'=>false,
                    'result'=>$validator->errors(),
                ]);
        };
        if($request->user_id != $request->support_id){
            $user_support = UserSupport::where('user_id',$request->user_id)->where('support_id',$request->support_id)->first();
            if(is_null($user_support)){
                UserSupport::create([
                        'user_id'=>$request->user_id,
                        'support_id'=>$request->support_id
                    ]);
            }
        }

        return Response::json([
                'status'=>true
            ]);
    }

    public function anyPhone(Request $request){
        $validator = Validator::make($request->all(), [
            'phone' => 'required',
            'user_id' =>'required |exists:users,user_id'
        ]);
        if($validator->fails()){
            return Response::json([
                    'status'=>false,
                    'result'=>$validator->errors(),
                ]);
        };

        $user = User::find($request->user_id);

        $user->update(['phone'=>$request->phone]);

        return Response::json(['status'=>true]);
    }

    public function anyStatistics(Request $request){
        $validator = Validator::make($request->all(), [
            'user_id' =>'required |exists:users,user_id'
        ]);
        if($validator->fails()){
            return Response::json([
                    'status'=>false,
                    'result'=>$validator->errors(),
                ]);
        };

        $user_support_count = UserSupport::where('user_id',$request->user_id)->count();

        $user_balloon = UserBalloon::where('user_id',$request->user_id)->orderBy('created_at','DESC')->get();

        $result = [];

        $userInfo = [];

        $user = User::find($request->user_id);

        foreach ($user_balloon as $key => $balloon) {
           $result[$key]['balloon_id'] = $balloon->balloon_id;
           $result[$key]['message'] = $balloon->message;
        }

        $userInfo['nickname'] = $user->nickname;
        $userInfo['avatar'] = $user->avatar->image;

        return Response::json([
                'status'=>true,
                'result'=>$result,
                'user_support_count'=>$user_support_count,
                'userInfo'=>$userInfo
            ]);
    }
    public function anyExcel(Request $request){

      // $data = [];
      //
      // foreach (UserBalloon::orderBy('user_id','ASC')->take(5000)->get() as $key => $balloon) {
      //   # code...
      //   $data[$key]['user_id'] = $balloon->user_id;
      //   $data[$key]['name'] = $balloon->user->nickname;
      //   $data[$key]['sex'] = $balloon->user->sex;
      //   $data[$key]['phone'] = $balloon->user->phone;
      //   $data[$key]['message'] = $balloon->message;
      //   $data[$key]['balloon_id'] = $balloon->balloon_id;
      //   $data[$key]['support'] = $balloon->user->count();
      // }
      // dd($data);

      Excel::create('JinsReport' . date('Ymd') , function($excel) {

          // Set the title
          $excel->setTitle('Jins Report ' . date('Ymd'));

          // Chain the setters
          $excel->setCreator('Gineign')
                ->setCompany('Gineign CO,.LTD');

          $excel->sheet('Wish messages', function($sheet) {
            $sheet->setColumnFormat(array(
                'A' => '@'
            ));

            $data = [];
// ~/clients/event.jins-cn.com/vendor/phpoffice/phpexcel/Classes/PHPExcel
            foreach (UserBalloon::orderBy('user_id','ASC')->get() as $key => $balloon) {
              # code...
              $data[$key]['user_id'] = $balloon->user_id;
              $data[$key]['name'] =$balloon->user->nickname;
              $data[$key]['sex'] = $balloon->user->sex;
              $data[$key]['phone'] = $balloon->user->phone;
              $data[$key]['message'] = $balloon->message;
              $data[$key]['balloon_id'] = $balloon->balloon_id;
              $data[$key]['support'] = $balloon->user->count();
            }
            $sheet->fromArray($data);

          });

          // Call them separately
          // $excel->setDescription('A demonstration to change the file properties');

      })->download('csv');

    }
}
