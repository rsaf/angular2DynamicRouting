<!DOCTYPE html>
<html>
<head>
	<meta charset="utf-8" />
	<meta name="keywords" content="JINS" />
	<meta name="author" content="Gineign Production" />
	<meta name="description" content="JINS EVENT" />
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	<meta name="_token" content="{{ csrf_token() }}"/>
	<meta name="user_id" content="{{ $user->user_id }}"/>
   <meta name="isInteract" content="{{ $isInteract }}"/>
   <meta name="avatar" content="{{ $user->avatar->image }}"/>
   <meta name="isPhone" content="{{ $user->phone ? 'true' : 'false' }}"/>
   <meta name="card_id" content="{{$cardId}}">
   <meta name="nickname"  content="{{$user->nickname}}">
	<title> JINS</title>

	<link rel="stylesheet" type="text/css" href="/assets/jins/game.min.css">
   <style type="text/css">

   #phoneInput{
      position: absolute;
      z-index: 99;
      width: 240px;
      height: 50px;
      margin: auto;
      background: url('/assets/jins/PhoneNumber.png') center center no-repeat;
      background-size: 240px 50px;
      top: 50%;
      left: 50%;
      margin-left: -120px;
      margin-top: -25px;
      display: none;
   }

   #customWishMessage{
      position: absolute;
      z-index: 99;
      width: 250px;
      height: 75px;
      margin: auto;
      background: url('/assets/jins/CustomWishBg.png') center center no-repeat;
      background-size: 250px 75px;
      bottom: 20%;
      left: 50%;
      margin-left: -125px;
      display: none;
      color: white;
   }

     #phoneInput input,  #customWishMessage input{
      background: transparent;
      width: 100%;
      height: 100%;
      box-sizing:border-box;
      border: none;
      padding: 10px;
      font-size: 1.3em;
      outline: none !important;
   }

    #customWishMessage input{
      color: white;
    }



   #userAvatar{
      position: absolute;
      z-index: 1000;
      top: 50%;
      left: 57%;
      width: 80px;
      height: 80px;
      margin-top: -40px;
      margin-left: -40px;
      display: none;
   }

    #userAvatar img{
      display: block;
      max-width: 80px;
      max-height: 80px;
      border-radius: 40px;
      margin: auto;
    }

   #userStats{
      padding: 5px 10px;
      margin-top: 50px;
      text-align: center;
      position: absolute;
      z-index: 1001;
      font-size: 1.3em;
      font-weight: 900;
      display: none;
      background:rgba(255,255,255,0.6);
   }


   #loader{
      position: absolute;
      width: 100%;
      height: 100%;
      z-index: 3;
   }

   #Logo{
    position: absolute;
      top: 8em;
      left: 50%;
      margin-left: -100px;
      text-align: center;
      z-index: 4;
   }


   #Logo img{
    width: 80%;
    height: 80%;
   }

   #percent{
      position: absolute;
      top: 50%;
      left: 50%;
      margin-top: -30px;
      margin-left: -50px;
      width: 100px;
      height: 60px;
      text-align: center;
      z-index: 5;
      font-size: 1.5em;
   }

   </style>
</head>

<body>

<div id="loader">
         <div id="Logo"> <img src="/assets/jins/Logo.png" /> </div>
      <div id="percent">10%</div>
 </div>

 <div id="phoneInput">
    <input  type="text" />
 </div>

  <div id="userAvatar">
   <img src=''>
 </div>

 <div id="userStats">
    <em id='userName'> Ta </em> 已经获得<em id='userSupport'> 0 </em> 个朋友点击支持，越多点击越有机会实现愿望，你也赶紧试试吧
 </div>


  <div id="customWishMessage">
   <input  type="text"  placeholder="请输入20字内的心愿" maxlength="20" style="color:white;"/>
  </div>


</div>
<canvas id="game" style="z-index:1"></canvas>
<script type="text/javascript" src="http://res.wx.qq.com/open/js/jweixin-1.0.0.js"></script>
<script type="text/javascript" src="/assets/jins/game.min.js"></script>
<script type="text/javascript" src="/assets/jins/mobile.min.js"></script>


<!-- wechat script -->
<script type="text/javascript">

   wx.config({!! $js->config(array('onMenuShareTimeline', 'onMenuShareAppMessage')) !!});
   
   wx.ready(function(){
        // 获取“分享到朋友圈”按钮点击状态及自定义分享内容接口
        wx.onMenuShareTimeline(sdata);
        wx.onMenuShareAppMessage(sdata);
    });

   function addCard(){
      wx.addCard({
          cardList: [
            {
              cardId: "{{$cardId}}",
              cardExt: '{"nonceStr":"{{$config['nonceStr'] }}","timestamp": {{$config['timestamp']}}, "signature":"{{$signature}}"}'
            }
          ],
          success: function (res) {
            // alert('已添加卡券：' + JSON.stringify(res.cardList));
            over.Over.Instance.showEnding();
          },
          fail:function(res){
            over.Over.Instance.showEnding();
          },
          cancel:function(res){
            over.Over.Instance.showEnding();
          }
        });
   }  
</script>
</body>
</html>