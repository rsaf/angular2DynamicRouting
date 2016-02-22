<?php

namespace Gineign\Shop\Events;

use Illuminate\Queue\SerializesModels;

/**
 * Event fired when an order has been completed.
 *
 * @author Alejandro Mostajo
 * @copyright Gineign, LLC
 * @license MIT
 * @package Gineign\Shop
 */
class CartCheckout
{
	use SerializesModels;

	/**
     * Cart ID.
     * @var int
     */
	public $id;

     /**
     * Flag that indicates if the checkout was successful or not.
     * @var bool
     */
     public $success;

	/**
     * Create a new event instance.
     *
     * @param int  $id      Order ID.
     * @param bool $success Checkout flag result.
     *
     * @return void
     */
	public function __construct($id, $success)
	{
		$this->id = $id;
          $this->success = $success;
	}
}