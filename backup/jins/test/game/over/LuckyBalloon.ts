/// <reference path="../Game.ts" />



module over {
	export class LuckyBalloon extends PIXI.Sprite {
		static _Instance: LuckyBalloon;
		constructor() {
			var _this = this;
			super(PIXI.Texture.fromFrame('LuckyBalloon.png'));
			this.visible = false;
			this.x = (App.width- this.width)/2;
			this.y = (App.height - this.height) / 2;

		}
		static get Instance(): LuckyBalloon {
			if (!LuckyBalloon._Instance) {
				LuckyBalloon._Instance = new LuckyBalloon();
			}
			return LuckyBalloon._Instance;
		}
	}
}