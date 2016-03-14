/// <reference path="../Game.ts" />
/// <reference path="selectBalloon/SelectBalloon.ts" />



module play {
	export class ShootBalloon extends PIXI.Sprite {
		bid;
		constructor(id: number = 1) {
			var _this = this;
			super(PIXI.Texture.fromImage('Balloon' + id + '.png'));
			if((App.height/App.width)<=1.5){
				this.y = 145;
			}
			else{
				this.y = 200;
			}
			this.x = (App.width-this.width)/2;
		}
	}
}