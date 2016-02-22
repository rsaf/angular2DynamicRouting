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

use Gineign\Shop\Contracts\ShopItemInterface;
use Gineign\Shop\Traits\ShopItemTrait;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Config;

class Item extends Model implements ShopItemInterface
{

    use ShopItemTrait;

    /**
     * The database table used by the model.
     *
     * @var string
     */
    protected $table;

    protected $primaryKey = 'item_id';


    /**
     * Name of the route to generate the item url.
     *
     * @var string
     */
    protected $itemRouteName = '';

    /**
     * Name of the attributes to be included in the route params.
     *
     * @var string
     */
    protected $itemRouteParams = [];

    /**
     * Name of the attributes to be included in the route params.
     *
     * @var string
     */
    protected $fillable = ['user_id', 'cart_id', 'shop_id', 'sku', 'price', 'tax', 'shipping', 'currency', 'quantity', 'class', 'reference_id'];


    public function product(){
        return $this->hasOne('Gineign\Shop\Model\Product','product_id', 'reference_id');
    }
    /**
     * Creates a new instance of the model.
     *
     * @param array $attributes
     */
    public function __construct(array $attributes = [])
    {
        parent::__construct($attributes);
        $this->table = Config::get('shop.item_table');
    }

    /**
     * Many-to-Many relations with the user model.
     *
     * @return \Illuminate\Database\Eloquent\Relations\BelongsToMany
     */
    public function user()
    {
        return $this->belongsTo(Config::get('auth.model'), 'user_id','user_id');
    }

    /**
     * One-to-One relations with the cart model.
     *
     * @return \Illuminate\Database\Eloquent\Relations\BelongsToMany
     */
    public function cart()
    {
        return $this->belongsTo(Config::get('shop.cart'), 'cart_id','cart_id');
    }

    /**
     * One-to-One relations with the order model.
     *
     * @return \Illuminate\Database\Eloquent\Relations\BelongsToMany
     */
    public function order()
    {
        return $this->belongsTo(Config::get('shop.order'), 'order_id','order_id');
    }

}
