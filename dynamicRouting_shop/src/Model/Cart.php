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

use Gineign\Shop\Contracts\ShopCartInterface;
use Gineign\Shop\Traits\ShopCartTrait;
use Gineign\Shop\Traits\ShopCalculationsTrait;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Config;

class Cart extends Model implements ShopCartInterface
{

    use ShopCartTrait, ShopCalculationsTrait;

    /**
     * The database table used by the model.
     *
     * @var string
     */
    protected $table;


    protected $primaryKey = 'cart_id';

    /**
     * Fillable attributes for mass assignment.
     *
     * @var array
     */
    protected $fillable = ['user_id'];

    /**
     * Creates a new instance of the model.
     *
     * @param array $attributes
     */
    public function __construct(array $attributes = [])
    {
        parent::__construct($attributes);
        $this->table = Config::get('shop.cart_table');
    }

}
