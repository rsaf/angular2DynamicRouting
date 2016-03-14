/// <reference path="Play.ts" />


module play {
	export class LuckyBalloon extends PIXI.extras.MovieClip {
		static _Instance: LuckyBalloon;
		id: number;
		constructor() {
			App.luckyCount++;

			this.id = Math.round((Math.random() * 4) + 1);
			// console.log(this.id);
			var textures = [];
			var i = 0;
			textures.push(PIXI.Texture.fromFrame("lucky" + this.id + ".png"));
			while (++i <= 5) {
				textures.push(PIXI.Texture.fromFrame("Explosion" + i + ".png"));
			}
			super(textures);
			this.x = App.width / 10 * (App.luckyCount % 10);
			this.y = App.height;
			this.animationSpeed = 0.1;
			this.scale.x = this.scale.y = 0.2;
			this.init();
			this.loop = false;
			var _this = this;
			this.onComplete = function(){
				_this.parent.removeChild(_this);
			}
		}

		init() {
			var _this = this;
			var duration = Math.random() * 5000;


			setTimeout(function() {
				TweenMax.to(_this, 15, {
					y: 200 * (Math.random() + 1),
					onComplete:function(){
						_this.animate()
					}
				})
			}, duration);

			var scale = 0.4

			setTimeout(function(){
				TweenMax.to(_this.scale, 8,{
					x: scale,
					y: scale
				})
			}, duration + 2000)

		}
		animate(){
			var _this = this


			TweenMax.to(this, 5, {
				x: (Math.random() - 0.5) * 100 + _this.x,
				y: (Math.random() - 0.5) * 100 + _this.y,
				onComplete: function(){
					_this.animate();
				}
			});
		}
		expolde(){
			this.play();
		}
	}
}


