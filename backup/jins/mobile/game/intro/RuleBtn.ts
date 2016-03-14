/// <reference path="../../App.ts" />
/// <reference path="Intro.ts" />


module intro {
	export class RuleBtn extends PIXI.Sprite {
		static _Instance: RuleBtn;
		constructor() {
			var _this = this;
			super(PIXI.Texture.fromFrame("Rule.png"));
			this.x = (App.width - this.width) / 2;
			this.y = App.height;
			this.alpha = 0;
			this.buttonMode = this.interactive = true;
			this.on("click", this.tapped).on("tap", this.tapped);

			_this.show();
		}
		static get Instance(): RuleBtn {
			if (!RuleBtn._Instance) {
				RuleBtn._Instance = new RuleBtn();
			}
			return RuleBtn._Instance;
		}
		show(){
			var _this = this;
			TweenLite.to(this, 0.5,{
				alpha:1,
				y:App.height - _this.height - 50
			})

		}
		animate() {
			TweenMax.to(this, 1, {
				y: App.height
			})
		}

		tapped() {
			intro.popup.popUpBg.Instance.fnShow();
			intro.popup.RuleCopy.Instance.fnShow();
		}
	}
}


