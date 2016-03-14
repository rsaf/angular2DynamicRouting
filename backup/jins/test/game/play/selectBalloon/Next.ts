/// <reference path="../../../App.ts" />


module play {
	export class Next extends PIXI.Sprite {
		static _Instance: Next;
		constructor() {
			super(PIXI.Texture.fromFrame("Next.png"));

			this.x = App.width - this.width - 20;
			this.y = App.height - this.height - 15;
			this.buttonMode = this.interactive = true;
			this.on("click", this.tapped).on("tap", this.tapped);
		}
		static get Instance(): Next {
			if (!Next._Instance) {
				Next._Instance = new Next();
			}
			return Next._Instance;
		}

		tapped() {
			play.Play.state.trigger({ state: PLAYSTATE.SHOOTPAGE });
			play.SelectBalloon.Instance.visible = false;
		}
	}
}


