/// <reference path="../Shop.ts" />
module shop {
    export class CartCtrl {
        constructor($scope, $networking) {
			$networking.get('api/shop/cart', function(data) {
				console.log(data);
				$scope.data = data;

			})
        }
    }
}