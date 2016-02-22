<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class ShopExtensions extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('shop_products', function (Blueprint $table) {
            $table->increments('product_id');
            $table->string('sku');
            $table->decimal('price', 20, 2);
            $table->integer('image_id')->unsigned();
            $table->string('name');
            $table->string('desc');
            $table->engine = 'InnoDB';
            $table->timestamp('created_at')->nullable();
            $table->timestamp('updated_at')->nullable();
        });

        Schema::create('shop_categories', function(Blueprint $table){
            $table->increments('category_id');
            $table->string('name');
            $table->string('desc');
             $table->integer('parent_id')->nullable();           
            $table->engine = 'InnoDB';
            $table->timestamp('created_at')->nullable();
            $table->timestamp('updated_at')->nullable();
        });

        Schema::create('shop_product_categories', function(Blueprint $table){
            $table->integer('product_id')->unsigned();
            $table->integer('category_id')->unsigned();

            $table->engine = 'InnoDB';
            $table->foreign('product_id')
                ->references('product_id')
                ->on('shop_products')
                ->onUpdate('cascade')
                ->onDelete('cascade');
            $table->foreign('category_id')
                ->references('category_id')
                ->on('shop_categories')
                ->onUpdate('cascade')
                ->onDelete('cascade');
        });

        Schema::create('user_address', function(Blueprint $table)
        {
            $table->increments('user_address_id')->unsigned();
            $table->integer('user_id')->unsigned();
            $table->integer('country_id')->unsigned();
            $table->integer('province_id')->unsigned();
            $table->integer('city_id')->unsigned();
            $table->integer('district_id')->unsigned();
            $table->string('address'); 
            $table->foreign('user_id')
                ->references('user_id')
                ->on('users')
                ->onUpdate('cascade')
                ->onDelete('cascade');                
            $table->timestamp('created_at')->nullable();
            $table->timestamp('updated_at')->nullable();
        });


    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::drop('shop_product_categories');
        Schema::drop('shop_categories');
        Schema::drop('shop_products');
        Schema::drop('user_address');

    }
}
