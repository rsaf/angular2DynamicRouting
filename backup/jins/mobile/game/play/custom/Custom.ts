/// <reference path="../../../App.ts" />
/// <reference path="Left.ts" />
/// <reference path="Right.ts" />
/// <reference path="CustomBalloonHolder.ts" />
/// <reference path="SellectCustomBalloon.ts" />
/// <reference path="Next.ts" />


module play {
	export module custom {
		export class Custom extends PIXI.Container {
			static _Instance: Custom;
			constructor() {
				super();
				var _this = this;
				this.addChild(play.custom.Left.Instance);
				this.addChild(play.custom.Right.Instance);
				this.addChild(play.custom.CustomBalloonHolder.Instance);
				this.addChild(play.custom.SellectCustomBalloon.Instance);
				this.addChild(play.custom.Next.Instance);
				this.visible = false;

				Play.state.on(function(data) {
					switch (data.state) {
						case PLAYSTATE.CUSTOM:
							console.log('custom----');
							_this.show();
							break;
					}
				})
			}
			static get Instance(): Custom {
				if (!Custom._Instance) {
					Custom._Instance = new Custom();
				}
				return Custom._Instance;
			}

			show() {
				this.visible = true;
				jQuery('#customWishMessage')[0].style.display = 'block';
			}
		}
	}
}


