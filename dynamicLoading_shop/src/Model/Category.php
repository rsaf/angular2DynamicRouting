<?php

namespace Gineign\Shop\Model;

use Illuminate\Database\Eloquent\Model;

class Category extends Model
{
    protected $table = 'shop_categories';
    protected $primaryKey = 'category_id';    

	/**
	 * The attributes that are mass assignable.
	 *
	 * @var array
	 */
	protected $fillable = ['name','desc'];


    public function scopeSort($query, $data){

        return $query;
    }
}
