/// <reference path="../Game.ts" />
/// <reference path="selectBalloon/SelectBalloon.ts" />
/// <reference path="WishTextContainer.ts" />
/// <reference path="WishText.ts" />
/// <reference path="Play.ts" />


module play {
	export class Wish extends PIXI.Container {
		static _Instance: Wish;
		constructor() {
			var _this = this;
			super();
			this.addChild(play.WishTextContainer.Instance);
			console.log('aaaaaa');
			var text = '';

			if (App.customBalloon) {
				 text = App.customBalloonText;
			}
			else{
				text = balloonText[play.BalloonHolderContainer.selected-1];
			}
			_this.addChild(new play.WishText(text));
			
			play.Play.state.on(function(data) {
				
				switch (data.state) {
					case PLAYSTATE.SHOOTPAGE:
						
						var text = '';

						if (App.customBalloon) {
							 text = App.customBalloonText;
						}
						else{
							text = balloonText[play.BalloonHolderContainer.selected-1];
						}
						_this.addChild(new play.WishText(text));
						break;
				}
			});
			
			this.y = (App.height - this.height) / 2 + 100;
			
		}
		static get Instance(): Wish {
			if (!Wish._Instance) {
				Wish._Instance = new Wish();
			}
			return Wish._Instance;
		}


	}
}