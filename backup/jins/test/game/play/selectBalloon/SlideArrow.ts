/// <reference path="../../../App.ts" />
/// <reference path="BalloonHolderContainer.ts" />


module play {
	export class SlideUpArrow extends PIXI.Sprite {
		static _Instance: SlideUpArrow;
		static currentGroup:number=1;
		constructor() {
			super(PIXI.Texture.fromFrame("ArrowUp.png"));

			this.x = (App.width - this.width)/2;
			this.y = App.height - this.height - 75;
			this.anchor.x = 0.5;
			this.anchor.y = 0.5;
			this.buttonMode = this.interactive = true;
			this.on("click", this.tapped).on("tap", this.tapped);
		}
		static get Instance(): SlideUpArrow {
			if (!SlideUpArrow._Instance) {
				SlideUpArrow._Instance = new SlideUpArrow();
			}
			return SlideUpArrow._Instance;
		}


		tapped() {
			if (SlideUpArrow.currentGroup!=2){
				play.BalloonHolderContainer.Instance.showSecondGroup();	
				SlideUpArrow.currentGroup = 2;
				this.rotation += 3.1;
			}
			else{
				play.BalloonHolderContainer.Instance.showFirsGroup();
				SlideUpArrow.currentGroup = 1;
				this.rotation -= 3.1;
			}
		}
	}
}


