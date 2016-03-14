
/// <reference path="IntroMe.ts" />
/// <reference path="IntroNew.ts" />
/// <reference path="IntroWish.ts" />

module intro{
	export class IntroTextHolder extends PIXI.Container {
		static _Instance: IntroTextHolder;
		static duration = 8;
		constructor() {
			super();
			var _this = this;
			
			this.addChild(new intro.IntroNew(0, 150,false));
			this.addChild(intro.IntroMe.Instance);
			this.addChild(new intro.IntroNew(0, 330,true));
			this.addChild(intro.IntroWish.Instance);

		
		}
		static get Instance(): IntroTextHolder {
			if (!IntroTextHolder._Instance) {
				IntroTextHolder._Instance = new IntroTextHolder();
			}
			return IntroTextHolder._Instance;
		}

	}
}


