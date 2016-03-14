/// <reference path="MyPage.ts" />

module mypage {
	export class Balloon extends PIXI.Sprite {
		bid;
		constructor(id: number = 1) {
			// var _this = this;
			console.log('ballooon', id);
			super(PIXI.Texture.fromFrame('Balloon' + id + '.png'));
			this.x = (App.width - this.width) / 2;
			this.y = (App.height - this.height) / 2 - 250; 
		}
	}
}