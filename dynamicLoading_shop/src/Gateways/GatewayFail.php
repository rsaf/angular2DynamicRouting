<?php

namespace Gineign\Shop\Gateways;

/**
 * This file is part of Shop,
 * A shop solution for Laravel.
 *
 * @author Alejandro Mostajo
 * @copyright Gineign, LLC
 * @license MIT
 * @package Gineign\Shop
 */

use Gineign\Shop\Exceptions\CheckoutException;
use Gineign\Shop\Exceptions\GatewayException;
use Gineign\Shop\Exceptions\ShopException;
use Gineign\Shop\Core\PaymentGateway;

class GatewayFail extends PaymentGateway
{
    /**
     * Called on cart checkout.
     *
     * @param Order $order Order.
     */
    public function onCheckout($cart)
    {
        throw new CheckoutException('Checkout failed.');
    }

    /**
     * Called by shop to charge order's amount.
     *
     * @param Order $order Order.
     *
     * @return bool
     */
    public function onCharge($order)
    {
        throw new GatewayException('Payment failed.');
    	return false;
    }
}