<?php

use App;
use Log;
use Shop;
use Gineign\Shop;
use Illuminate\Foundation\Testing\WithoutMiddleware;
use Illuminate\Foundation\Testing\DatabaseMigrations;
use Illuminate\Foundation\Testing\DatabaseTransactions;

class ShopTest extends TestCase
{

	/**
	 * Tests shop class static methods.
	 */
	public function testStaticMethods()
	{
	    $this->assertEquals(Shop::format(1.99), '$1.99');
	}

	/**
	 * Tests shop class constants
	 */
	public function testConstants()
	{
	    $this->assertTrue(Gineign\Shop\Shop::QUANTITY_RESET);
	}

}