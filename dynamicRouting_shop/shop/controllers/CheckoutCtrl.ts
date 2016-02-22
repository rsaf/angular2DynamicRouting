/// <reference path="../Shop.ts" />
module shop {
    export class CheckoutCtrl {

        constructor($scope, $networking, $http, $state) {
            this.scope = $scope;
            this.http = $http;
            this.state = $state;

            $scope.user = user;
            $networking.get('api/shop/cart', function(data) {
                console.log(data);
                $scope.data = data;
                // alert('a')
            })

            $networking.get('api/region?parent_id=1', function(data) {
                // console.log(data);
                $scope.provinces = data;
            });
            console.log(user.user_id);
            $networking.get('api/shop/address?user_id=' + user.user_id, function(data) {
                // console.log(data);
                $scope.address = data[0];
            })

            $scope.provinceSelected = function(value) {

                $networking.get('/api/region?parent_id=' + value, function(data) {
                    $scope.cities = data;
                    // console.log(data);
                })

            }
            $scope.citySelected = function(value) {
                $networking.get('/api/region?parent_id=' + value, function(data) {
                    $scope.districts = data;
                    // console.log(data);
                })
            }

            $scope.addressConfirm = function(address) {
                // $('#addProduct').modal('toggle')
                // console.log(address);
                $http({
                    method: 'POST',
                    url: '/api/shop/address',
                    data: $.param({
                        'province_id': address.province,
                        'city_id': address.city,
                        'district_id': address.district,
                        'address': address.address
                    }),
                    headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
                }).success(function(data) {
                        console.log(data);
                        if (data.status == true) {
                            // alert('操作成功!');
                            $scope.address = data.results;
                        } else {

                        }
                    })

            }



            // $scope.

            $scope.checkout = function(gateway) {

                if (gateway == 'wechat') {
                    // code...
                    $scope.handleWechat();
                }

                $scope.postPayment(gateway);

            } 



            $scope.postPayment =  function(gateway) {
                var _this = this;

                $http({
                    method: 'POST',
                    url: '/api/shop/checkout',
                    data: $.param({
                        'gateway': gateway
                    }),
                    headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
                }).success(function(data) {
                    console.log(data);
                    if (data.status == true) {
                        // alert('操作成功!');
                        $scope.address = data.results;
                        $state.go('profile')
                    } else {
                        alert('操作失败!');
                    }
                });
            }

            $scope.handleWechat = function() {

                // alert('handleWechat---');

                // var _this = this;
                // if (typeof WeixinJSBridge == "undefined") {
                //     alert('请使用微信');
                //     if (document.addEventListener) {
                //         document.addEventListener('WeixinJSBridgeReady', this.onBridgeReady, false);
                //     } else if (document.attachEvent) {
                //         document.attachEvent('WeixinJSBridgeReady', this.onBridgeReady);
                //         document.attachEvent('onWeixinJSBridgeReady', this.onBridgeReady);
                //     }
                // } else {
                //     alert('pay');

                //     WeixinJSBridge.invoke('getBrandWCPayRequest', {}, function(res) {
                //         alert('got response');
                //         alert('response--' + JSON.stringify(res));
                //     });
                // }

                if( typeof WeixinJSBridge === 'undefined' ) {
                    alert('请在微信在打开页面！');
                    return false;
                }
                WeixinJSBridge.invoke(
                    'getBrandWCPayRequest', {},function(res) {
                    switch(res.err_msg) {
                        case 'get_brand_wcpay_request:cancel':
                            alert('用户取消支付！');
                            break;
                        case 'get_brand_wcpay_request:fail':
                            alert('支付失败！（'+res.err_desc+'）');
                            break;
                        case 'get_brand_wcpay_request:ok':
                            alert('支付成功！');
                            break;
                        default:
                            alert(JSON.stringify(res));
                            break;
                    }
                });



            }

        }  //end constructor

      }
}
