
module shop {
    export class ShopCtrl{
		networking;
		http;
		scope;
		static cartSize: number;
		static page: number = 1;
		static nomoredata: boolean = false;
        constructor($scope, $networking, $http) {

			// $scope.product = {}

			var _this = this;

			ShopCtrl.cartSize = 0;
			this.networking = $networking;
			this.http = $http;
			this.scope = $scope;
			this.scope.data = {};
			this.scope.data.products = [];
			$('#shoppingCartSize').text(ShopCtrl.cartSize);

        	$networking.get('api/shop/product', function(data) {
				console.log(data);
				$scope.data = data;

			})

			$scope.check = function(value){
				// console.log(value);
	        	$networking.get('api/shop/product?search='+ value, function(data) {
					console.log(data);
					$scope.data = data;

				})
			}


			$scope.productClicked = function(product){
				$scope.product = product
				$scope.product.quantity = 1;
			}
			$scope.addToCart = function(product) {
				// $('#addProduct').modal('toggle');
				var _this = this;
				ShopCtrl.cartSize++;
				$('#shoppingCartSize').text(ShopCtrl.cartSize);

				var a = $.param({
					'product_id': product.product_id,
					'quantity': product.quantity
				});
				console.log(a);
				console.log(product.product_id);
				$http({
					method: 'POST',
					url: '/api/shop/cart/add',
					data: $.param({ 
						'product_id': product.product_id,
						'quantity':product.quantity
					}),
					headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
				})
				.success(function(results) {
					console.log(results);
					if (results.status == true) {
						// alert('操作成功!');
						// $scope.load();
					}else{

					}
				})
			}

			// $scope.page = function(page){

			// 	$networking.get('api/product?page=' + page, function(data) {
			// 		 console.log(data.lastPage);
			// 		$scope.data = data;

			// 	})
			// }


			$scope.cart = function(){
				// alert('a');
				$networking.get('shop/cart', function(data){
					console.log('chart content---',data);
					$scope.cart = data;
				})
			}
			$scope.add = function(){
				$networking.get('shop/add', function(data){
					console.log(data);
					// $scope.films = data;
				})
			}
			$scope.gateway = function(){
				$networking.get('shop/gateway', function(data){
					console.log(data);
					// $scope.films = data;
				})
			}	
			$scope.checkout = function() {
				$networking.get('shop/checkout', function(data) {
					console.log(data);
					// $scope.films = data;
				})
			}	
			$scope.order = function() {
				$networking.get('shop/order', function(data) {
					console.log(data);
					// $scope.films = data;
				})
			}


			$(window).scroll(function() {
				if ($(window).scrollTop() == $(document).height() - $(window).height()) {
						_this.getData();
				}
			});		
        }

        getData(){
			var _this = this;

			if(!ShopCtrl.nomoredata){
				
				ShopCtrl.page++;
				$('#ajaxLoader').css({ 'display': 'block' });
				this.networking.get('api/shop/product?page=' + ShopCtrl.page, function(data) {


					if (data.products&&data.products.length) {
						_this.scope.data.products = _this.scope.data.products.concat(data.products);
					}
					else {
						$('#nomoreData').css({ 'display': 'block' });
						ShopCtrl.nomoredata = true;	
					}
					$('#ajaxLoader').css({ 'display': 'none' });

				})

			}

        }


      
    }

}