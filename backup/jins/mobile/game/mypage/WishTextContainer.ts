/// <reference path="MyPage.ts" />

module mypage {
	export class WishTextContainer extends PIXI.Sprite {
		static _Instance: WishTextContainer;
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