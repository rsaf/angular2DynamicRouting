/// <reference path="../../../App.ts" />
/// <reference path="Custom.ts" />


module play {
	export module custom {
		export class Next extends PIXI.Sprite {
			static _Instance: Next;
			constructor() {
				super(PIXI.Texture.fromFrame("Next.png"));

				this.x = (App.width - this.width)/2;
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
				play.custom.Custom.Instance.visible = false;
				App.customBalloonText = $('#customWishMessage input').val();
				App.customBalloon = play.custom.CustomBalloonHolder.currentBalloon_id;
				$('#customWishMessage input').val('');
				$('#customWishMessage')[0].style.display = 'none';
				play.Play.state.trigger({ state: PLAYSTATE.SHOOTPAGE });
			}
		}
	}
}