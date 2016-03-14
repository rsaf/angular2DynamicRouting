/// <reference path="MyPage.ts" />
/// <reference path="WishTextContainer.ts" />
/// <reference path="WishText.ts" />



module mypage {
	export class Wish extends PIXI.Container {
		static _Instance: Wish;
		constructor() {
			var _this = this;
			super();
			this.addChild(mypage.WishTextContainer.Instance);
			this.addChild(new mypage.WishText(App.userBalloons[0].message));

			this.y = (App.height - this.height) / 2 + 100;

		}
		static get Instance(): Wish {
			if (!Wish._Instance) {
				Wish._Instance = new Wish();
			}
			return Wish._Instance;
		}
		// setIntroWith(){
		// 	this.addChild(new mypage.WishText(App.userBalloons[0].message));
		// }

	}
}