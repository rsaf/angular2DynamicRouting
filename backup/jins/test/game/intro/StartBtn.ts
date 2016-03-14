/// <reference path="../../App.ts" />


module intro {
	export class StartBtn extends PIXI.Sprite {
		static _Instance: StartBtn;
		constructor() {
			var _this = this;
			super(PIXI.Texture.fromFrame("Start.png"));
			this.x = (App.width - this.width) / 2;
			this.y = App.height - this.height;
			this.alpha = 0;
			this.buttonMode = this.interactive = true;
			this.on("click", this.tapped).on("tap", this.tapped);
			setTimeout(function() {
				_this.show();
			}, 1000);
		}
		static get Instance(): StartBtn {
			if (!StartBtn._Instance) {
				StartBtn._Instance = new StartBtn();
			}
			return StartBtn._Instance;
		}
		show(){
			var _this = this;
			TweenLite.to(this, 0.5,{
				alpha:1,
				y:App.height - _this.height - 100
			})
		}
		animate() {
			TweenMax.to(this, 1, {
				y: App.height
			})
		}


		tapped() {
			_hmt.push(["_trackEvent", "button", "click", "PlayBtn"]);
			App.play();
		}
	}
}


