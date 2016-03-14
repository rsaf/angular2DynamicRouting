/// <reference path="../../../App.ts" />

module over {
	export module popup {
		export class SlideDown extends PIXI.Sprite {
			static _Instance: SlideDown;
			constructor() {
				super(PIXI.Texture.fromFrame("RedEnvelopCopy.png"));
				this.x = (App.width - this.width)/2;
				this.y = (App.height - this.height) /2;
				this.visible = false;
			}
			static get Instance(): SlideDown {
				if (!SlideDown._Instance) {
					SlideDown._Instance = new SlideDown();
				}
				return SlideDown._Instance;
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

