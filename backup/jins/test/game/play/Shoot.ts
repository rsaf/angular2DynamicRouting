/// <reference path="../Game.ts" />
/// <reference path="../../config.ts" />
/// <reference path="selectBalloon/SelectBalloon.ts" />
/// <reference path="shootBalloon.ts" />
/// <reference path="ShootBtn.ts" />
/// <reference path="WishText.ts" />
/// <reference path="Avatar.ts" />

module play {
	export class Shoot extends PIXI.Container {
		static _Instance: Shoot;
		static toShoot:ShootBalloon;
		constructor() {
			var _this = this;
			super();
			this.addChild(new play.ShootBalloon(play.BalloonHolderContainer.selected));
			this.addChild(play.Wish.Instance);

			Play.state.on(function(data) {
				switch (data.state) {
					case PLAYSTATE.MAIN:
						break;
					case PLAYSTATE.ANIMATE:
						break;
					case PLAYSTATE.SHOOT:
						_this.fnAnimate();
						_this.fnSaveBalloon();
						break;
				}
			});
			
		}
		static get Instance(): Shoot {
			if (!Shoot._Instance) {
				Shoot._Instance = new Shoot();
			}
			return Shoot._Instance;
		}

		fnAnimate() {
			var _this = this;
			TweenLite.to(this, 5, {
				y: -200 - _this.height
			});
		}



		fnSaveBalloon(){
			var id: number;
			var msg: string;
			if (App.customBalloon){
				id = App.customBalloon;
				msg = App.customBalloonText;
			}
			else{
				id = play.BalloonHolderContainer.selected;
				msg = balloonText[id - 1];
			}
			console.log('fnSaveBalloon--', id, msg);

			setTimeout(function() {
				play.ShootBtn.Instance.visible = false;
				App.over();
			}, 1500);
		
		}

	}
}