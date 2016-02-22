<?php

namespace Gineign\Shop\Http\Controllers\Api;

use Illuminate\Http\Request;

use App\Http\Requests;
use App\Http\Controllers\Controller;
use Gineign\Shop\Http\Controllers\ApiController;


use Gineign\Shop\Model\Product;
use Gineign\Shop\Model\Order;
class OrderController extends ApiController
{

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function getIndex(Request $request)
    {       
        $orders = Order::sort($request->all())->paginate(10);

        $result = array();
        
        foreach ($orders as $key => $order) {
            $result[$key]['order_id'] = $order->order_id;
            $result[$key]['nickname'] = $order->user->nickname;
            $result[$key]['avatar'] = $order->user->avatar->image;
            $result[$key]['order_sn'] = 'E'. date('Ymd') . rand(1000000000, 9999999999);
            $result[$key]['statusCode'] = $order->statusCode;            
            $result[$key]['transaction'] = $order->transaction ? $order->transaction->transaction_id : ''; 
            $result[$key]['gateway'] = $order->transaction ? $order->transaction->gateway :  '';
            $result[$key]['total'] = $order->total;
            //$result[$key]['address'] = $order->address->fulladdress();
            $result[$key]['created'] = $order->created_at->format('Y-m-d H:i:s');

            $result[$key]['products'] = [];

            foreach ($order->items as $k => $item) {
                # code...
                // dd($value);
                $result[$key]['products'][$k]['sku'] = $item->sku;
                $result[$key]['products'][$k]['price'] = $item->price;
                $result[$key]['products'][$k]['image'] = $item->product->image->image;
                $result[$key]['products'][$k]['quantity'] = $item->quantity;
                $result[$key]['products'][$k]['name'] = $item->product->name;
            }
        }
       return $this->success([
            'total' => $orders->total(),
            'lastPage' => $orders->lastPage(),
            'perPage' => $orders->perPage(),
            'currentPage' => $orders->currentPage(),
            'orders'=>$result
        ]);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        //
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
