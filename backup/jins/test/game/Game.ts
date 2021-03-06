/// <reference path="../App.ts" />
/// <reference path="intro/Intro.ts" />
/// <reference path="play/Play.ts" />
/// <reference path="over/Over.ts" />


class Game extends PIXI.Container {
	static _Instance: Game;
	static state: LiteEvent;

	constructor() {
		var _this = this;
		super()

		Game.state = new LiteEvent();
		this.gameInit();



	}
	static get Instance(): Game {
		if (!Game._Instance) {
			Game._Instance = new Game();
		}
		return Game._Instance;
	}



	gameInit() {
		//this.addChild(intro.Intro.Instance);
		this.addChild(play.Play.Instance);
		this.addChild(over.Over.Instance);
	}

}

