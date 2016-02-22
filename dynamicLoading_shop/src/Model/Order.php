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

use Gineign\Shop\Contracts\ShopOrderInterface;
use Gineign\Shop\Traits\ShopOrderTrait;
use Gineign\Shop\Traits\ShopCalculationsTrait;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Config;

class Order extends Model implements ShopOrderInterface
{

    use ShopOrderTrait, ShopCalculationsTrait;

    /**
     * The database table used by the model.
     *
     * @var string
     */
    protected $table;

    protected $primaryKey = 'order_id';   


    /**
     * Fillable attributes for mass assignment.
     *
     * @var array
     */
    protected $fillable = ['user_id', 'statusCode'];



    public function scopeSort($query, $data){

        foreach ($data as $key => $value) {
            # code...
            if ($key == 'user_id') {
                # code...
                $query->where('user_id', $value);

            }elseif ($key == 'statusCode') {
                $query->where('statusCode', $value);
            }
        }
        return $query;
    }
    public function product(){
        return $this->hasMany('Gineign\Shop\Model\Item','order_id','order_id');
    }  

    public function transaction(){
        return $this->hasOne('Gineign\Shop\Model\Transaction','order_id','order_id');
    }
    public function address(){
        return $this->hasOne('Gineign\Shop\Model\UserAddress','user_id','user_id');
    }
    public function user(){
        return $this->hasOne('App\Model\User','user_id','user_id');
    }



    /**
     * Creates a new instance of the model.
     *
     * @param array $attributes
     */
    public function __construct(array $attributes = [])
    {
        parent::__construct($attributes);
        $this->table = Config::get('shop.order_table');
    }

}