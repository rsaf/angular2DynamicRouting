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
class OrderCompleted
{
	use SerializesModels;

	/**
     * Order ID.
     * @var int
     */
	public $order_id;

	/**
     * Create a new event instance.
     *
     * @param int $id Order ID.
     *
     * @return void
     */
	public function __construct($id)
	{
		$this->order_id = $id;
	}
}