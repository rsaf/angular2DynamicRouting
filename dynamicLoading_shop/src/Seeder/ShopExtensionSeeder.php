<?php
namespace Gineign\Shop\Seeder;

use Illuminate\Database\Seeder;
use Gineign\Shop\Model\Product;
use Gineign\Shop\Model\Category;
use App\Model\Image;
use DB;

class ShopExtensionSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::statement("SET foreign_key_checks = 0");
    	DB::table('shop_products')->truncate();
    	DB::table('shop_categories')->truncate();

    	$categories = array(
			'米面粮油' =>  array('越前米 2kg','禾然有机橄榄油','高筋粉','米','大豆油','花生油'),
			'早餐食品' =>  array('面包','酸奶','沙拉酱','纯牛奶','华夫饼'),
			'速食调料' => array('咖喱酱','盐','酱油','醋','大盘鸡调料','麻婆豆腐调料'),
			'休闲食品' => array('薯片','炸鸡','薯条','苹果派','蛋糕','饼干'),
			'酒/水/饮料' => array('啤酒','白酒','香槟','纯净水','可乐','橙汁'),
			'个人洗护' => array('洗发水','牙膏','护肤霜','润唇膏','护发素','爽肤水'),
			'婴童护理' => array('儿童围巾','婴儿用纸','婴儿汤匙','纸尿裤','爽身粉','护肤露'),
			'厨卫清洁/纸' => array('抹布','马桶刷','洗碗刷','洗洁精','卷纸','抽纸'),
			'家居百货' => array('吸尘器','剃须刀','拖把','床单','枕头','拖鞋'),
			'冷藏' => array('猪肉','牛排','猪肉','牛肉','大虾','鱼')
			);

    	foreach ($categories as $categoryName => $products) {

    		$category = Category::create([
    			'name' => $categoryName,
    			'desc' => $categoryName
    			]);

    		foreach ($products as $key => $productName) {
    			$val = $key + 1;
    			Product::create([
    					'sku'=> 'product' .$category->category_id . $key,
    					'price'=>100,
    					'image_id'=> Image::create(['image' => 'assets/shop/img/products/' . $val . '.jpg'])->image_id,
    					'name'=> $productName

    				]);
    		}
    	}

    }
}
