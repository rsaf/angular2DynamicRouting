<?php


namespace Gineign\Theater;


use Illuminate\Routing\Router;
use Illuminate\Foundation\Support\Providers\RouteServiceProvider;
use File;

/**
*
*/
class ServiceProvider extends RouteServiceProvider
{

	protected $defer = false;
	/**
	 * Bootstrap the application events.
	 *
	 * @return void
	 */
	public function boot(Router $router)
	{

	    parent::boot($router);

        $target = realpath(__dir__ . '/../dist');

        $link = public_path('assets/theater');

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


        $viewLink = base_path('resources/views/game/theater');
        // $viewLinkScreen = base_path('resources/views/game/screen.blade.php');

        if (!is_link($viewLink)) {
            symlink($viewTarget, $viewLink);
        }


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

        // $router->group(['namespace' => 'Gineign\Auth\Controllers'], function($router) {

        //     $router->controller('auth','AuthController');

        //     $router->controller('admin','AdminController');

        //     $router->group(['prefix'=>'api'], function($router){
        //     	$router->any('auth', 'ApiController@auth');
        //     	$router->resource('user', 'Api\\UserController');
        //     });
        //    // dd('a');
        // });
        $router->group(['namespace' => 'Gineign\Theater\Controllers','middleware' => ['web']], function($router) {

                $router->controller('theater', 'TheaterController');
         });


    	$router->get('test', function(){
    		return 'aa';
    	});
    }
}
