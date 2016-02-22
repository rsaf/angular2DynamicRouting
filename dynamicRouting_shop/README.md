#### Gineign Shop

    php artisan vendor:publish --provider="Gineign\Shop\ShopProvider"
    php artisan db:seed --class="Gineign\Shop\Seeder\ShopSeeder"
    php artisan db:seed --class="Gineign\Shop\Seeder\ShopExtensionSeeder"


#### Shop Configuration
    'Shop'      => Gineign\Shop\ShopFacade::class
