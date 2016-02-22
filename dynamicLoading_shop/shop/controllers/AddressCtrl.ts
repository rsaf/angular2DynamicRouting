
module shop {
    export class AddressCtrl {
        constructor($scope, $networking) {
			$networking.get('api/shop/cart', function(data) {
				console.log(data);
				$scope.data = data;

			})
        }
    }
}