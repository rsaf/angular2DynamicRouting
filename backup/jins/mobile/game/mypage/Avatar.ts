/// <reference path="MyPage.ts" />



module mypage {
	export class Avatar extends PIXI.Sprite {
		static _Instance: Avatar;
		constructor() {
			// console.log('/' + $('meta[name="avatar"]').attr('content'));
			super(PIXI.Texture.fromImage('/' + App.userAvatar));
			// alert(App.userAvatar);
			var mask = new PIXI.Graphics();
			mask.beginFill(0);
			mask.drawCircle(this.width / 2, this.width / 2, this.width / 2);
			mask.endFill;
			this.addChild(mask);
			this.mask = mask

			this.width = 200
			this.height = 200
			this.x = App.width / 2
			this.y = (App.height - this.height) / 2 

		}
		static get Instance(): Avatar {
			if (!Avatar._Instance) {
				Avatar._Instance = new Avatar();
			}
			return Avatar._Instance;
		}
	}
}