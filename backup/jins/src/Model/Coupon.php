<?php

namespace Project\Jins\Model;

use Illuminate\Database\Eloquent\Model;

class Coupon extends Model
{
	protected $table = 'jins_coupon';

   	protected $primaryKey = 'coupon_id';

    protected $fillable = ['user_id','card_id'];

    

    static $cards = [
    	'pchLNjssAG4IliNSYg9S1-DbXJtU', //33RMB 60%
    	'pchLNjkMQo6j9xlBS6ar6HQUkVvs', //66RMB 30%
    	'pchLNjrHdID48AqA2uvQAVw2gBmU',//88RMB 10%
       'pchLNjoD0DajBCWaFLmAtgh1UIAs' // 888RMB
    ];


    public function getCard(){
    	return $cards[$this->card_id];
    }

}
