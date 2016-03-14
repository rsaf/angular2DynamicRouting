/// <reference path="../Game.ts" />



module play {
	export class Avatar extends PIXI.Sprite {
		static _Instance: Avatar;
		constructor(avatar:string) {
			super(PIXI.Texture.fromImage('/' + avatar));
			// this.width = 200
			// this.height = 200;


			var mask = new PIXI.Graphics();
			// console.log('----', this.x, this.y, this.width / 2);
			mask.beginFill(0);
			mask.drawCircle(this.width / 2, this.width / 2, this.width / 2);
			mask.endFill;
			// mask.pivot.x = this.width / 2
			// mask.pivot.y = this.height / 2
			this.addChild(mask);
			this.mask = mask

			this.width = 150
			this.height = 150
			this.x = 100;
			this.y = 220;
		}
	}
}