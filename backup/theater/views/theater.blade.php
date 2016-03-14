<html>
<head>
	<title></title>
	<link rel="stylesheet" type="text/css" href="{{asset('assets/theater/game.min.css')}}">
	<style type="text/css">
		body{
			background: #000;
			overflow: hidden;
		}
		.user-list{
			width: 100%;
			height: 6em;
			position: fixed;
			bottom: 0;
		}
		#users{
			height: 100%;
			/*background: red;*/
			background: rgba(0,0,0,0.5);
			float: left;
		}
		.user{
			height: 6em;
			width: 6em;	
			padding: 0.5em;
			float: left;
			/*background: red;*/

		}
		.user img{
			border-radius: 2.5em;
		}

		#messages{
			position: fixed;
			top: 0;
			height: 4em;
			width: 100%;
			/*background: red;*/
			background: rgba(0,0,0,0.5);
		}
		.message{
			position: absolute;
			top: 0;
			right: 0;
			color: white;
			font-size: 1.5em;
		}

		#logo{
			position: absolute;
			padding: 20px;
			left: 0;
			top:0;
			width: 200px;
			height: 50px;
			/*background: red;*/
			z-index: 1000;
		}
	</style>
</head>
<body>
	<video src="http://7xijbu.com2.z0.glb.qiniucdn.com/kate_press_online_hd.mp4"  width="100%" poster="{{asset('assets/theater/videoPoster.jpg')}}" autoplay></video>

	<div id="logo">
		<img src="{{asset('assets/theater/logo_big.png')}}" >
	</div>
	<div id="messages"></div>
	<div class="user-list">
		<div class="col-xs-1">
			<img class="thumbnail" src="{{asset('assets/theater/qrcode.png')}}" width="84px" height="84px">
		</div>
		<div  class="col-xs-11" id="users">

		</div>
	</div>

		


	<script type="text/javascript" src="{{asset('assets/theater/game.min.js')}}"></script>
	<script type="text/javascript">

	var $messageForm = $('#send-message');
	var $messageBox = $('#message-input');
	var $chat = $('ul.chat');
	var $chatUsers = $('ul.chatUsers');
	// 121.40.227.215
	// open a socket connection
	if(/localhost/.test(window.location.host)){
		console.log('localhost');
           var socket = new io.connect('http://localhost:8080');

       }
       else{
           console.log('not localhost');
           var socket = new io.connect('http://www.gineign.cn:8080', {
               'reconnection': true,
               'reconnectionDelay': 1000,
               'reconnectionDelayMax' : 5000,
               'reconnectionAttempts': 5
           });
       }


	var i = 0
	// when user connect, store the user id and name
	socket.on('connect', function (user) {
	    socket.emit('join', {id: "asdf", name: "asdf"});
	});

	// get connected users and display to all conected
	socket.on('chat.user', function (data) {
		// alert('a');
		console.log(data);
	   	data = JSON.parse(data);
		if($('#'+data.openid)[0]){
			$('#'+data.openid).remove();
		}
		$('#users').append('<div class="user" id="'+data.openid+'"><img src="'+data.headimgurl+'" width="100%"></div>');    		
			
	});


	// wait for a new message and append into each connection chat window
	socket.on('chat.message', function (data) {
		console.log(data);
	    data = JSON.parse(data);

        $('#messages').append('<div class="message msg'+i+'"><span>'+ data.nickname +': ' +data.msg+'</span></div>');
        

        $(".msg"+i).css({
        	marginTop:i % 5 * 20
        })
        

        // when we are sending message we move img to the very right!
        if($('#'+data.openid)[0]){
        	$('#'+data.openid).remove();
        }

        $('#users').prepend('<div class="user" id="'+data.openid+'"><img src="'+data.headimgurl+'" width="100%"></div>');    		
        

        // console.log(i);
        //$().css({'y': count % 4 * 50})
        $(".msg"+i).velocity({ 
        	left: -200 
        },
        {
        	duration:8000, 
        	complete:function(){
        		$(this).remove();
        	}
        });

        i ++;
	    
	});

	$("#logo").click(function(){
		$.ajax({
		  type: "GET",
		  url: 'theater/message',
		  data: {
		  	message: 'asdf',
		  	_token: '{{csrf_token()}}'
		  },
		  success: function(res){
		  	console.log(res);
		  }
		});
	})


	</script>
</body>
</html>