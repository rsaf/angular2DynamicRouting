/// <reference path="../Game.ts" />
/// <reference path="selectBalloon/SelectBalloon.ts" />



module play {
	export class Avatar extends PIXI.Sprite {
		static _Instance: Avatar;
		constructor() {
			super();

		}
		static get Instance(): Avatar {
			if (!Avatar._Instance) {
				Avatar._Instance = new Avatar();
			}
			return Avatar._Instance;
		}
	}
}