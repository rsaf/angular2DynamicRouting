System.register(['angular2/core', 'angular2/common', 'angular2/http', 'angular2/router', './services/request', './layout/header/header', './layout/navigator/navigator', './components/home/home.component', './components/order/order.component', './admin.config', './services/router'], function(exports_1) {
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var core_1, common_1, http_1, router_1, request_1, header_1, navigator_1, home_component_1, order_component_1, admin_config_1, router_2;
    var Admin;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (common_1_1) {
                common_1 = common_1_1;
            },
            function (http_1_1) {
                http_1 = http_1_1;
            },
            function (router_1_1) {
                router_1 = router_1_1;
            },
            function (request_1_1) {
                request_1 = request_1_1;
            },
            function (header_1_1) {
                header_1 = header_1_1;
            },
            function (navigator_1_1) {
                navigator_1 = navigator_1_1;
            },
            function (home_component_1_1) {
                home_component_1 = home_component_1_1;
            },
            function (order_component_1_1) {
                order_component_1 = order_component_1_1;
            },
            function (admin_config_1_1) {
                admin_config_1 = admin_config_1_1;
            },
            function (router_2_1) {
                router_2 = router_2_1;
            }],
        execute: function() {
            Admin = (function () {
                function Admin(dynamicRouteConfigurator) {
                    this.dynamicRouteConfigurator = dynamicRouteConfigurator;
                    this.appRoutes = this.getAppRoutes();
                    var routes = [{ path: '/', component: home_component_1.Home, name: 'Dashboard' }, { path: '/order', component: order_component_1.Order, name: 'Order' }];
                    var i = -1;
                    while (++i < routes.length) {
                        this.dynamicRouteConfigurator.addRoute(this.constructor, routes[i]);
                    }
                    this.appRoutes = this.getAppRoutes();
                }
                Admin.prototype.getAppRoutes = function () {
                    return this.dynamicRouteConfigurator
                        .getRoutes(this.constructor).configs.map(function (route) {
                        return { link: [("/" + route.name)], title: route.name, icon: 'mdi-action-dashboard' };
                    });
                };
                Admin = __decorate([
                    core_1.Component({
                        selector: 'admin',
                        providers: [
                            http_1.HTTP_PROVIDERS,
                            router_1.ROUTER_PROVIDERS,
                            core_1.provide(router_1.LocationStrategy, { useClass: router_1.HashLocationStrategy }),
                            request_1.Request,
                            router_1.RouterLink,
                            router_2.DynamicRouteConfigurator
                        ]
                    }),
                    router_1.RouteConfig([]),
                    core_1.View({
                        templateUrl: admin_config_1.CONFIG.globalPath + 'admin.html',
                        directives: [router_1.ROUTER_DIRECTIVES, header_1.Header, navigator_1.Navigator, common_1.CORE_DIRECTIVES]
                    }), 
                    __metadata('design:paramtypes', [router_2.DynamicRouteConfigurator])
                ], Admin);
                return Admin;
            })();
            exports_1("Admin", Admin);
        }
    }
});
