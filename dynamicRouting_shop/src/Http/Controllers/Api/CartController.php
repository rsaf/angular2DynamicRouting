<?php

namespace Gineign\Shop\Http\Controllers\Api;

use Illuminate\Http\Request;

use App\Http\Requests;
use App\Http\Controllers\Controller;
use Gineign\Shop\Http\Controllers\ApiController;

use App\Model\User;
use Gineign\Shop\Model\Product;
use Gineign\Shop\Model\Cart;
use Gineign\Shop\Model\Order;
use Gineign\Shop\Model\Item;
use Shop;
use Config;
use Sentinel;
use Validator;



class CartController extends ApiController
{

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
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

    public function getIndex(Request $request){
        if ($user = Sentinel::getUser()) {

           $cart =  Cart::findByUser($user->user_id);
           return $this->responseCart($cart);
        }else{
           // return redirect('shop/wechat');
            return $this->fail('user authentication');
        }
    }

    public function anyAdd(Request $request){

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


    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function anyRemove(Request $request)
    {
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

}
