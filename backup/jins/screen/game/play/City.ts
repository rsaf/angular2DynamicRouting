/// <reference path="../../App.ts" />


module play {
	export class City extends PIXI.Sprite {
		static _Instance: City;
		constructor() {
			super(PIXI.Texture.fromFrame("city.png"));
			this.y = App.height - this.height

		}
		static get Instance(): City {
			if (!City._Instance) {
				City._Instance = new City();
			}
			return City._Instance;
		}
	}
}


