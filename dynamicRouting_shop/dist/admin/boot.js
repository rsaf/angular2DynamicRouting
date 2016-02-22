System.register(['angular2/platform/browser', './admin'], function(exports_1) {
    var browser_1, admin_1;
    return {
        setters:[
            function (browser_1_1) {
                browser_1 = browser_1_1;
            },
            function (admin_1_1) {
                admin_1 = admin_1_1;
            }],
        execute: function() {
            browser_1.bootstrap(admin_1.Admin);
        }
    }
});
