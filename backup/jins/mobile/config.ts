/// <reference path="App.ts" />
/// <reference path="game/over/Over.ts" />

enum STATE {
	LOADING,
	INTRO,
	PLAY,
	OVER,
    MYPAGE
}
enum PLAYSTATE{
    MAIN,
    ANIMATE,
    BALLOON,
    CUSTOM,
    SHOOTPAGE,
    SHOOT,
    SHARE,
    RULE,
    SLIDEDOWN
}

var balloonText = [
    "想要当JINS眼镜的模特",
    "想要一台单反相机",
    "想要去一票难求的陈奕迅演唱会",
    "想要请一年的健身私教",
    "想要去日本旅行",
    "想要送一些PC眼镜给孤儿院的小朋友",
    "想要拥有一副完全定制的眼镜",
    "想要得到JINS实习的机会"];

interface Window { requestAnimFrame: any; }

window.requestAnimFrame = (function() {  //canvas animation. 
    return window.requestAnimationFrame ||
        (<any>window).webkitRequestAnimationFrame ||
        (<any>window).mozRequestAnimationFrame ||
        function(callback) {
            window.setTimeout(callback, 1000 / 60);
        };
})();

var _hmt = _hmt || [];
(function() {
    var hm = document.createElement("script");
    hm.src = "//hm.baidu.com/hm.js?599b308e5d4c42189ba18f54397dd9ca";
    var s = document.getElementsByTagName("script")[0];
    s.parentNode.insertBefore(hm, s);
})();



var sdata = {
    title: '放飞气球，愿望成真，更有888元红包等你拿',
    desc: '放飞气球，愿望成真，更有888元红包等你拿',
    link: 'http://event.jins-cn.com/mobile',
    imgUrl: 'http://event.jins-cn.com/assets/jins/wechat.jpg',
    success: function(data) {
        //alert('用户确认分享后执行的回调函数');
        if (over.share.ShareCopy.Instance.visible){
            over.Over.Instance.fnShowRequirePhone();
        }
        _hmt.push(["_trackEvent", "button", "click", "ShareSuccess"]);
    },
    cancel: function() {
        // alert('用户取消分享后执行的回调函数');

        _hmt.push(["_trackEvent", "button", "click", "ShareCancel"]);
    }
};