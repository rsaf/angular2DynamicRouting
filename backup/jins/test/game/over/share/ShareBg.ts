/// <reference path="../Over.ts" />
/// <reference path="../../play/Play.ts" />

module over {
	export module share{
		export class ShareBg extends PIXI.Graphics {
			static _Instance: ShareBg;
			texNormal;
			texHigh;
			constructor() {
				super()
				this.beginFill(0, 0.95);
				this.drawRect(0, 0, App.width, App.height);
				this.endFill;
				this.visible = false;
				this.buttonMode = this.interactive = true;
				this.on("click", this.fnTap).on("tap", this.fnTap);
				this.alpha = 0;
			}
			static get Instance(): ShareBg {
				if (!ShareBg._Instance) {
					ShareBg._Instance = new ShareBg();
				}
				return ShareBg._Instance;
			}
			fnHigh() {
			}
			fnNormal() {
			}

			fnShow() {
				this.visible = true;
				TweenMax.to(this, 0.6, {
					alpha: 0.9
				})
			}
			fnTap() {
				// alert();
				if (over.share.ShareCopy.Instance.visible){
				    over.Over.Instance.fnShowRequirePhone();
				}

				// this.visible = false;
				// TweenMax.to(this, 0.6, {
				// 	alpha: 0
				// });
				// over.share.ShareCopy.Instance.visible = false;
			}
		}
	}
	
}

