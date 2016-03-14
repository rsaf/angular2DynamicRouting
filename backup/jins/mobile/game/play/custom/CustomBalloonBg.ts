/// <reference path="../../../App.ts" />


module play {
	export module custom {
		export class CustomBalloonBg extends PIXI.Sprite {
			static _Instance: CustomBalloonBg;
			constructor() {
				super(PIXI.Texture.fromFrame('CustomBalloonBg.png'));
				var _this = this;
				this.width = this.width - 200;
				this.height = this.height - 240;
				this.y = 150;
				this.x = (App.width - this.width)/2;
			}
			static get Instance(): CustomBalloonBg {
				if (!CustomBalloonBg._Instance) {
					CustomBalloonBg._Instance = new CustomBalloonBg();
				}
				return CustomBalloonBg._Instance;
			}
		}
	}
}


