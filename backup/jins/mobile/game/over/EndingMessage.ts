/// <reference path="../../App.ts" />

module over {
	export class EndingMessage extends PIXI.Sprite {
		static _Instance: EndingMessage;
		constructor() {
			var _this = this;
			super(PIXI.Texture.fromFrame('EndingMessage.png'));
			this.visible = false;
			this.x = (App.width - this.width) / 2;
			this.y = App.height - this.height - 200;

		}
		static get Instance(): EndingMessage {
			if (!EndingMessage._Instance) {
				EndingMessage._Instance = new EndingMessage();
			}
			return EndingMessage._Instance;
		}
	}
}