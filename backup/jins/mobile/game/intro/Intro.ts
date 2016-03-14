/// <reference path="Bg.ts" />
/// <reference path="StartBtn.ts" />
/// <reference path="RuleBtn.ts" />
/// <reference path="MusicBtn.ts" />
/// <reference path="Logo.ts" />
/// <reference path="IntroTextHolder.ts" />
/// <reference path="popUp/popUpBg.ts" />
/// <reference path="popUp/rulecopy.ts" />


module intro{
	export class Intro extends PIXI.Container {
		static _Instance: Intro;
		static duration = 8;
		constructor() {
			super();
			var _this = this;

			
			this.addChild(intro.Logo.Instance);
			this.addChild(intro.MusicBtn.Instance);

			// if(App.isShared){
			// 	this.fnShowAlreadyPlayed();
			// }
			// else{
			// 	this.fnShowIntro();
			// }	

			this.addChild(intro.StartBtn.Instance);
			this.addChild(intro.RuleBtn.Instance);
			this.addChild(intro.IntroTextHolder.Instance);

			this.addChild(intro.popup.popUpBg.Instance);
			this.addChild(intro.popup.RuleCopy.Instance);

			App.EventState.on(function(aState) {
				_this.hide();
				switch (aState) {
					case STATE.INTRO:
						_this.show();
						break;
				}

			});

		}
		static get Instance(): Intro {
			if (!Intro._Instance) {
				Intro._Instance = new Intro();
			}
			return Intro._Instance;
		}

		show(){
			console.log('show intro')
			this.visible = true;
		}
		hide(){
			this.visible = false;
		}
	}
}


