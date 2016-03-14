/// <reference path="../App.ts" />
/// <reference path="play/Play.ts" />


class Game extends PIXI.Container {
	static _Instance: Game;

	constructor() {
		super()
		this.gameInit();
	}
	static get Instance(): Game {
		if (!Game._Instance) {
			Game._Instance = new Game();
		}
		return Game._Instance;
	}
	gameInit() {
		this.addChild(play.Play.Instance);
		// this.addChild(intro.Intro.Instance);
		// this.addChild(over.Over.Instance);
	}

}

