/// <reference path="../../App.ts" />

module over {
	export class Explosion extends PIXI.extras.MovieClip {
		static _Instance: Explosion;
		
		constructor() {
			var _this = this;
			var textures = [];
			var i = 0;
			
			// this.alpha = 0;
			while (++i <= 5) {
				textures.push(PIXI.Texture.fromFrame("Explosion" + i + ".png"));
			}
			super(textures);
			this.animationSpeed = 0.1;

			this.x = (App.width-this.width)/2;
			this.y = (App.height - this.height)/2;
			this.loop = false
			this.visible = false;

			this.onComplete = function(){
				_this.visible = false;
				Over.Instance.addCard();
			}
		}
		static get Instance(): Explosion {
			if (!Explosion._Instance) {
				Explosion._Instance = new Explosion();
			}
			return Explosion._Instance;
		}

		show(){
			this.visible = true;
			// this.alpha = 1;
			this.play();
		}
		FnPlay() {
			// alert('a');
			this.visible = true;
			this.alpha = 1;
			this.play();
		}
		FnStop() {
			this.gotoAndStop(5);
			this.visible = false;
			this.alpha = 0;
		}
	}
}