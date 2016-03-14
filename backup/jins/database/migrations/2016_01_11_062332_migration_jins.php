<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class MigrationJins extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('jins_coupon', function(Blueprint $table)
        {
            $table->increments('coupon_id');
            $table->integer('card_id');
            $table->string('code');
            $table->integer('user_id');
            $table->integer('balloon_id');            
            $table->timestamps();
        });
        Schema::create('jins_user_balloon', function(Blueprint $table)
        {
            $table->increments('user_balloon_id');
            $table->integer('user_id')->unsigned()->nullable();
            $table->integer('balloon_id');
            $table->string('message');
            $table->timestamps();
        });
        Schema::create('jins_user_support', function(Blueprint $table)
        {
            $table->integer('user_id');
            $table->integer('support_id');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::drop('jins_coupon');     
        Schema::drop('jins_user_balloon');        
        Schema::drop('jins_user_support');        
    }
}
