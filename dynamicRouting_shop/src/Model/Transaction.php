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

use Gineign\Shop\Contracts\ShopTransactionInterface;
use Gineign\Shop\Traits\ShopTransactionTrait;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Config;

class Transaction extends Model implements ShopTransactionInterface
{
    use ShopTransactionTrait;

    /**
     * The database table used by the model.
     *
     * @var string
     */
    protected $table;
    
    protected $primaryKey = 'transaction_id';     
    /**
     * Fillable attributes for mass assignment.
     *
     * @var array
     */
    protected $fillable = ['order_id', 'gateway', 'transaction_id', 'detail', 'token'];

    /**
     * Creates a new instance of the model.
     *
     * @param array $attributes
     */
    public function __construct(array $attributes = [])
    {
        parent::__construct($attributes);
        $this->table = Config::get('shop.transaction_table');
    }
}