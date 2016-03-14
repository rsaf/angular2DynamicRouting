<?php

namespace Project\Jins\Controllers;
use Response;
use Illuminate\Http\Request;

use App\Http\Requests;
use App\Http\Controllers\Controller;
use Sentinel;
use Config;
use App\Model\User;
use Overtrue\Wechat\Js;
use Overtrue\Wechat\Auth;
use App\Model\Image;
use Redis;
use Overtrue\Wechat\Payment\Business;
use Overtrue\Wechat\LuckMoney;
use Overtrue\Wechat\Card;
use Project\Jins\Model\Coupon;
use Gineign\Auth\Service\Agent;
class HomeController extends Controller
{

    public function __construct(){
        $this->middleware('wechat');
    }


    public function getIndex(Request $request)
    {
        // dd(Coupon::where('card_id', )->count() );


        $js = new Js(Config::get('auth.wechat.appid'), Config::get('auth.wechat.secret'));

    	return view('game/jins/screen',compact('js'));
    }

    public function getInteract(Request $request){

        if ($user = Sentinel::getUser()) {
            return $this->renderView($request,'true');
        }else{
          // dd('b');
            return $this->getView($request);
        }
        
    }
    public function getMobile(Request $request){

        if ($user = Sentinel::getUser()) {
            return $this->renderView($request,'false');
        }else{
          return $this->renderView($request,'false');
          // dd('a');
            return $this->getView($request);
        }
    }
    public function renderView($request, $isInteract)
    {
        // Sentinel::login(User::first());
        $js = new Js(Config::get('auth.wechat.appid'), Config::get('auth.wechat.secret'));
        $config = $js->config(array('onMenuShareTimeline', 'onMenuShareAppMessage', 'chooseCard','addCard'),false,false , $json = false);
      
        if ($user = Sentinel::getUser()) {

             $card = new Card(Config::get('auth.wechat.appid'), Config::get('auth.wechat.secret'));

             ///// TEST

             if ($coupon = Coupon::where('user_id', $user->user_id)->first() ) {
                $coupon_id = $coupon->card_id;
             }else{
                $num = rand(0,9);

                if ($num < 6) {
                   $coupon_id = 0;
                }else if ($num <9) {
                   $coupon_id = 1;
                }else{
                   $coupon_id = 2;
                }


                if (rand(0, 500) == 1) {
                    if (Coupon::where('card_id', 3)->count() < 5) {
                         $coupon_id = 3;
                    }
                }
                
             }

            $cardId = Coupon::$cards[$coupon_id];
                
            $card_list = $card->attachExtension($cardId,[]);
            // 卡劵签名
            $signature = json_decode($card_list['cardExt'])->signature;

            return view('game/jins/mobile',compact('js','user','isInteract','config','signature','cardId'));
        }else{
            $user = User::first();
            $signature = '';
            $cardId = '';

            return view('game/jins/mobile',compact('js','user','isInteract','config','signature','cardId'));
        }
    }

    public function getView(){
        return view('game/jins/view');
    }
    public function getTest(){
        return view('game/jins/test');
    }

}
