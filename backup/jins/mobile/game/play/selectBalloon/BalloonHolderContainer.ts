/// <reference path="../../Game.ts" />
/// <reference path="BalloonHolder.ts" />
/// <reference path="Balloon.ts" />
/// <reference path="HighLightSelection.ts" />
/// <reference path="../../../config.ts" />

module play {
	export class BalloonHolderContainer extends PIXI.Container {
		static _Instance: BalloonHolderContainer;
		static lastHighLighter: any;
		static selected: number=1;
	
		constructor() {
			var _this = this;
			super();
			this.scale.x = 0.9
			this.scale.y = 0.9

			this.x = App.width * 0.1 / 2

			this.showFirsGroup();

			Play.state.on(function(data) {
				switch (data.state) {
					case PLAYSTATE.MAIN:
						break;
					case PLAYSTATE.ANIMATE:
						break;
					case PLAYSTATE.BALLOON:
						_this.highlightBallon(data.id);
						break;
				}
			});
		
		
		}
		static get Instance(): BalloonHolderContainer {
			if (!BalloonHolderContainer._Instance) {
				BalloonHolderContainer._Instance = new BalloonHolderContainer();
			}
			return BalloonHolderContainer._Instance;
		}


		highlightBallon(id:number){
			this.removeChild(BalloonHolderContainer.lastHighLighter);
			BalloonHolderContainer.lastHighLighter = new play.HighLightSelection(id);
			BalloonHolderContainer.selected = id;
			// console.log(id);
			this.addChild(BalloonHolderContainer.lastHighLighter);	
		}

		showFirsGroup(){
			this.removeChildren();
			this.addChild(new play.BalloonHolder(1));
			this.addChild(new play.BalloonHolder(2));
			this.addChild(new play.BalloonHolder(3));
			this.addChild(new play.BalloonHolder(4));
			this.addChild(new play.Balloon(1));
			this.addChild(new play.Balloon(2));
			this.addChild(new play.Balloon(3));
			this.addChild(new play.Balloon(4));	
		}

		showSecondGroup() {
			this.removeChildren();
			this.addChild(new play.BalloonHolder(5));
			this.addChild(new play.BalloonHolder(6));
			this.addChild(new play.BalloonHolder(7));
			this.addChild(new play.BalloonHolder(8));
			this.addChild(new play.Balloon(5));
			this.addChild(new play.Balloon(6));
			this.addChild(new play.Balloon(7));
			this.addChild(new play.Balloon(8));
		}


	}
}