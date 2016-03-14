/// <reference path="../typings/tsd.d.ts" />
/// <reference path="config.ts" />
/// <reference path="service/LiteEvent.ts" />
/// <reference path="game/Game.ts" />
/// <reference path="service/Sfx.ts" />
/// <reference path="service/Util.ts" />
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
	static width: number = 1280;
	static height: number;  // 1080 for the best display
	static ratio: number;
	static openWindows = [];
	static ToResize;
	static resources = [];
	static count: number = 0;
	static luckyCount: number = 0;
	static loadAssets() {
		config.isProjection = service.Util.getQueryVariable('isProjection') ? true : false;
		if(config.isProjection) {
			// code...
			App.width = 1024;
		}
		App.screenWidth = (document.documentElement.clientWidth || App.width);
		App.screenHeight = (document.documentElement.clientHeight || App.height);

		
		config.x = parseInt(service.Util.getQueryVariable('x')) || 0;
		config.y = parseInt(service.Util.getQueryVariable('y')) || 0;
		config.width = parseInt(service.Util.getQueryVariable('width')) || App.screenWidth;
		config.height = parseInt(service.Util.getQueryVariable('height')) || App.screenHeight;
		console.log('config', config);
		App.adjustCanvas();


		var _list = [
			"/assets/jins/screen.png",
			"/assets/jins/screen.json",
			"/assets/jins/qrcode.png"
		];
		var _this = this;
		PIXI.loader.add(_list).load(function() {
			$("#loader").addClass('hide');
			$("#logo").addClass('hide');
			$("#game").show();
			App.gameInit();
		});
		PIXI.loader.on("progress", function(e) {

			var progress = Math.floor(PIXI.loader.progress);
			var progressString: string = progress.toString() + '%';
			$("#percent").html(progressString);
			var targetLight = Math.floor(progress / 16.66);
			var i = 1;
			while (++i < targetLight + 1) {
				$('.dotBarInner .dot-' + i + ' .on').css('display', 'block');
				$('.dotBarInner .dot-' + i + ' .off').css('display', 'none');
			}

		});
	}
	static gameInit() {
		Sfx.FnBgm();
		App.EventState = new LiteEvent();
		App.EventResize = new LiteEvent();
		App.EventUpdate = new LiteEvent();

		App.render = PIXI.autoDetectRenderer(config.width, config.height, {
			view: <HTMLCanvasElement>document.getElementById("game"),
			resolution: 2,
			autoResize: true,
			backgroundColor: 0xFFFFFF
		});

		//PIXI.DOM.Setup(App.render, true);
		App.stage = new PIXI.Container();
		App.fitWindow();
		App.fnLoop();
		App.stage.addChild(Game.Instance);
		App.play();
	}
	static adjustCanvas(){
		if (config.isProjection) {
		 	$('#game').css({
		 		'position': 'absolute',
		 		'left': config.x,
		 		'top':config.y
		 	})
		 } 
	}
	static resize(){
		if (App.ToResize) {
		    clearTimeout(App.ToResize);
		}
		App.ToResize = setTimeout(App.fitWindow, 300);
	}
	static fitWindow() {
		// console.log('fit window');
		App.render.resize(config.width, config.height);
		App.render.render(App.stage);

		App.height = config.height * App.width / config.width;
		App.ratio = App.stage.scale.x = App.stage.scale.y = config.width / App.width;
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
}