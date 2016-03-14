/// <reference path="../Game.ts" />


module play {
	export class Logo extends PIXI.Sprite {
		static _Instance: Logo;
		constructor() {
			super(PIXI.Texture.fromFrame("logo.png"));
			this.x = 100;
			this.y = 20;
			

		}
		static get Instance(): Logo {
			if (!Logo._Instance) {
				Logo._Instance = new Logo();
			}
			return Logo._Instance;
		}
	}
}


