<?php

namespace Gineign\Shop\Model;

use Illuminate\Database\Eloquent\Model;

class UserAddress extends Model
{
    protected $table = 'user_address';
    protected $primaryKey = 'user_address_id';    

	/**
	 * The attributes that are mass assignable.
	 *
	 * @var array
	 */
	protected $fillable = ['user_id','country_id','province_id','city_id','district_id','address'];


    public function scopeSort($query, $data){
    	foreach ($data as $key => $value) {
    		if($key == 'user_id'){
    			$query->where('user_id',$value);
    		}
    	}
        return $query;
    }
    public function country(){
        return $this->hasOne('Gineign\Shop\Model\Region','region_id','country_id');
    }
    public function province(){
        return $this->hasOne('Gineign\Shop\Model\Region','region_id','province_id');
    }
    public function city(){
        return $this->hasOne('Gineign\Shop\Model\Region','region_id','city_id');
    }
    public function district(){
        return $this->hasOne('Gineign\Shop\Model\Region','region_id','district_id');
    }
    public function fulladdress(){
    	return $this->province->region_name . $this->city->region_name .  $this->district->region_name . $this->address;
    }
}
