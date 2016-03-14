/// <reference path="../../App.ts" />


module play {
	export class Bg extends PIXI.Sprite {
		static _Instance: Bg;
		constructor() {

			var _this = this;

			var withoutBalloons = PIXI.Texture.fromFrame("bg.png");
			var withBalloons = PIXI.Texture.fromFrame("bg.jpg");

			if (App.isShared){
				super(withoutBalloons);
			}
			else{
				super(withBalloons);
			};


			App.EventState.on(function(aState) {
				switch (aState) {
					case STATE.PLAY:
						_this.texture = withoutBalloons;
						break;
				}
			});
		}
		static get Instance(): Bg {
			if (!Bg._Instance) {
				Bg._Instance = new Bg();
			}
			return Bg._Instance;
		}
		show(){
			var _this = this;

		}
	}
}


