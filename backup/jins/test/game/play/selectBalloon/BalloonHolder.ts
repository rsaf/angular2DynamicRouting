/// <reference path="../../Game.ts" />


module play {
	export class BalloonHolder extends PIXI.Sprite {
		bid;
		constructor(id: number){
			var _this = this;
			super(PIXI.Texture.fromImage('BalloonHolder'+id+'.png'));
			this.setPosition(id);
			this.bid = id;
			this.buttonMode = this.interactive = true;
			this.on("click", this.tapped).on("tap", this.tapped);

		}	

		setPosition(id) {

			var isIphone4: boolean = false;
			if ((App.height / App.width) <= 1.5) {
				this.width = this.width - 30;
				this.height = this.height - 70;
				isIphone4 = true;
			}

			if (id % 2) {
				this.x = 20;
				if (id != 1 && id != 5) {
					if(isIphone4){
						this.y = 550;
					}
					else{
						this.y = 605;
					}
					
				}
				else {
					this.y = 120;
				}
			}
			else {
				this.x = App.width - this.width - 20;
				if (id != 2 && id != 6) {
					if (isIphone4) {
						this.y = 550;
					}
					else {
						this.y = 605;
					}
				}
				else {
					this.y = 120;
				}
			}

		}

		tapped() {
			play.Play.state.trigger({ state: PLAYSTATE.BALLOON, id: this.bid });
			
		}
	}
}