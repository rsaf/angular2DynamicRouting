/// <reference path="../../../App.ts" />
/// <reference path="Custom.ts" />


module play {
	export module custom {
		export class Left extends PIXI.Sprite {
			static _Instance: Left;
			constructor() {
				super(PIXI.Texture.fromFrame('Left.png'));
				var _this = this;
				this.y = 300;
				this.x = 80;
			this.buttonMode = this.interactive = true;
			this.on("click", this.tapped).on("tap", this.tapped);
			}
			static get Instance(): Left {
				if (!Left._Instance) {
					Left._Instance = new Left();
				}
				return Left._Instance;
			}

			tapped(){
				play.custom.CustomBalloonHolder.Instance.moveLeft();
			}
		}
	}
}


