/// <reference path="../Game.ts" />
/// <reference path="selectBalloon/SelectBalloon.ts" />
/// <reference path="ShootPage.ts" />
/// <reference path="custom/Custom.ts" />
/// <reference path="Bg.ts" />


module play {
	export class Play extends PIXI.Container {
		static _Instance: Play;
		static state:LiteEvent;
		static currentQuestion;
		static opening: boolean = false;
		static selections: string[] = [];
		static selectedToday:boolean;
		constructor() {
			var _this = this;
			super()
			Play.state = new LiteEvent();
			this.visible = false;
			this.addChild(play.Bg.Instance);
			this.addChild(play.SelectBalloon.Instance);
			this.addChild(play.custom.Custom.Instance);
			this.addChild(play.ShootPage.Instance);

			App.EventState.on(function(aState) {
				switch (aState) {
					case STATE.PLAY:
						console.log('play----');
						_this.show();
						break;
					case STATE.OVER:
						_this.hide();
						break;
				}
			});
			
		}
		static get Instance(): Play {
			if (!Play._Instance) {
				Play._Instance = new Play();
			}
			return Play._Instance;
		}

		show(){
			this.visible = true;
		}

		hide() {
			this.visible = false;
		}


	}
}