<?php

namespace Gineign\Shop\Http\Controllers\Api;

use Illuminate\Http\Request;

use App\Http\Requests;
use App\Http\Controllers\Controller;
use Gineign\Shop\Http\Controllers\ApiController;
use Gineign\Shop\Model\Category;
class CategoryController extends ApiController
{

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {

        $categories = Category::sort($request->all())->paginate(10);
        
        $result = array();
        
        foreach ($categories as $key => $category) {
            $result[$key]['category_id'] = $category->category_id;
            $result[$key]['name'] = $category->name;
            $result[$key]['desc'] = $category->desc;
            $result[$key]['created'] = $category->created_at->format('Y-m-d H:i:s');
        } 

        return $this->success([
                'total' => $categories->total(),
                'lastPage' => $categories->lastPage(),
                'perPage' => $categories->perPage(),
                'currentPage' => $categories->currentPage(),
                'categories'=>$result
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
