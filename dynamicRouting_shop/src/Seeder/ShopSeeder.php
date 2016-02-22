<?php
namespace Gineign\Shop\Seeder;

use Illuminate\Database\Seeder;
use Illuminate\Database\Eloquent\Model;
use DB;

/**
 * Seeds database with shop data.
 */
class ShopSeeder extends Seeder
{

  /**
   * Run the database seeds.
   *
   * @return  void
   */
  public function run()
  {

    DB::table('shop_order_status')->delete();

    DB::table('shop_order_status')->insert([
		    [
		    		'code' 				=> 'in_creation',
		    		'name' 				=> 'In creation',
		    		'description' => 'Order being created.',
		    ],
		    [
		    		'code' 				=> 'pending',
		    		'name' 				=> 'Pending',
		    		'description' => 'Created / placed order pending payment or similar.',
		    ],
		    [
		    		'code' 				=> 'in_process',
		    		'name' 				=> 'In process',
		    		'description' => 'Completed order in process of shipping or revision.',
		    ],
		    [
		    		'code' 				=> 'completed',
		    		'name' 				=> 'Completed',
		    		'description' => 'Completed order. Payment and other processes have been made.',
		    ],
		    [
		    		'code' 				=> 'failed',
		    		'name' 				=> 'Failed',
		    		'description' => 'Failed order. Payment or other process failed.',
		    ],
		    [
		    		'code' 				=> 'canceled',
		    		'name' 				=> 'Canceled',
		    		'description' => 'Canceled order.',
		    ],
		]);

  }
}