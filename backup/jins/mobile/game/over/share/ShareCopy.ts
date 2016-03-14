/// <reference path="../Over.ts" />

module over {
	export module share {
		export class ShareCopy extends PIXI.Sprite {
			static _Instance: ShareCopy;
			constructor() {
				super(PIXI.Texture.fromFrame("ShareCopy.png"));
				this.x = App.width - this.width;
				this.y = 0;
				this.visible = false;
			}
			static get Instance(): ShareCopy {
				if (!ShareCopy._Instance) {
					ShareCopy._Instance = new ShareCopy();
				}
				return ShareCopy._Instance;
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

