/// <reference path="Play.ts" />


module play {
	export class IntroWish extends PIXI.Sprite {
		static _Instance: IntroWish;
		constructor() {
			super(PIXI.Texture.fromFrame("IntroWish.png"));
			this.x = 250;
			this.y = 0;
			this.alpha = 0;
			var _this = this;
			setTimeout(function() {
				_this.show();
			}, 1000);
		}
		static get Instance(): IntroWish {
			if (!IntroWish._Instance) {
				IntroWish._Instance = new IntroWish();
			}
			return IntroWish._Instance;
		}
		show(){
			var _this = this;
			TweenLite.to(this, 1,{
				alpha:1,
				y: 460
			})

		}
		animate() {
			var _this = this;
			TweenMax.to(this, 1, {
				y:-this.height
			})
		}
	}
}


