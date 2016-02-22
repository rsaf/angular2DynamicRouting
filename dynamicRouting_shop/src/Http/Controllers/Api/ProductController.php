<?php

namespace Gineign\Shop\Http\Controllers\Api;

use Illuminate\Http\Request;

use App\Http\Requests;
use App\Http\Controllers\Controller;
use Gineign\Shop\Http\Controllers\ApiController;


use Gineign\Shop\Model\Product;

class ProductController extends ApiController
{

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {       
        $products = Product::sort($request->all())->paginate(10);

        $result = array();
        
        foreach ($products->items() as $key => $product) {
            $result[$key]['product_id'] = $product->product_id;
            $result[$key]['name'] = $product->name;
            $result[$key]['price'] = $product->price;
            $result[$key]['sku'] = $product->sku;
            $result[$key]['image'] = $product->image->image;
            $result[$key]['desc'] = $product->desc;
            $result[$key]['created'] = $product->created_at->format('Y-m-d H:i:s');
        }
       return $this->success([
            'total' => $products->total(),
            'lastPage' => $products->lastPage(),
            'perPage' => $products->perPage(),
            'currentPage' => $products->currentPage(),
            'products'=>$result
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
