/// <reference path="../../../App.ts" />


module play {
	export class MakeCustom extends PIXI.Sprite {
		static _Instance: MakeCustom;
		constructor() {
			super(PIXI.Texture.fromFrame("Custom.png"));
			this.x = 20;
			this.y = App.height - this.height - 15;
			this.buttonMode = this.interactive = true;
			this.on("click", this.tapped).on("tap", this.tapped);
		}
		static get Instance(): MakeCustom {
			if (!MakeCustom._Instance) {
				MakeCustom._Instance = new MakeCustom();
			}
			return MakeCustom._Instance;
		}

		tapped() {
			Play.state.trigger({ state: PLAYSTATE.CUSTOM });
		}
	}
}


