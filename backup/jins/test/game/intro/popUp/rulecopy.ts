/// <reference path="../../../App.ts" />
/// <reference path="../Intro.ts" />

module intro {
	export module popup {
		export class RuleCopy extends PIXI.Sprite {
			static _Instance: RuleCopy;
			constructor() {
				super(PIXI.Texture.fromFrame("RuleCopy.png"));
				this.x = (App.width - this.width)/2;
				this.y = (App.height - this.height) /2;
				this.visible = false;
			}
			static get Instance(): RuleCopy {
				if (!RuleCopy._Instance) {
					RuleCopy._Instance = new RuleCopy();
				}
				return RuleCopy._Instance;
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

