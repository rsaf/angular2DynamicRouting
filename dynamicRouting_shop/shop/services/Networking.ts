/// <reference path="../Shop.ts" />

app.service('$networking', function($http ,$log ,$rootScope ){
        // 检查是否登录
		this.get = function(path, callback){
			$http.get(path).success(function(data) {
				if(data.status==true){
					callback(data.result);
				}
			})
		}

  });