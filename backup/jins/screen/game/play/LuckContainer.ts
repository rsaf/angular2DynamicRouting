/// <reference path="Play" />
/// <reference path="Balloon" />
/// <reference path="LuckyBalloon" />
module play {
	export class LuckyContainer extends PIXI.Container {
		static _Instance: LuckyContainer;
		constructor() {
			var _this = this;
			super()
			this.baloonInit();
		}
		static get Instance(): LuckyContainer {
			if (!LuckyContainer._Instance) {
				LuckyContainer._Instance = new LuckyContainer();
			}
			return LuckyContainer._Instance;
		}
		baloonInit() {
			var _this = this;

			// for (var i = 1; i < 6; ++i) {
			// 	_this.addChild(new Balloon(i));
			// }
			for (var i = 1; i <= 10; ++i) {
				setTimeout(function() {
					var lucky = new LuckyBalloon()
					_this.addChild(lucky);
				}, i * 1000);
			}

		}
		explode(data){
			var _this = this;
			if(this.children.length < 10) {
				// code...
				setTimeout(function() {
					var lucky = new LuckyBalloon()
					_this.addChild(lucky);
				}, 1000);
			}
			var lucky = this.getChildAt(0) as LuckyBalloon;
			lucky.expolde();
		}
	}
}