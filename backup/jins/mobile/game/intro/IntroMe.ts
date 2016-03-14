/// <reference path="../../App.ts" />


module intro {
	export class IntroMe extends PIXI.Sprite {
		static _Instance: IntroMe;
		constructor() {
			super(PIXI.Texture.fromFrame("IntroMe.png"));
			this.x = App.width - this.width - 100;
			this.y = 400;
			this.alpha = 0;
			var _this = this;
			_this.show();
		}
		static get Instance(): IntroMe {
			if (!IntroMe._Instance) {
				IntroMe._Instance = new IntroMe();
			}
			return IntroMe._Instance;
		}
		show(){
			var _this = this;
			TweenLite.to(this, 1,{
				alpha:1,
				y: 250
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


