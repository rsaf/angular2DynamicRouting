<?php

namespace Gineign\Shop\Http\Controllers\Api;

use Illuminate\Http\Request;

use App\Http\Requests;
use Gineign\Shop\Http\Controllers\ApiController;

use Gineign\Shop\Model\Product;
use Gineign\Shop\Model\Cart;
use Gineign\Shop\Model\Order;
use Gineign\Shop\Model\Item;
use App\Model\User;
use Shop;
use Config;
use Sentinel;
use Validator;
class ShopApiController extends ApiController
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function getIndex()
    {
        dd('shop');
    }

    public function responseCart($cart){
        $result = [];
        foreach ($cart->items as $key => $item) {
            $result[$key]['sku'] = $item->sku;
            $result[$key]['price'] = $item->price;
            $result[$key]['image'] = $item->product->image->image;
            $result[$key]['quantity'] = $item->quantity;
            $result[$key]['name'] = $item->product->name;
        }
        //dd($user);
        return $this->success([
            'items'=>$result,
            // 'displayTotalPrice' =>$cart->displayTotalPrice,
            'totalPrice'=>$cart->totalPrice,
            'totalShipping'=>$cart->totalShipping,
            'totalTax'=>$cart->totalTax,
            // 'displayTotal'=>$cart->displayTotal,
            'total'=>$cart->total
            ]);
    }

    public function getCart(Request $request){
        if ($user = Sentinel::getUser()) {

           $cart =  Cart::findByUser($user->user_id);
           return $this->responseCart($cart);
        }else{
           // return redirect('shop/wechat');
            return $this->fail('user authentication');
        }
    }

    public function postRemove(Request $request){

        $validator = Validator::make($request->all(), [
            'product_id' => 'required|exists:products,product_id',
        ]);
        if($validator->fails()){
            return $this->fail($validator->errors());
        };

        $cart =  Cart::findByUser(Sentinel::getUser()->user_id);

        $product = Product::find($request->product_id);

        $cart->remove($product);
        // Remove the product from cart
        // $cart = Cart::current()->remove($product);
        // dd($cart);
        return $this->responseCart($cart);


    }

    public function postAdd(Request $request){

        if ($user = Sentinel::getUser()) {
            
            $validator = Validator::make($request->all(), [
                'product_id' => 'required|exists:products,product_id',
            ]);
            if($validator->fails()){
                return $this->fail($validator->errors());
            };
            Cart::findByUser($user->user_id)->add(Product::find($request->product_id), empty($request->quantity) ? 1 : $request->quantity);

            return $this->success($user->cart->items);

        }else{
           // return redirect('shop/wechat');
            return $this->fail('user authentication');
        }
    }


    public function getGateway(Request $request){


         Shop::setGateway('test');

         $gateway = Shop::gateway();

        return $this->success($gateway);
    }
    public function getCheckout_(Request $request){
        // On checkout
        if($user = Sentinel::getUser()){

        }
        $gateway = Shop::gateway();


        // dd($gateway);
        /*
                $type,
                $number,
                $expireMonth,
                $expireYear,
                $cvv,
                $firstname,
                $lastname
        */
        // $gateway->setCreditCard('visa',12321321,'11','2015',123,'Takashi','Mizuoka');


        $cart = Cart::findByUser($user->user_id);
        // dd($cart->items);
        if (!Shop::checkout($cart)) {
          $exception = Shop::exception();
          //echo ; // echos: error
          return $this->fail($exception->getMessage());
        }
        $success = Shop::checkout($cart);

        return $this->success($success);

    }

    public function anyCheckout(Request $request){
        if($user = Sentinel::getUser()){

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
            dd($order);
            return $this->success($order);



        }else{
            $this->fail('user authentication');
        }
    }

    public function anyAddorder(Request $request){

       // $user = User::first();

        $user = Sentinel::getUser();

        // $orders = Order::findByUser($user->user_id);

        // $result = [];

        // foreach ($orders as $key => $order) {
        //     $result[$key]['order_sn'] = date('Ymd').time();
        // }

        // return $orders;

       // Shop::gateway()->setOpenid('1111');



        $cart = Cart::findByUser($user->user_id);



        $order = Shop::placeOrder($cart);

        if ($order->hasFailed) {
          $exception = Shop::exception();
          return $this->fail($exception->getMessage());
        }

        $order = $cart->placeOrder();
        $order = $cart->placeOrder('completed');

        return $this->success($order);
               
    }

    public function getOrder(Request $request){

        $orders = Order::sort($request->all())->paginate(10);

        $result = array();
        
        foreach ($orders as $key => $order) {
            $result[$key]['order_id'] = $order->order_id;
            $result[$key]['gateway'] = $order->gateway->gateway;
            $result[$key]['created'] = $order->created_at->format('Y-m-d H:i:s');
        }
       return $this->success([
            'total' => $orders->total(),
            'lastPage' => $orders->lastPage(),
            'perPage' => $orders->perPage(),
            'currentPage' => $orders->currentPage(),
            'orders'=>$result
        ]);
    }



    /*
    {
       "openid":" OPENID",
       " nickname": NICKNAME,
       "sex":"1",
       "province":"PROVINCE"
       "city":"CITY",
       "country":"COUNTRY",
        "headimgurl":    "http://wx.qlogo.cn/mmopen/g3MonUZtNHkdmzicIlibx6iaFqAc56vxLSUfpb6n5WKSYVY0ChQKkiaJSgQ1dZuTOgvLLrhJbERQQ4eMsv84eavHiaiceqxibJxCfHe/46", 
        "privilege":[
        "PRIVILEGE1"
        "PRIVILEGE2"
        ],
        "unionid": "o6_bmasdasdsad6_2sgVt7hMZOPfL"
    }*/
}
