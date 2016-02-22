<?php

namespace Gineign\Shop\Events;

use Illuminate\Queue\SerializesModels;

/**
 * Event fired when an order has changed status code.
 *
 * @author Alejandro Mostajo
 * @copyright Gineign, LLC
 * @license MIT
 * @package Gineign\Shop
 */
class OrderStatusChanged
{
	use SerializesModels;

	/**
     * Order ID.
     * @var int
     */
	public $order_id;

     /**
     * Order status code.
     * @var string
     */
     public $statusCode;

     /**
     * Previous order status code.
     * @var string
     */
     public $previousStatusCode;

	/**
     * Create a new event instance.
     *
     * @param int    $id         Order ID.
     * @param string $statusCode Order status code.
     *
     * @return void
     */
	public function __construct($id, $statusCode, $previousStatusCode)
	{
		$this->order_id = $id;
          $this->statusCode = $statusCode;
          $this->previousStatusCode = $previousStatusCode;
	}
}