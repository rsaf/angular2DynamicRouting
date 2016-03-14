/// <reference path="MyPage.ts" />


module mypage {
	export class WannaPlay extends PIXI.Sprite {
		static _Instance: WannaPlay;
		constructor() {
			var _this = this;
			super(PIXI.Texture.fromFrame("WannaPlay.png"));
			this.width = this.width - 80;
			this.height = this.height - 50;
			this.x = (App.width - this.width) / 2;
			this.y = App.height - this.height-50;
			this.alpha = 0;
			this.buttonMode = this.interactive = true;
			this.on("click", this.tapped).on("tap", this.tapped);
			setTimeout(function() {
				_this.show();
			}, 1000);
		}
		static get Instance(): WannaPlay {
			if (!WannaPlay._Instance) {
				WannaPlay._Instance = new WannaPlay();
			}
			return WannaPlay._Instance;
		}
		show(){
			var _this = this;
			TweenLite.to(this, 0.5,{
				alpha:1,
				y:App.height - _this.height - 10
			})
		}
		animate() {
			TweenMax.to(this, 1, {
				y: App.height
			})
		}


		tapped() {
			App.intro();
		}
	}
}


