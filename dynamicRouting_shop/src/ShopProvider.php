<?php

namespace Gineign\Shop;

/**
 * Service provider for laravel.
 *
 * @author Alejandro Mostajo
 * @copyright Gineign, LLC
 * @license MIT
 * @package Gineign\Shop
 */

use Illuminate\Routing\Router;
use Illuminate\Foundation\Support\Providers\RouteServiceProvider as ServiceProvider;
use File;

class ShopProvider extends ServiceProvider
{

    /**
     * Indicates if loading of the provider is deferred.
     *
     * @var bool
     */
    protected $defer = false;

    /**
     * Bootstrap the application events.
     *
     * @return void
     */
    public function boot(Router $router)
    {
        parent::boot($router);
        $this->publishMigration();
        // Publish config files
        // $this->publishes([
        //     __DIR__ . '/Config/config.php' => config_path('shop.php'),
        // ]);

        // Register commands
        // $this->commands('command.laravel-shop.migration');

        $configTarget = realpath(__dir__ . '/Config/config.php');
        $configLink = config_path('shop.php');

        if (!is_link($configLink)) {
            symlink($configTarget, $configLink);
        }


        ///laravel blade
        $viewTarget = realpath(__dir__.'/../views');


        $viewLink = base_path('resources/views/shop');

        if (!is_link($viewLink)) {
            symlink($viewTarget, $viewLink);
        }




        if(!File::Exists(public_path('assets'))){
            File::makeDirectory(public_path('assets'));
        }

        // dist

        $target = realpath(__dir__ . '/../dist');

        $link = public_path('assets/shop');

        if (!is_link($link)) {
            symlink($target, $link);
        }



        $shopTarget = realpath(__dir__.'/../shop/views');

        $shopLink = realpath(__dir__.'/../dist'). '/views';
        // dd($viewLink . '/views');
        if (!is_link($shopLink)) {
            symlink($shopTarget, $shopLink);
        }


        $adminTarget = realpath(__dir__.'/../admin/views');

        $adminLink = realpath(__dir__.'/../shop/views'). '/admin';
        // dd($viewLink . '/views');
        if (!is_link($adminLink)) {
            symlink($adminTarget, $adminLink);
        }

    }


    public function publishMigration(){
        // Publish migrations
        $migrations = realpath(__DIR__.'/../migrations');

        $this->publishes([
            $migrations => $this->app->databasePath().'/migrations',
        ], 'migrations');
    }

    /**
     * Register the service provider.
     *
     * @return void
     */
    public function register()
    {
        $this->registerShop();

        // $this->registerCommands();

        $this->mergeConfig();
    }

    /**
     * Register the application bindings.
     *
     * @return void
     */
    private function registerShop()
    {
        $this->app->singleton('shop', function ($app) {
            return new Shop($app);
        });
    }

    /**
     * Merges user's and entrust's configs.
     *
     * @return void
     */
    private function mergeConfig()
    {
        $this->mergeConfigFrom(
            __DIR__ . '/Config/config.php', 'shop'
        );
    }

    /**
     * Register the artisan commands.
     *
     * @return void
     */
    private function registerCommands()
    {
        $this->app->bindShared('command.laravel-shop.migration', function ($app) {
            return new MigrationCommand();
        });
    }

    /**
     * Get the services provided.
     *
     * @return array
     */
    public function provides()
    {
        return [
            'shop', 'command.laravel-shop.migration'
        ];
    }

    /**
     * Maps router.
     * Add package special controllers.
     *
     * @param Router $route Router.
     */
    public function map(Router $router)
    {
        $router->group(['namespace' => 'Gineign\Shop\Http\Controllers'], function($router) {

            $router->group(['prefix' => 'shop','middleware' => ['web'] ], function ($router) {

                $router->get('/', 'ShopController@index');

                $router->get('admin',['middleware'=>['admin'], 'uses'=>'ShopController@admin']);

                $router->get('callback/payment/{status}/{id}/{shoptoken}', ['as' => 'shop.callback', 'uses' => 'Shop\CallbackController@process']);

                $router->post('callback/payment/{status}/{id}/{shoptoken}', ['as' => 'shop.callback', 'uses' => 'Shop\CallbackController@process']);

            });


            $router->group(['prefix' => 'api'], function ($router) {

                $router->resource('region', 'Api\RegionController');

                $router->group(['prefix' => 'shop'], function ($router) {
                    $router->controller('test', 'Api\ShopApiController');
                    $router->controller('cart', 'Api\CartController');
                    $router->resource('address', 'Api\UserAddressController');
                    $router->resource('product', 'Api\ProductController');
                    $router->resource('category', 'Api\CategoryController');
                    $router->controller('checkout', 'Api\CheckoutController');
                    $router->controller('order', 'Api\OrderController');

                });

            });
        });
    }

}
