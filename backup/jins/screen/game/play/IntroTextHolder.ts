
/// <reference path="IntroMe.ts" />
/// <reference path="IntroNew.ts" />
/// <reference path="IntroWish.ts" />

module play{
	export class IntroTextHolder extends PIXI.Container {
		static _Instance: IntroTextHolder;
		static duration = 8;
		constructor() {
			super();
			var _this = this;
			
			this.addChild(new IntroNew(0, 250,false));
			this.addChild(IntroMe.Instance);
			this.addChild(new IntroNew(0, 380,true));
			this.addChild(IntroWish.Instance);

		
		}
		static get Instance(): IntroTextHolder {
			if (!IntroTextHolder._Instance) {
				IntroTextHolder._Instance = new IntroTextHolder();
			}
			return IntroTextHolder._Instance;
		}

	}
}


