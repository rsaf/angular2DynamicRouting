/// <reference path="../../../App.ts" />
/// <reference path="CustomBalloonBg.ts" />

module play {
	export module custom{
		export class CustomBalloonHolder extends PIXI.Container {
			static _Instance: CustomBalloonHolder;
			static currentBalloon_id: number = 1;
			static currentBalloon:Balloon;

			constructor() {
				super();
				var _this = this;
				this.addChild(play.custom.CustomBalloonBg.Instance);
				CustomBalloonHolder.currentBalloon = new play.Balloon(CustomBalloonHolder.currentBalloon_id, false, true);
				this.addChild(CustomBalloonHolder.currentBalloon);

			}
			static get Instance(): CustomBalloonHolder {
				if (!CustomBalloonHolder._Instance) {
					CustomBalloonHolder._Instance = new CustomBalloonHolder();
				}
				return CustomBalloonHolder._Instance;
			}

			show() {
				this.visible = true;
			}

			moveLeft(){
				if (CustomBalloonHolder.currentBalloon_id>1){
					this.updateBalloon(--CustomBalloonHolder.currentBalloon_id);
				}
			}
			moveRight(){
				if (CustomBalloonHolder.currentBalloon_id < 8) {
					this.updateBalloon(++CustomBalloonHolder.currentBalloon_id);
				}
			}

			updateBalloon(id){
				this.removeChild(CustomBalloonHolder.currentBalloon);
				CustomBalloonHolder.currentBalloon = new play.Balloon(id, false, true);
				this.addChild(CustomBalloonHolder.currentBalloon);
			}	
		}
	}
}


