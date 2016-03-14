	/// <reference path="../../App.ts" />


module intro {
	export class MusicBtn extends PIXI.Sprite {
		static _Instance: MusicBtn;
		texOn: PIXI.Texture;
		texOff: PIXI.Texture;
		musicOn: Boolean;
		constructor() {
			var _this = this;
			super(PIXI.Texture.fromFrame("Music.png"));
			this.x = App.width - this.width-20;
			this.y =10;
			this.musicOn = true
			this.buttonMode = this.interactive = true;
			this.on("click", this.fnTap).on("tap", this.fnTap);
		}

		static get Instance(): MusicBtn {
			if (!MusicBtn._Instance) {
				MusicBtn._Instance = new MusicBtn();
			}
			return MusicBtn._Instance;
		}



		fnActive() {
			this.visible = true;
			if (!this.interactive) {
				this.buttonMode = this.interactive = true;
				this.on("click", this.fnTap).on("tap", this.fnTap);
			}
		}
		fnTap() {
			this.musicOn = !this.musicOn;
			if (this.musicOn) {
				createjs.Sound.play("Music", createjs.Sound.INTERRUPT_ANY);
			}
			else {
				createjs.Sound.stop();
			}
		}


		animate(){
			TweenMax.to(this, 0.5, {
				x:App.width
			})
		}
	}
}


