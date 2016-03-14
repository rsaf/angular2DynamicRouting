/// <reference path="../../App.ts" />

module over {
	export class Thanks extends PIXI.Sprite {
		static _Instance: Thanks;
		constructor() {
			var _this = this;
			super(PIXI.Texture.fromFrame('Thanks.png'));
			this.visible = false;
			this.x = (App.width - this.width) / 2;
			this.y = 300;

		}
		static get Instance(): Thanks {
			if (!Thanks._Instance) {
				Thanks._Instance = new Thanks();
			}
			return Thanks._Instance;
		}
	}
}