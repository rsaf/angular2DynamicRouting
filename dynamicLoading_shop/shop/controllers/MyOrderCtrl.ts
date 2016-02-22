/// <reference path="../Shop.ts" />

module shop {
    export class MyOrderCtrl {
        constructor($scope, $networking, $stateParams, $http) {
			$scope.user = user;
			
			// $networking.get('api/shop/order', function(data) {
			// 	// console.log(data.lastPage);
			// 	$scope.data = data;

			// })
			$http({
			    method: 'GET',
				url: '/api/shop/order',
			    data: $.param({
			        'user_id': user.user_id,
					'statusCode': $stateParams.status
			    }),
			    headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
			})
			.success(function(response) {
				console.log(response);
				if (response.status == true) {
			        // alert('操作成功!');
					$scope.data = response.result;
			    }else{

			    }
			})

        }
    }
}