
/// <reference path="../../../../App.ts" />
/// <reference path="../../Play.ts" />

module play {
	export module instruction {
		export class popUpBg extends PIXI.Graphics {
			static _Instance: popUpBg;
			texNormal;
			texHigh;
			constructor() {
				super()
				this.beginFill(0, 0.8);
				this.drawRect(0, 0, App.width, App.height);
				this.endFill;
				this.visible = false;
				this.buttonMode = this.interactive = true;
				this.on("click", this.fnTap).on("tap", this.fnTap).on("mousedown", this.fnHigh).on("touchstart", this.fnHigh).on("mouseup", this.fnNormal).on("touchend", this.fnNormal).on("mouseupoutside", this.fnNormal).on("touchendoutside", this.fnNormal);
				this.alpha = 0;
			}
			static get Instance(): popUpBg {
				if (!popUpBg._Instance) {
					popUpBg._Instance = new popUpBg();
				}
				return popUpBg._Instance;
			}
			fnHigh() {
			}
			fnNormal() {
			}

			fnHide() {
				this.visible = false;
			}

			fnShow() {
				this.visible = true;
				TweenMax.to(this, 0.6, {
					alpha: 0.9
				})
			}
			fnTap() {
				this.visible = false;
				TweenMax.to(this, 0.6, {
					alpha: 0
				});
				play.instruction.BalloonGuide.Instance.fnHide();
			}
		}
	}
	
}

