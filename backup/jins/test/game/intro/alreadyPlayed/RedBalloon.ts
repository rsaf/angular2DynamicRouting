/// <reference path="../../Game.ts" />
/// <reference path="../../../App.ts" />


module intro {
	export class RedBalloon extends PIXI.Sprite {
		bid;
		constructor(id: number = 1) {
			var _this = this;
			super(PIXI.Texture.fromImage('RedBalloon1.png'));
			this.setPosition(id);
		}

		setPosition(id) {
			var isIphone4: boolean = false;
			if ((App.height / App.width) <= 1.5) {
				this.width = this.width - 30;
				this.height = this.height - 70;
				isIphone4 = true;
			}

			if (id % 2) {
				this.x = 80;
				if (id != 1 && id != 5) {
				
					this.y = 805;

				}
				else {
					this.y = 620;
				}
			}
			else {
				this.x = App.width - this.width - 80;
				if (id != 2 && id != 6) {
				
						this.y =805;
				}
				else {
					this.y = 620;
				}
			}

		}
	}
}