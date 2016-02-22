/// <reference path="../typings/tsd.d.ts" />
/// <reference path="Boot.ts" />
/// <reference path="controllers/ShopCtrl.ts" />
/// <reference path="controllers/ProfileCtrl.ts" />
/// <reference path="controllers/CartCtrl.ts" />
/// <reference path="controllers/MyOrderCtrl.ts" />
/// <reference path="controllers/CheckoutCtrl.ts" />
/// <reference path="controllers/AddressCtrl.ts" />

var app = angular.module("shop", ['ui.router'])
	.config(['$urlRouterProvider', '$stateProvider', function($urlRouterProvider, $stateProvider) {
		$urlRouterProvider.otherwise('/');
		$stateProvider
			.state('shop', {
				url: '/',
				templateUrl: '/assets/shop/views/shop.html',
				controller: shop.ShopCtrl
			})
			.state('search', {
				url: '/search',
				templateUrl: '/assets/shop/views/search.html',
				controller: shop.ShopCtrl
			})
			.state('cart', {
				url: '/cart',
				templateUrl: '/assets/shop/views/cart.html',
				controller: shop.CartCtrl
			})
			.state('profile', {
				url: '/profile',
				templateUrl: '/assets/shop/views/profile.html',
				controller: shop.ProfileCtrl
			})
			.state('myorder', {
				url: '/profile/order?status',
				templateUrl: '/assets/shop/views/myorder.html',
				controller: shop.MyOrderCtrl
			})
			.state('checkout', {
				url: '/checkout',
				templateUrl: '/assets/shop/views/checkout.html',
				controller: shop.CheckoutCtrl
			})
			.state('address', {
				url: '/address',
				templateUrl: '/assets/shop/views/address.html',
				controller: shop.AddressCtrl
			});

	}]);