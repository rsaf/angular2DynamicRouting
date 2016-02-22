<?php

namespace Gineign\Shop\Http\Controllers\Api;

use Illuminate\Http\Request;

use App\Http\Requests;
use App\Http\Controllers\Controller;
use Gineign\Shop\Http\Controllers\ApiController;
use Gineign\Shop\Model\Category;
use Gineign\Shop\Model\Cart;
use Sentinel;
use Validator;
use Gineign\Shop\Shop;
use App\Model\User;
use Overtrue\Wechat\Payment;
use Overtrue\Wechat\Js;
use Overtrue\Wechat\Payment\Order;
use Overtrue\Wechat\Payment\Business;
use Overtrue\Wechat\Payment\UnifiedOrder;
use Overtrue\Wechat\Payment\Notify;
use DB;
class CheckoutController extends ApiController
{

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function anyIndex(Request $request)
    {

        if($user = Sentinel::getUser()){
       //     $user = User::find(1);
            $validator = Validator::make($request->all(), [
                'gateway' => 'required',
            ]);
            if($validator->fails()){
                return $this->fail($validator->errors());
            };
            Shop::setGateway($request->gateway);
            
            $cart = Cart::findByUser($user->user_id);

            if (!Shop::checkout($cart)) {
              $exception = Shop::exception();
              //echo ; // echos: error
              return $this->fail($exception->getMessage());
            }


            $success = Shop::checkout($cart);


            $order = Shop::placeOrder($cart);

            if ($order->hasFailed) {
              $exception = Shop::exception();
              return $this->fail($exception->getMessage());
            }
            return $this->success($order);



        }else{
          return  $this->fail('user authentication');
        }
    }


    public function anyPayment(Request $request){

        $validator = Validator::make($request->all(), [
            'order_id' => 'required|exists:orders,order_id',
        ]);
        if($validator->fails()){
            return $this->fail($validator->errors());
        };

        if ($user = Sentinel::getUser()) {
      //      $user = User::find(1);
            $js = new Js(env('WECHAT_APPID','APPID'), env('WECHAT_SECRET','SECRET'));

          //  $order = DB::table('orders')->where('order_id',$request->order_id)->get();


            /**
             * 第 1 步：定义商户
             */
            $business = new Business(
                env('WECHAT_APPID','APPID'),
                env('WECHAT_SECRET','SECRET'),
                env('MCH_ID','MCH_ID'),
                env('MCH_KEY','MCH_KEY')
            );

            /**
             * 第 2 步：定义订单
             */
            $wechatOrder = new Order();
            $wechatOrder->body = 'test body';
            $wechatOrder->out_trade_no = md5(uniqid().microtime());
            $wechatOrder->total_fee = $order->total;    // 单位为 “分”, 字符串类型
            //$wechatOrder->total_fee = 1;
            $wechatOrder->openid = $user->openid;
            $wechatOrder->notify_url = URL::to('game/wechat/notify');

            /**
             * 第 3 步：统一下单
             */
            $unifiedOrder = new UnifiedOrder($business, $wechatOrder);


            /**
             * 第 4 步：生成支付配置文件
             */
            $payment = new Payment($unifiedOrder);

            // dd($payment->getConfig());

            return $this->success($payment);
        }

          return  $this->fail('user authentication');
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //
    }
}
