/// <reference path="../../App.ts" />


module intro {
	export class IntroNew extends PIXI.Sprite {
		static _Instance: IntroNew;
		constructor(x,y,rotate) {
			super(PIXI.Texture.fromFrame("IntroNew.png"));
			this.x = x;
			this.y = y;
			if(rotate){
				this.rotation += 0.17;
			}
			this.alpha = 0;
			var _this = this;
			setTimeout(function() {
				_this.show();
			}, 1000);
		}
		show(){
			var _this = this;
			TweenLite.to(this, 1,{
				alpha:1,
				x: this.x + 130
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


