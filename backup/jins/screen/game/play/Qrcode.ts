/// <reference path="../Game.ts" />


module play {
	export class Qrcode extends PIXI.Sprite {
		static _Instance: Qrcode;
		constructor() {
			super(PIXI.Texture.fromImage("/assets/jins/qrcode.png"));
			this.x = 50;
			this.y = App.height - this.height - 20;
		}
		static get Instance(): Qrcode {
			if (!Qrcode._Instance) {
				Qrcode._Instance = new Qrcode();
			}
			return Qrcode._Instance;
		}
	}
}


