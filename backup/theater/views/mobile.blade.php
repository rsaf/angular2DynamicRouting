<!DOCTYPE html>
<html>
<head>
    <meta name="keywords" content="your, awesome, keywords, here" />
    <meta name="author" content="Rolland" />
    <meta name="description" content="Newbalance" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0, user-scalable=1.0, minimum-scale=1.0, maximum-scale=1.0">
    

    <title>mobile</title>
	<style type="text/css">

	* {
		box-sizing: border-box !important;
	}

	body{
		background:black; 
		height:100%;
		min-height:300px;
		width: 100%;
		overflow: hidden !important;
		margin: 0;
		padding: 0;
		position: absolute;
	}


	ul#chatHistory{
		list-style: none;
		overflow: auto !important;
		padding-left: 20px;
		width: 100%;
		display: block;
		height: 60%;
		max-height: 60%;
		min-height: 200px;
	}

	ul#chatHistory li{
		margin: 10px 0;
	}

	
	</style>
</head>
<body>
<div style="height:100%; overflow: hidden;" >
		<div id="chatbox" style="height:100% position:relative;">
			<div class="message" style="color: #a2a2a2; margin-bottom: 10px;  height: 80%;">
				<div style="background:#323232; height: 41px; width: 100%; font-size:12px; ">
					<div style="line-height: 41px;color:#fff; text-align: center;">
						Welcome To The Theater
					</div>
				</div>	
				<ul id="chatHistory"></ul>
			</div>
			
			<div class="input-box" style="background-color: #323232; padding: 5px;  width:100%; display: block; position:absolute; bottom:0; left:0; overflow:hidden;">
				<div name="input-box" style="min-width: 150px; height:45px; width:70%; float:left;">
					<input type="text" maxlength="140" placeholder="请输入聊天内容，点击发送" id="chatEntry" name="content" style="padding: 0 5px; border: medium none; width: 100%; height:100%;">
				</div>
				<div style="min-width: 60px; width:30%; height:45px; float:left;">
					<button type="button" id="submitChat" style="float:left; padding: 0 5px; border: medium none; width: 100%; height:100%; background-color:#eb3242;" >提交</button>
				</div>
			</div>
	</div>
</div>

<script type="text/javascript" src="{{asset('assets/theater/game.min.js')}}"></script>
	
<script type="text/javascript">
      
       var $chatbox = $('#chatEntry');
       //var $chatUsers = $('ul.chatUsers');
       // open a socket connection

       if(/localhost/.test(window.location.host)){

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

   
    
       $('#submitChat').click(function (e) {
           e.preventDefault();

            console.log($chatbox.val())
			$.ajax({
			  type: "POST",
			  url: 'mobile',
			  data: {
			  	message: $chatbox.val(),
			  	_token: '{{csrf_token()}}'
			  },
			  success: function(res){
			  		// console.log('post succesfull ---',res)a;
			  		if(res.status == true){
			  			console.log('succes-----'+JSON.stringify(res.result));
			  			var data = res.result;
			  			$('#chatHistory').append('<li><span>'+ data.nickname+'</span> : <span>' + data.message +'</span></li>');
			  			 $chatbox.val('');
			  		}else{
			  			alert('failed');
			  		}
			  },
			  error: function(res){
			  	// alert('erro');	
			  }

			});

           // socket.emit('chat.send.message', {msg: $chatbox.val(), nickname: 'rolland'});

         
       });

          // when user connect, store the user id and name
       socket.on('connect', function (user) {
           console.log('connnected---');
           socket.emit('join', {id: "1", name: "sf"});
       });
       // get connected users and display to all conected
       socket.on('chat.user', function (nicknames) {
           var html = '';
           $.each(nicknames, function (index, value) {
               html += '<li><a href="' + value.socketId + '">' + value.nickname + '</a></li>';
           });
          // $('#chatHistory').append(html);
       });
       // wait for a new message and append into each connection chat window
       socket.on('chat.message', function (data) {
       		//alert('success');
           console.log('chat message is here!!!!',data);
           data = JSON.parse(data);

          
           
      });


       socket.on('chat.message', function (data) {
        	data = JSON.parse(data);
            $('#chatHistory').append('<li><span>' +data.nickname+'</span> : <span>' +data.msg +'</span></li>');
            $chatbox.val('');

			});


      </script>
</body>
</html>
