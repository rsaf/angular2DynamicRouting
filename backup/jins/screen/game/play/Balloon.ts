/// <reference path="Play.ts" />
/// <reference path="WishText.ts" />
/// <reference path="WishTextContainer.ts" />
/// <reference path="Avatar.ts" />
module play {
	export class Balloon extends PIXI.Sprite {
		static _Instance: Balloon;
		time: number;
		tag: number;
		static maxCount: number = 7;
		static scale: number = 0.45;
		constructor(id:number) {
			super(PIXI.Texture.fromFrame("balloon" + id + ".png"));
			this.y = App.height;
			this.scale.x = 0.2;
			this.scale.y = 0.2;
			this.init();
			// this.visible = false;
			
		}
		init() {

			// console.log('balloon', App.count % 9, App.count % 9 % 2);
			this.tag = App.count % Balloon.maxCount;
			this.x = App.width / 10 * (this.tag) + App.width / 10 * 2;

			var _this = this;
			
			this.time = Math.random() * 3000;

			var toY = 50 * (Math.random() + 1);

			if (this.tag % 2 == 1) {
				toY = 50 * (Math.random() + 1) + 200;
			}


			TweenMax.to(_this, 15, {
				y: toY,
				onComplete:function(){
					_this.animate()
				}
			})
			TweenMax.to(_this.scale, 8, {
				x: Balloon.scale,
				y: Balloon.scale
			})

		}
		animate(){
			var _this = this

			var toX = (Math.random() - 0.5) * 100 + App.width / 10 * (this.tag) + App.width / 10 *2;
			var toY = 50 * (Math.random() + 1) + 200 * (this.tag % 2);

			TweenMax.to(this, 10, {
				x: toX,
				y: toY,
				onComplete: function(){
					_this.animate();
				}
			});
		}
		addMessage(data){
			var wish = new WishTextContainer();
			wish.addChild(new WishText(data.message));
			this.addChild(wish);
			this.addChild(new Avatar(data.avatar));
		}

	}
}


