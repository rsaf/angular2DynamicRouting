<?php

namespace Gineign\Shop\Model;

use Illuminate\Database\Eloquent\Model;

class Region extends Model
{
	protected $table = 'regions';

	protected $primaryKey = 'region_id';

	protected $fillable = ['region_id','parent_id','region_name','region_type','agency_id'];    //
}
