System.register(['angular2/core', '../../admin.config'], function(exports_1) {
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var core_1, admin_config_1;
    var Header;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (admin_config_1_1) {
                admin_config_1 = admin_config_1_1;
            }],
        execute: function() {
            Header = (function () {
                function Header() {
                    this.search = 'Explore ' + admin_config_1.CONFIG.project;
                    this.title = admin_config_1.CONFIG.project;
                    this.logo = admin_config_1.CONFIG.resourcePath + 'img/logo.png';
                }
                Header.prototype.change = function (val) {
                    console.log(val);
                };
                Header.prototype.toggleFullScreen = function () {
                };
                Header = __decorate([
                    core_1.Component({
                        selector: 'header',
                    }),
                    core_1.View({
                        templateUrl: admin_config_1.CONFIG.globalPath + 'layout/header/header.html'
                    }), 
                    __metadata('design:paramtypes', [])
                ], Header);
                return Header;
            })();
            exports_1("Header", Header);
        }
    }
});
