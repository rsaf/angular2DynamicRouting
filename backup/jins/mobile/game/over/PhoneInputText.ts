/// <reference path="../../App.ts" />

module over {
	export class PhoneInputText extends PIXI.Sprite {
		static _Instance: PhoneInputText;
		constructor() {
			var _this = this;
			super(PIXI.Texture.fromFrame('PhoneInputText.png'));
			this.visible = false;
			this.x = (App.width - this.width) / 2;
			this.y = (App.height - this.height)/2 - 150;

		}
		static get Instance(): PhoneInputText {
			if (!PhoneInputText._Instance) {
				PhoneInputText._Instance = new PhoneInputText();
			}
			return PhoneInputText._Instance;
		}
	}
}