	/// <reference path="../../App.ts" />


module intro {
	export class MusicBtn extends PIXI.Sprite {
		static _Instance: MusicBtn;
		texOn: PIXI.Texture;
		texOff: PIXI.Texture;
		musicOn: Boolean;
		textureOn;
		textureOff;
		constructor() {
			var _this = this;
			this.textureOn = PIXI.Texture.fromFrame("Music.png");
			this.textureOff = PIXI.Texture.fromFrame("MusicOff.png");
			super(this.textureOn);
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
			_hmt.push(["_trackEvent", "button", "click", "MusicBtn"]);

			this.musicOn = !this.musicOn;
			if (this.musicOn) {
				createjs.Sound.play("Music", createjs.Sound.INTERRUPT_ANY, 0, 0, -1, .1);
				this.texture = this.textureOn;
			}
			else {
				this.texture = this.textureOff;
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


