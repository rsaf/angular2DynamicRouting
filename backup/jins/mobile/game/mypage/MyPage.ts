/// <reference path="../Game.ts" />

/// <reference path="AlreadyPlayed.ts" />
/// <reference path="WannaPlay.ts" />
/// <reference path="Avatar.ts" />


module mypage {
	export class MyPage extends PIXI.Container {
		static _Instance: MyPage;
		static duration = 8;
		constructor() {
			super();
			var _this = this;



			App.EventState.on(function(aState) {
				_this.hide();
				switch (aState) {
					case STATE.MYPAGE:
						_this.show();
						break;
				}

			});

		}
		static get Instance(): MyPage {
			if (!MyPage._Instance) {
				MyPage._Instance = new MyPage();
			}
			return MyPage._Instance;
		}

		hide(){
			this.visible = false;
			jQuery('#userStats').fadeOut('fast');
		}
		show(){
			this.addChild(mypage.AlreadyPlayed.Instance);
			this.addChild(mypage.WannaPlay.Instance);
			this.addChild(mypage.Avatar.Instance);
			setTimeout(function() { jQuery('#userStats').fadeIn(1500); }, 500);
			this.visible = true;
		}
		fnShowMyPage() {
			// this.addChild(intro.StartBtn.Instance);
			// this.addChild(intro.RuleBtn.Instance);
			// this.addChild(intro.MyPageTextHolder.Instance);
		}

		// fnShowAlreadyPlayed() {
		// 	jQuery('#userAvatar')[0].style.display = 'block';
		// 	setTimeout(function() { jQuery('#userStats').fadeIn(1500); }, 500);
		// 	this.addChild(intro.AlreadyPlayed.Instance);
		// 	this.addChild(intro.WannaPlay.Instance);
		// }


		// fnHideAlreadyPlayed() {
		// 	jQuery('#userAvatar')[0].style.display = 'none';
		// 	jQuery('#userStats').fadeOut('fast');
		// 	intro.AlreadyPlayed.Instance.visible = false;
		// 	intro.WannaPlay.Instance.visible = false;
		// }

		// fnHideMyPage() {
		// 	intro.MyPageTextHolder.Instance.visible = false;
		// 	intro.StartBtn.Instance.visible = false;
		// 	intro.RuleBtn.Instance.visible = false;
		// 	intro.WannaPlay.Instance.visible = false;
		// 	intro.AlreadyPlayed.Instance.visible = false;
		// 	jQuery('#userAvatar')[0].style.display = 'none';
		// 	jQuery('#userStats')[0].style.display = 'none';
		// 	var _this = this;

		// }
	}
}


