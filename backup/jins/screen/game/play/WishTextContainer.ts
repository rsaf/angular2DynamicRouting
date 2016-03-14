/// <reference path="Play.ts" />



module play {
	export class WishTextContainer extends PIXI.Sprite {
		static _Instance: WishTextContainer;
		constructor(id: number = 1) {
			var _this = this;
			super(PIXI.Texture.fromFrame('WishText.png'));
			this.scale.x = this.scale.y = 0.68;

			this.y = 250;
			this.x = -10;
		}

		static get Instance(): WishTextContainer {
			if (!WishTextContainer._Instance) {
				WishTextContainer._Instance = new WishTextContainer();
			}
			return WishTextContainer._Instance;
		}
	}
}