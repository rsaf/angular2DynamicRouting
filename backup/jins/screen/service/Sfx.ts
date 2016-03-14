/// <reference path="../App.ts" />

class Sfx {
	constructor() {

	}
	static FnBgm() {
		if (!createjs.Sound.initializeDefaultPlugins()) {
			return;
		}
		var audioPath = "/assets/jins/";
		var sounds = [
			{ id: "Music", src: "bgm.mp3" }
		];
		createjs.Sound.alternateExtensions = ["ogg"];
		createjs.Sound.addEventListener("fileload", Sfx.FnPlayBgm);
		createjs.Sound.registerSounds(sounds, audioPath);
	}
	static FnPlayBgm() {
		createjs.Sound.play("Music", createjs.Sound.INTERRUPT_ANY);
		// vazee.control.Music.Instance.fnActive();
		//       if (musicOn) {
		//           createjs.Sound.play("Music", createjs.Sound.INTERRUPT_ANY, 0, 0, -1, .1);
		//       }
		//       else {
		//           vazee.control.Music.Instance.musicOn = false;
		//       }
	}

}