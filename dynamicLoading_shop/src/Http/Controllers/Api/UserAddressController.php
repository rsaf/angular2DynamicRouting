<?php

namespace Gineign\Shop\Http\Controllers\Api;

use Illuminate\Http\Request;

use App\Http\Requests;
use App\Http\Controllers\Controller;
use Gineign\Shop\Http\Controllers\ApiController;
use Gineign\Shop\Model\UserAddress;
use Gineign\Shop\Model\Region;
use Sentinel;
use Validator;
class UserAddressController extends ApiController
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {

       	$userAddress = UserAddress::sort($request->all())->paginate(10);

        $result = [];

        foreach ($userAddress as $key => $address) {
            $result[$key]['user_address_id'] = $address->user_address_id;
            $result[$key]['address'] = $address->address;
            $result[$key]['fulladdress'] = $address->fulladdress();
        }

        return  $this->success($result);
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
    	$user = Sentinel::getUser();
        
        $validator = Validator::make($request->all(), [
                'province_id' => 'required',
                'city_id' => 'required',
                'district_id' => 'required',
                'address' => 'required'                
            ]);
            if($validator->fails()){
                return $this->fail($validator->errors());
            };
        $userAddress = UserAddress::create([
                'user_id'=>$user->user_id,
                'country_id'=>Region::where('region_type',0)->first()->region_id,
                'province_id'=>$request->province_id,
                'city_id'=>$request->city_id,
                'district_id'=>$request->district_id,
                'address'=>$request->address
            ]); 
        return $this->success($userAddress);       
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
