<?php

namespace Gineign\Shop\Model;

/**
 * This file is part of Shop,
 * A shop solution for Laravel.
 *
 * @author Alejandro Mostajo
 * @copyright Gineign, LLC
 * @license MIT
 * @package Gineign\Shop
 */

use Illuminate\Database\Eloquent\Model;
use Gineign\Shop\Traits\ShopItemTrait;

class Product extends Model
{

   use ShopItemTrait;
	
	protected $table = 'shop_products';

	protected $primaryKey = 'product_id';


	/**
	 * The attributes that are mass assignable.
	 *
	 * @var array
	 */
	protected $fillable = ['name','sku', 'price', 'desc'];


    public function scopeSort($query, $data){

        return $query;
    }

    public function image(){
        return $this->hasOne('App\Model\Image','image_id','image_id');
    }

}