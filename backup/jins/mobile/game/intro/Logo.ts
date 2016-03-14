/// <reference path="../../App.ts" />


module intro {
	export class Logo extends PIXI.Sprite {
		static _Instance: Logo;
		constructor() {
			super(PIXI.Texture.fromFrame("Logo.png"));
			this.x = 5;
			this.y = 0;
			this.alpha = 0;
			var _this = this;
			setTimeout(function() {
				_this.show();
			}, 1000);
		}
		static get Instance(): Logo {
			if (!Logo._Instance) {
				Logo._Instance = new Logo();
			}
			return Logo._Instance;
		}
		show(){
			var _this = this;
			TweenLite.to(this, 1,{
				alpha:1,
				y:20
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


