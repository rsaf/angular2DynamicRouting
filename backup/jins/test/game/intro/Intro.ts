/// <reference path="Bg.ts" />
/// <reference path="StartBtn.ts" />
/// <reference path="RuleBtn.ts" />
/// <reference path="MusicBtn.ts" />
/// <reference path="Logo.ts" />
/// <reference path="IntroTextHolder.ts" />
/// <reference path="popUp/popUpBg.ts" />
/// <reference path="popUp/rulecopy.ts" />
/// <reference path="alreadyPlayed/AlreadyPlayed.ts" />
/// <reference path="WannaPlay.ts" />


module intro{
	export class Intro extends PIXI.Container {
		static _Instance: Intro;
		static duration = 8;
		constructor() {
			super();
			var _this = this;

			this.addChild(intro.Bg.Instance);
			this.addChild(intro.Logo.Instance);
			this.addChild(intro.MusicBtn.Instance);

			if(App.isShared){
				this.fnShowAlreadyPlayed();
			}
			else{
				this.fnShowIntro();
			}	

			this.addChild(intro.popup.popUpBg.Instance);
			this.addChild(intro.popup.RuleCopy.Instance);

			App.EventState.on(function(aState) {
				switch (aState) {
					case STATE.PLAY:
						_this.fnHideIntro();
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

		fnShowIntro(){
			this.addChild(intro.StartBtn.Instance);
			this.addChild(intro.RuleBtn.Instance);
			this.addChild(intro.IntroTextHolder.Instance);
			}
		
		fnShowAlreadyPlayed(){
			jQuery('#userAvatar')[0].style.display = 'block';
			setTimeout(function() { jQuery('#userStats').fadeIn(1500); }, 500);
			this.addChild(intro.AlreadyPlayed.Instance);
			this.addChild(intro.WannaPlay.Instance);
		}


		fnHideAlreadyPlayed(){
				jQuery('#userAvatar')[0].style.display = 'none';
				jQuery('#userStats').fadeOut('fast');
				intro.AlreadyPlayed.Instance.visible = false;
				intro.WannaPlay.Instance.visible = false;
		}

		fnHideIntro(){
			intro.IntroTextHolder.Instance.visible = false;
			intro.StartBtn.Instance.visible = false;
			intro.RuleBtn.Instance.visible = false;
			intro.WannaPlay.Instance.visible = false;
			intro.AlreadyPlayed.Instance.visible = false;
			jQuery('#userAvatar')[0].style.display = 'none';
			jQuery('#userStats')[0].style.display = 'none';
			var _this = this;
			
		}
	}
}


