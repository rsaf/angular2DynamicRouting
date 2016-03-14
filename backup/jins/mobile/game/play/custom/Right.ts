/// <reference path="../../../App.ts" />
/// <reference path="Custom.ts" />


module play {
	export module custom {
		export class Right extends PIXI.Sprite {
			static _Instance: Right;
			constructor() {
				super(PIXI.Texture.fromFrame('Right.png'));
				var _this = this;
				this.y = 300;
				this.x = App.width-this.width -80;
				this.buttonMode = this.interactive = true;
				this.on("click", this.tapped).on("tap", this.tapped);
			}
			static get Instance(): Right {
				if (!Right._Instance) {
					Right._Instance = new Right();
				}
				return Right._Instance;
			}



			tapped() {
				play.custom.CustomBalloonHolder.Instance.moveRight();
			}
		}
	}
}


