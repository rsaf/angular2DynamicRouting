<!DOCTYPE html>
<html>
<head lang="en">
    <!--angular route config base-->
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0,minimum-scale=1.0,maximum-scale=1.0 user-scalable=no">
    <meta http-equiv="X-UA-Compatible" content="IE=Edge,chrome=1" />
    <title>上海日生食品</title>
    <link rel="stylesheet" type="text/css" href="/assets/shop/lib.min.css">
    <link rel="stylesheet" type="text/css" href="/assets/shop/shop.min.css">
</head>
<body>
<div class="container-fluid" ui-view></div>
<div ng-include="'/assets/shop/views/nav.html'"></div>

<script src="https://res.wx.qq.com/open/js/jweixin-1.0.0.js"></script>
<script type="text/javascript">
wx.config({!! $js->config(array('onMenuShareTimeline','onMenuShareAppMessage','onMenuShareQQ', 'onMenuShareWeibo','WeixinJSBridge','chooseWXPay'))!!});
</script>
<script type="text/javascript" src="/assets/shop/lib.min.js"></script>
<script type="text/javascript" src="/assets/shop/shop.min.js"></script>
</body>
</html>