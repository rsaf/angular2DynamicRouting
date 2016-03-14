/// <reference path="App.ts" />

enum STATE {
    LOADING,
    INTRO,
    PLAY,
    OVER
}

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

var config = {
    x: 0,
    y:0,
    width:1280,
    height:720,
    isProjection: false
}


var sdata = {
    title: '一份脸红心跳的新年礼物，你敢打开吗？快来敲敲神秘女郎的窗户，看看她会给你送什么吧！',
    desc: '随我一起去拿礼物哦！',
    link: 'http://gineign.cn',
    imgUrl: 'http://gineign.cn/assets/jins/wechat.jpg',
    success: function() {
        //alert('用户确认分享后执行的回调函数');
       
        _hmt.push(["_trackEvent", "button", "click", "ShareSuccess"]);
    },
    cancel: function() {
        // alert('用户取消分享后执行的回调函数');

        _hmt.push(["_trackEvent", "button", "click", "ShareCancel"]);
    }
};