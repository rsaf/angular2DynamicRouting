/// <reference path="../../Game.ts" />


module play {
	export class Balloon extends PIXI.Sprite {
		bid;
		constructor(id: number = 1, intro: boolean = false, custom:boolean=false) {
			var _this = this;
			super(PIXI.Texture.fromImage('Balloon' + id + '.png'));
			this.setPosition(id,intro,custom);
		}

		setPosition(id,intro,custom) {

			var isIphone4: boolean = false;



			if (intro){

				if ((App.height / App.width) <= 1.5) {

					this.width = this.width - 140;
					this.height = this.height - 190;
					isIphone4 = true;
				}
				else{
					this.width = this.width - 85;
					this.height = this.height - 100;
				}

				if (id % 2) {
					this.x = 90;
					if (id != 1 && id != 5) {
						if (isIphone4) {
							this.y = 300;
						}
						else {
							this.y = 365;
						}

					}
					else {
						this.y = 100;
					}
				}
				else {
					this.x = App.width - this.width - 90;
					if (id != 2 && id != 6) {
						if (isIphone4) {
							this.y = 300;
						}
						else {
							this.y = 365;
						}
					}
					else {
						this.y = 100;
					}
				}

			}
			else if (custom){
				this.x = (App.width- this.width)/2;
				this.y = 200;
			}
			else{

				if ((App.height / App.width) <= 1.5) {
					this.width = this.width - 30;
					this.height = this.height - 70;
					isIphone4 = true;
				}

				if (id % 2) {
					this.x = 55;
					if (id != 1 && id != 5) {
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
				else {
					this.x = App.width - this.width - 55;
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
		

		}
	}
}