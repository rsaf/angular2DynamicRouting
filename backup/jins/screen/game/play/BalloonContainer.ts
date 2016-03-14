/// <reference path="Play" />
/// <reference path="Balloon" />
/// <reference path="LuckyBalloon" />
module play {
	export class BalloonContainer extends PIXI.Container {
		static _Instance: BalloonContainer;
		constructor() {
			var _this = this;
			super()
			this.baloonInit();
		}
		static get Instance(): BalloonContainer {
			if (!BalloonContainer._Instance) {
				BalloonContainer._Instance = new BalloonContainer();
			}
			return BalloonContainer._Instance;
		}
		baloonInit() {
			var _this = this;

			// for (var i = 1; i < 6; ++i) {
			// 	_this.addChild(new Balloon(i));
			// }
			// for (var i = 0; i < 10; ++i) {
			// 	setTimeout(function() {
			// 		_this.addChildAt(new LuckyBalloon(), 0);
			// 	}, i * 1000);
			// }

		}
		shoot(data) {
			this.clean();
			var _this = this;
			var name = 'balloon' + App.count % Balloon.maxCount;
			// console.log(name);
			var original = this.getChildByName(name) as Balloon;
			// console.log(original);
			if (original) {
				// code...
				TweenMax.to(original, 5,{
					y: original.y - App.height,
					onComplete:function(){
						_this.removeChild(original);
						
					}
				})
				this.fire(data, name);
			}else{
				this.fire(data, name);
			}


		}
		fire(data, name){
			var balloon = new Balloon(data.balloon_id);
			setTimeout(function(){
				balloon.name = name;
			}, 1000);
			// balloon.x = balloon.x - 50;
			balloon.addMessage(data);
			this.addChild(balloon);
			App.count++;
		}
		clean(){
			if(this.children.length >10) {
				this.removeChildAt(0);
			}
		}
	}
}