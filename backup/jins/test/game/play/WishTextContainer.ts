/// <reference path="../Game.ts" />
/// <reference path="selectBalloon/SelectBalloon.ts" />



module play {
	export class WishTextContainer extends PIXI.Sprite {
		static _Instance: WishTextContainer;
		bid;
		constructor(id: number = 1) {
			var _this = this;
			super(PIXI.Texture.fromFrame('WishText.png'));
			this.x = 140;
	
		}

		static get Instance(): WishTextContainer {
			if (!WishTextContainer._Instance) {
				WishTextContainer._Instance = new WishTextContainer();
			}
			return WishTextContainer._Instance;
		}
	}
}