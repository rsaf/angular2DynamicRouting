/// <reference path="../../../App.ts" />
/// <reference path="Custom.ts" />


module play {
	export module custom {
		export class SellectCustomBalloon extends PIXI.Sprite {
			static _Instance: SellectCustomBalloon;
			constructor() {
				super(PIXI.Texture.fromFrame('SellectCustomBalloon.png'));
				var _this = this;
				this.y = 670;
				this.x = (App.width-this.width)/2;
			}
			static get Instance(): SellectCustomBalloon {
				if (!SellectCustomBalloon._Instance) {
					SellectCustomBalloon._Instance = new SellectCustomBalloon();
				}
				return SellectCustomBalloon._Instance;
			}
		}
	}
}


