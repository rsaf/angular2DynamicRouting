/// <reference path="App.ts" />
domready(function() {
	$(window).on("resize orientationchange", App.resize);
    App.loadAssets();
});