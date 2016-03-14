<?php


namespace Project\Jins;


use Illuminate\Routing\Router;
use Illuminate\Foundation\Support\Providers\RouteServiceProvider as ServiceProvider;
use File;
use Overtrue\Wechat\Js;
use Config;
/**
* 
*/
class ProjectProvider extends ServiceProvider
{
	
	/**
	 * Bootstrap the application events.
	 *
	 * @return void
	 */
	public function boot(Router $router)
	{
		
	    parent::boot($router);

	    $target = realpath(__dir__ . '/../dist');

	    $link = public_path('assets/jins');

	    if(!File::Exists(public_path('assets'))){
	    	File::makeDirectory(public_path('assets'));
	    }

	    if (!is_link($link)) {
	    	symlink($target, $link);
	    }

	    if (!File::Exists(base_path('resources/views/game'))) {
	    	File::makeDirectory(base_path('resources/views/game'));
	    }


	    $viewTarget = realpath(__dir__.'/../views');


	    $viewLink = base_path('resources/views/game/jins');
	    // $viewLinkScreen = base_path('resources/views/game/screen.blade.php');

	    if (!is_link($viewLink)) {
	    	symlink($viewTarget, $viewLink);
	    }


	   	$migrations = realpath(__DIR__.'/../database/migrations');
	    $this->publishes([
	        $migrations => $this->app->databasePath().'/migrations',
	    ], 'migrations');


	}

	public function register()
	{
	    
	}
	public function provides(){

	}


	/**
     * Maps router.
     * Add package special controllers.
     *
     * @param Router $route Router.
     */
    public function map(Router $router)
    {
    	 $router->group(['namespace' => 'Project\Jins\Controllers', 'middleware' => ['web']], function($router) {
    	 	 if (Config::get('app.name') == 'jins') {
    	     	$router->get('/', 'HomeController@getIndex'); 
    	     	$router->get('mobile', 'HomeController@getMobile');
    	     	$router->get('interact', 'HomeController@getInteract');
    	     	$router->get('view', 'HomeController@getView');
    	     	$router->get('dsp', 'HomeController@getTest');
    	 	 }else{
    	     	$router->controller('game/jins', 'HomeController'); 
    	 	 }

	 	     $router->group(['prefix'=>'api'], function($router){
	 	      	$router->controller('jins', 'ApiController');
	 	 	});

    	 });
    }

}