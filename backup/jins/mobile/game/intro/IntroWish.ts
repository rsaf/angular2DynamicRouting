/// <reference path="../../App.ts" />


module intro {
	export class IntroWish extends PIXI.Sprite {
		static _Instance: IntroWish;
		constructor() {
			super(PIXI.Texture.fromFrame("IntroWish.png"));
			this.x = App.width - this.width - 100;
			this.y = 0;
			this.alpha = 0;
			var _this = this;
			_this.show();
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
				y: 480
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


