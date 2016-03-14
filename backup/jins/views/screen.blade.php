<!DOCTYPE html>
<html>
<head>
	<meta charset="utf-8" />
	<meta name="keywords" content="your, awesome, keywords, here" />
	<meta name="author" content="Rolland" />
	<meta name="description" content="Larosabelle" />
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	<title>JINS</title>
	<link rel="stylesheet" type="text/css" href="/assets/jins/game.min.css">
	<style type="text/css">
	/*#game*/
		body{
			background: black;
			overflow: hidden;
			overflow-x:hidden;
			overflow-y:hidden;
		}
	</style>
</head>
<body>
<canvas id="game"></canvas>
<script type="text/javascript" src="/assets/jins/game.min.js"></script>
<script type="text/javascript" src="/assets/jins/screen.min.js"></script>
<script type="text/javascript">

	// 121.40.227.215
	// open a socket connection
	if(/localhost/.test(window.location.host)){
		console.log('localhost');
           var socket = new io.connect('localhost:3001');
       }
       else{
           console.log('not localhost');
           var socket = new io.connect('http://www.gineign.cn:3001', {
               'reconnection': true,
               'reconnectionDelay': 1000,
               'reconnectionDelayMax' : 5000,
               'reconnectionAttempts': 5
           });
       }


	var i = 0
	// when user connect, store the user id and name
	socket.on('connect', function (user) {
		//alert();
		console.log(user);
	    socket.emit('join', {id: "asdfeee", name: "asdf"});

	});

	// get connected users and display to all conected
	socket.on('chat.balloon', function (data) {
	   	data = JSON.parse(data);
	   	console.log(data);
	   	play.Play.Instance.shoot(data);
	});
	socket.on('chat.explosion', function(data){
		data = JSON.parse(data);
		play.Play.Instance.explode(data);
	});

	</script>
</body>
</html>