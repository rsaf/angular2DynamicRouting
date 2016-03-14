/// <reference path="../Game.ts" />
/// <reference path="shoot.ts" />
/// <reference path="ShootBtn.ts" />

module play {
	export class ShootPage extends PIXI.Container {
		static _Instance: ShootPage;
		constructor() {
			var _this = this;
			super();
			this.visible = false;


			Play.state.on(function(data) {
				switch (data.state) {
					case PLAYSTATE.MAIN:
						break;
					case PLAYSTATE.ANIMATE:
						break;
					case PLAYSTATE.SHOOTPAGE:
						_this.show();
						break;
				}
			});
			
		}
		static get Instance(): ShootPage {
			if (!ShootPage._Instance) {
				ShootPage._Instance = new ShootPage();
			}
			return ShootPage._Instance;
		}



		show() {
			this.addChild(play.Shoot.Instance);
			this.addChild(play.ShootBtn.Instance);
			this.visible = true;
			// $('#userAvatar img').prop('src', $('meta[name="avatar"]').attr('content')); 
			// jQuery('#userAvatar')[0].style.display = 'block';
		}
	}
}