System.register(['angular2/core', 'angular2/router', '../../admin.config'], function(exports_1) {
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var core_1, router_1, admin_config_1;
    var Navigator;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (router_1_1) {
                router_1 = router_1_1;
            },
            function (admin_config_1_1) {
                admin_config_1 = admin_config_1_1;
            }],
        execute: function() {
            Navigator = (function () {
                function Navigator(link) {
                }
                __decorate([
                    core_1.Input(), 
                    __metadata('design:type', Array)
                ], Navigator.prototype, "navigations", void 0);
                Navigator = __decorate([
                    core_1.Component({
                        selector: 'navigator',
                    }),
                    core_1.View({
                        templateUrl: admin_config_1.CONFIG.globalPath + 'layout/navigator/navigator.html',
                        directives: [router_1.RouterLink, router_1.ROUTER_DIRECTIVES]
                    }), 
                    __metadata('design:paramtypes', [router_1.RouterLink])
                ], Navigator);
                return Navigator;
            })();
            exports_1("Navigator", Navigator);
        }
    }
});
