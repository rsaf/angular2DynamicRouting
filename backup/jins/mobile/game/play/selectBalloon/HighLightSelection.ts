/// <reference path="../../Game.ts" />


module play {
	export class HighLightSelection extends PIXI.Sprite {
		static _Instance: HighLightSelection;
	
		constructor(id) {
			var _this = this;
			super(PIXI.Texture.fromImage('HighLightSelection.png'));
			this.setPosition(id);
		}	


		setPosition(id) {

			var isIphone4: boolean = false;
			if ((App.height / App.width) <= 1.5) {
				this.width = this.width - 40;
				this.height = this.height - 80;
				isIphone4 = true;
			}

			if (id % 2) {
				this.x = 8;
				if (id != 1 && id != 5) {
					if (isIphone4) {
						this.y = 538;
					
					}
					else {
						this.y = 593;
					}

				}
				else {
					this.y = 108;
				}
			}
			else {
				this.x = App.width - this.width - 5;
				if (id != 2 && id != 6) {
					if (isIphone4) {
						this.y = 538;
					}
					else {
						this.y = 593;
					}
				}
				else {
					this.y = 108;
				}
			}

		}
	}
}