/// <reference path="../Game.ts" />


module play {
	export class ShootBtn extends PIXI.Sprite {
		static _Instance: ShootBtn;
		constructor() {
			var _this = this;
			
			super(PIXI.Texture.fromFrame('Shoot.png'));
			this.x = (App.width-this.width)/2;
			this.y = App.height - this.height - 100;

			this.buttonMode = this.interactive = true;
			this.on("click", this.tapped).on("tap", this.tapped);
			
		}
		static get Instance(): ShootBtn {
			if (!ShootBtn._Instance) {
				ShootBtn._Instance = new ShootBtn();
			}
			return ShootBtn._Instance;
		}
		tapped(){
			_hmt.push(["_trackEvent", "button", "click", "ShootBtn"]);
			play.Play.state.trigger({ state: PLAYSTATE.SHOOT });
		}
	}
}