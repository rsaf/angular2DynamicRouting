
/// <reference path="MyPage.ts" />

/// <reference path="RedBalloon.ts" />
/// <reference path="Wish.ts" />
/// <reference path="Balloon.ts" />

module mypage {
	export class AlreadyPlayed extends PIXI.Container {
		static _Instance: AlreadyPlayed;
		static duration = 8;
		constructor() {
			super();
			var _this = this;

			var i = -1;
			var j = -1;
			while (++i < App.userSupport) {
				this.addChild(new mypage.RedBalloon(i));
				if (i == 3)break; // maximum of 4 red balloons
			}	

			// App.userBalloons = ['1', '2', '4', '6']; //@todo removeMe.
			// console.log(App.userBalloons);


			// while (++j < App.userBalloons.length) {
			// 	// console.log(App.userBalloons[j].balloon_id);

			// 	this.addChild(new Balloon(parseInt(App.userBalloons[j].balloon_id)));
			// 	if (j == 1) break;  // 3 balloon + 1 added bellow.
			// }

			this.addChild(new play.ShootBalloon(App.userBalloons[0].balloon_id || 1));
			this.addChild(mypage.Wish.Instance);


		}
		static get Instance(): AlreadyPlayed {
			if (!AlreadyPlayed._Instance) {
				AlreadyPlayed._Instance = new AlreadyPlayed();
			}
			return AlreadyPlayed._Instance;
		}
	}
}


