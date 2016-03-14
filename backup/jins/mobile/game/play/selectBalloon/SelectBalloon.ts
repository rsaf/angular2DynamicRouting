/// <reference path="../../../App.ts" />
/// <reference path="BalloonHolderContainer.ts" />
/// <reference path="MakeCustom.ts" />
/// <reference path="Next.ts" />
/// <reference path="SlideArrow.ts" />
/// <reference path="popUp/popUpBg.ts" />
/// <reference path="popUp/BalloonGuide.ts" />

module play {
	export class SelectBalloon extends PIXI.Container {
		static _Instance: SelectBalloon;
		static lastHighLighter: any;

		constructor() {
			var _this = this;
			super();
			this.addChild(play.BalloonHolderContainer.Instance);
			this.addChild(play.Next.Instance);
			this.addChild(play.MakeCustom.Instance);
			this.addChild(play.SlideUpArrow.Instance);
			this.addChild(play.instruction.popUpBg.Instance);
			this.addChild(play.instruction.BalloonGuide.Instance);


			App.EventState.on(function(aState) {
				switch (aState) {
					case STATE.PLAY:
						_this.fnShowInstruction();
;						break;
				}
			});

			Play.state.on(function(data) {
				switch (data.state) {
					case PLAYSTATE.CUSTOM:
						_this.hide();
						break;
				}
			});

		}
		static get Instance(): SelectBalloon {
			if (!SelectBalloon._Instance) {
				SelectBalloon._Instance = new SelectBalloon();
			}
			return SelectBalloon._Instance;
		}

		hide(){
			this.visible = false;
		}

		fnShowInstruction(){

			setTimeout(function(){
				play.instruction.popUpBg.Instance.fnShow();
				play.instruction.BalloonGuide.Instance.fnShow();
			},200);

			setTimeout(function(){
				play.instruction.popUpBg.Instance.fnHide();
				play.instruction.BalloonGuide.Instance.fnHide();
			}, 4500);
		}	
	}
}

	