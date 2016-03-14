<?php

namespace Project\Jins\Model;

use Illuminate\Database\Eloquent\Model;

class UserSupport extends Model
{
	protected $table = 'jins_user_support';
      
    protected $fillable = ['support_id','user_id'];

    protected $casts = [
	    'user_id' => 'integer',
	    'support_id'=>'integer'
	];
}
