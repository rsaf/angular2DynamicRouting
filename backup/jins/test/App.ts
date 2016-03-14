/// <reference path="../typings/tsd.d.ts" />
/// <reference path="config.ts" />
/// <reference path="service/LiteEvent.ts" />
/// <reference path="game/Game.ts" />
/// <reference path="service/Sfx.ts" />
/// <reference path="util.ts" />
class App {

	static state: STATE = STATE.LOADING;
	static EventState: LiteEvent;
	static EventResize: LiteEvent;
	static EventUpdate: LiteEvent;
	static render: PIXI.CanvasRenderer | PIXI.WebGLRenderer;
	static stage: PIXI.Container;
	static time;
	static screenWidth: number;
	static screenHeight: number;
	static width: number = 750;
	static height: number;  // 1204 for the best display
	static openWindows = [];
	static isPrize = false;
	static isFirst = false;
	static isShared = false;
	static userBalloons: any[]=[]; 
	static userSupport: number = 0; 
	static userAvatar: string = '';
	static userName: string = '';
	static customBalloonText:string = '';
	static customBalloon: number=0;
	static ratio:number = 1;
	static loadAssets() {

		App.screenWidth = (document.documentElement.clientWidth || App.width);
		App.screenHeight = (document.documentElement.clientHeight || App.height);


		var isLoaded = false;

		var _list = [
			"http://7xq4ii.com2.z0.glb.qiniucdn.com/mobile_all.json",
			"http://7xq4ii.com2.z0.glb.qiniucdn.com/mobile_extras.json",
			"http://7xq4ii.com2.z0.glb.qiniucdn.com/mobile_extras2.json",
			"http://7xq4ii.com2.z0.glb.qiniucdn.com/mobile_extras3.json",
		];
		var _this = this;
		PIXI.loader.add(_list).load(function() {
			$("#game").show();
			$("#loader").hide();
			var idOnUrl = util.Util.getQueryVariable('user_id');

			if (idOnUrl) {
				App.isShared = true;
				App.saveSupport(idOnUrl);
				App.getStatistics(idOnUrl);
			}
			else{

				//alert('avatar Not set');
				$('#userAvatar img').prop('src', $('meta[name="avatar"]').attr('content'));
			}

			//if (isLoaded) {
				// code...
				App.gameInit();
			//}else{
				isLoaded = true;
			//}
			
		});
		PIXI.loader.on("progress", function(e) {
			var progressString =  Math.floor(PIXI.loader.progress) + '%';
			$("#percent").html(progressString);
			
		});
	}
	static gameInit() {
		Sfx.FnBgm();
		App.EventState = new LiteEvent();
		App.EventResize = new LiteEvent();
		App.EventUpdate = new LiteEvent();

		App.render = PIXI.autoDetectRenderer(App.screenWidth, App.screenHeight, {
			view: <HTMLCanvasElement>document.getElementById("game"),
			resolution: 2,
			autoResize: true,
			transparent: true
		});

		//PIXI.DOM.Setup(App.render, true);
		App.stage = new PIXI.Container();
		App.fitWindow();
		App.fnLoop();
		App.stage.addChild(Game.Instance);
		App.play();
	}
	static fitWindow() {

		App.render.resize(App.screenWidth, App.screenHeight);
		App.render.render(App.stage);


		App.height = App.screenHeight * App.width / App.screenWidth;
		App.ratio = App.stage.scale.y = App.stage.scale.x = App.screenWidth / App.width;
		// App.render.render(App.stage);
	}
	static fnLoop() {
		var _this = this;
		window.requestAnimFrame(function() {
			App.render.render(_this.stage);
			var _now = Date.now();
			var _dt = _now - (App.time || _now);
			App.time = _now;
			App.EventUpdate.trigger(_dt);
			App.fnLoop();
		});
	}
	static intro() {
		if (App.state === STATE.INTRO) {
			return;
		}
		App.state = STATE.LOADING;
		App.EventState.trigger(STATE.INTRO);
	}
	static play() {
		if (App.state === STATE.PLAY) {
			return;
		}
		App.state = STATE.PLAY;
		App.EventState.trigger(STATE.PLAY);
	}
	static over() {
		console.log('over---');

		if (App.state === STATE.OVER) {
			return;
		}
		App.state = STATE.OVER
		App.EventState.trigger(STATE.OVER);
	}


	static saveSupport(id){
		$.ajax({
			type: 'GET',
			url: '/api/jins/support',
			data: {
				user_id: id,
				support_id: $('meta[name="user_id"]').attr('content'),
			},
			dataType: 'json',
			headers: {
				'X-CSRF-TOKEN': $('meta[name="_token"]').attr('content')
			},
			success: function(data) {
				console.log('isshared response', data);
			},
			error: function(xhr, type) {
				console.log('ajax error');
			}
		});
	}

	static getStatistics(id){
		$.ajax({
			type: 'GET',
			url: '/api/jins/statistics',
			data: {user_id: id},
			dataType: 'json',
			headers: {
				'X-CSRF-TOKEN': $('meta[name="_token"]').attr('content')
			},
			success: function(data) {
				console.log('statistics response', data);
				if(data.status){
					App.userBalloons = data.result;
					App.userSupport = data.user_support_count;
					App.userAvatar = data.userInfo.avatar;
					App.userName = data.userInfo.nickname||'Ta';
					$('#userAvatar img').prop('src', App.userAvatar); 
					$('#userName').text(App.userName);
					$('#userSupport').text(App.userSupport);
					play.Wish.Instance.setIntroWith();

				}
			},
			error: function(xhr, type) {
				console.log('ajax error');
			}
		});
	}

	static resetParams(){
		window.history.pushState({}, "cleanShare", window.location.href.split('?')[0]); //remove user_id from url.
		App.isShared = false;
		App.userBalloons = [];
		App.userSupport = 0;
		App.userAvatar = '';
		App.userName = '';
	}
}