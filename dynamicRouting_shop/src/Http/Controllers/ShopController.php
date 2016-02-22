<?php

namespace Gineign\Shop\Http\Controllers;

use Illuminate\Http\Request;

use App\Http\Requests;
use App\Http\Controllers\Controller;
use Overtrue\Wechat\Js;
use Config;


class ShopController extends Controller
{


    public function __construct(){
        $this->middleware('auth');
    }
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        $js = new Js(Config::get('auth.wechat.appid'), Config::get('auth.wechat.secret'));

        return view('shop.shop',['js'=>$js]);
    }
    public function admin(Request $request)
    {
      return view('shop.admin');
    }


}
