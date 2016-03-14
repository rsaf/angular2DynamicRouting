/// <reference path="../../../../App.ts" />
/// <reference path="../../Play.ts" />

module play {
	export module instruction {
		export class BalloonGuide extends PIXI.Sprite {
			static _Instance: BalloonGuide;
			constructor() {
				super(PIXI.Texture.fromFrame("BalloonGuide.png"));
				this.x = (App.width - this.width)/2;
				this.y = (App.height - this.height) /2;
				this.visible = false;
			}
			static get Instance(): BalloonGuide {
				if (!BalloonGuide._Instance) {
					BalloonGuide._Instance = new BalloonGuide();
				}
				return BalloonGuide._Instance;
			}
			fnShow(){
				this.visible = true;
			}
			fnHide(){
				this.visible = false;
			}
		}
	}
	
}

