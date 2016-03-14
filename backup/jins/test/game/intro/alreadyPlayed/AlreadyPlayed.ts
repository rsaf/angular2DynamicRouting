
/// <reference path="../../../App.ts" />
/// <reference path="../../play/Play.ts" />
/// <reference path="../../play/selectBalloon/SelectBalloon.ts" />
/// <reference path="../../play/shootBalloon.ts" />
/// <reference path="../../play/ShootBtn.ts" />
/// <reference path="../../play/Wish.ts" />
/// <reference path="../../play/WishText.ts" />
/// <reference path="RedBalloon.ts" />


module intro {
	export class AlreadyPlayed extends PIXI.Container {
		static _Instance: AlreadyPlayed;
		static duration = 8;
		constructor() {
			super();
			var _this = this;

			var i = -1;
			var j = -1;
			while (++i < App.userSupport) {
				this.addChild(new intro.RedBalloon(i));
				if (i == 3)break; // maximum of 4 red balloons
			}	

		//	App.userBalloons = ['1', '2', '4', '6']; //@todo removeMe.

			while (++j < App.userBalloons.length) {
				this.addChild(new play.Balloon(parseInt(App.userBalloons[j].balloon_id), true));
				if (j == 2) break;  // 3 balloon + 1 added bellow.
			}

			this.addChild(new play.ShootBalloon(App.userBalloons[0] || 1));
			this.addChild(play.Wish.Instance);

			App.EventState.on(function(aState) {
				switch (aState) {
					case STATE.PLAY:
						break;
				}

			});

		}
		static get Instance(): AlreadyPlayed {
			if (!AlreadyPlayed._Instance) {
				AlreadyPlayed._Instance = new AlreadyPlayed();
			}
			return AlreadyPlayed._Instance;
		}
	}
}


