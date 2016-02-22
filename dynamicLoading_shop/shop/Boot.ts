/// <reference path="Shop.ts" />
var user;
angular.element(document).ready(function() {
	angular.injector(['ng']).get('$http').get('api/auth')
		.then(function success(response) {
		if (response.data.status) {
			user = response.data.result;
			 //console.log(user);
			angular.bootstrap(document, ['shop']);
		} else {
			console.log('error---');
			alert('b')
		}
	     
	 })
	 .then(null, function failure(error){
		console.log('error---',error);
		alert('a')
		
	 });
	// angular.bootstrap(document, ['shop']);
});