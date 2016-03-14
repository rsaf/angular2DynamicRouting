<?php

namespace Project\Jins\Model;

use App\Model\User as UserModel;
use Project\Jins\Model\UserSupport;

class User extends UserModel
{
    public function count(){
      return UserSupport::where('user_id',$this->user_id)->count();
    }
}
