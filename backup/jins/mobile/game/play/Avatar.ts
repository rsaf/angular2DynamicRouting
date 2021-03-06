/// <reference path="../Game.ts" />
/// <reference path="selectBalloon/SelectBalloon.ts" />



module play {
	export class Avatar extends PIXI.Sprite {
		static _Instance: Avatar;
		constructor() {
			super(PIXI.Texture.fromImage('/' + $('meta[name="avatar"]').attr('content') ));
			// this.width = 200
			// this.height = 200;


			var mask = new PIXI.Graphics();
			console.log('----', this.x, this.y, this.width / 2);
			mask.beginFill(0);
			mask.drawCircle(this.width / 2, this.width / 2, this.width / 2);
			mask.endFill;
			// mask.pivot.x = this.width / 2
			// mask.pivot.y = this.height / 2
			this.addChild(mask);
			this.mask = mask

			this.width = 200
			this.height = 200
			this.x = App.width / 2


		}
		static get Instance(): Avatar {
			if (!Avatar._Instance) {
				Avatar._Instance = new Avatar();
			}
			return Avatar._Instance;
		}
	}
}