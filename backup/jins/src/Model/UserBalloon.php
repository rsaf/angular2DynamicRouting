<?php

namespace Project\Jins\Model;

use Illuminate\Database\Eloquent\Model;

class UserBalloon extends Model
{
	protected $table = 'jins_user_balloon';

   	protected $primaryKey = 'user_balloon_id';

    protected $fillable = ['balloon_id','user_id', 'message'];

    protected $casts = [
	    'user_id' => 'integer',
	    'balloon_id'=>'integer',
	    'message'=>'string'
		];
		public function user()
		{
			return $this->hasOne('Project\Jins\Model\User','user_id','user_id');
		}
}
