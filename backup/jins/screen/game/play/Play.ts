/// <reference path="../Game.ts" />
/// <reference path="City.ts" />
/// <reference path="Logo.ts" />
/// <reference path="IntroTextHolder.ts" />
/// <reference path="BalloonContainer.ts" />
/// <reference path="Qrcode.ts" />
module play {
	export class Play extends PIXI.Container {
		static _Instance: Play;
		constructor() {
			var _this = this;
			super()
			this.playInit();
			App.EventState.on(function(aState) {
				switch (aState) {
					case STATE.PLAY:

						_this.show();

						break;
					case STATE.OVER:
						_this.hide();
						break;
				}
			});
		}
		static get Instance(): Play {
			if (!Play._Instance) {
				Play._Instance = new Play();
			}
			return Play._Instance;
		}
		
		show() {
			this.visible = true;
		}
		hide() {
			this.visible = false;
		}
		playInit(){
			this.addChild(LuckyContainer.Instance);
			this.addChild(BalloonContainer.Instance);
			if(!config.isProjection) {
				this.addChild(IntroTextHolder.Instance);
				this.addChild(City.Instance);
				this.addChild(Logo.Instance);
				this.addChild(Qrcode.Instance);
			}
			
		}
		shoot(data){

			var avatar = '/' + data.avatar;

			if (isInArray(avatar, App.resources)) {
				BalloonContainer.Instance.shoot(data);
			}else{
				
				PIXI.loader.add('/' + data.avatar).load(function() {
					App.resources.push(avatar)
					BalloonContainer.Instance.shoot(data);
				});
			}
		}
		explode(data){
			console.log(data);
			LuckyContainer.Instance.explode(data);
		}


	}
}