System.register(['angular2/core', 'angular2/router', '../admin'], function(exports_1) {
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var core_1, router_1, admin_1;
    var DynamicRouteConfigurator;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (router_1_1) {
                router_1 = router_1_1;
            },
            function (admin_1_1) {
                admin_1 = admin_1_1;
            }],
        execute: function() {
            DynamicRouteConfigurator = (function () {
                function DynamicRouteConfigurator(registry) {
                    this.registry = registry;
                }
                DynamicRouteConfigurator.prototype.addRoute = function (component, route) {
                    var routeConfig = this.getRoutes(component);
                    routeConfig.configs.push(route);
                    this._updateRouteConfig(component, routeConfig);
                    this.registry.config(component, route);
                };
                DynamicRouteConfigurator.prototype.removeRoute = function () {
                };
                DynamicRouteConfigurator.prototype.getRoutes = function (component) {
                    return Reflect.getMetadata('annotations', component)
                        .filter(function (a) {
                        return a.configs != undefined;
                    }).pop();
                };
                DynamicRouteConfigurator.prototype._updateRouteConfig = function (component, routeConfig) {
                    var annotations = Reflect.getMetadata('annotations', component);
                    var routeConfigIndex = -1;
                    for (var i = 0; i < annotations.length; i += 1) {
                        if (annotations[i].configs != undefined) {
                            routeConfigIndex = i;
                            break;
                        }
                    }
                    if (routeConfigIndex < 0) {
                        throw new Error('No route metadata attached to the component');
                    }
                    annotations[routeConfigIndex] = routeConfig;
                    Reflect.defineMetadata('annotations', annotations, admin_1.Admin);
                };
                DynamicRouteConfigurator.prototype.dynamicLoader = function (routes, target) {
                    for (var i = 0; i < routes.length; ++i) {
                        this._setRoutes(routes[i], target);
                    }
                };
                DynamicRouteConfigurator.prototype._setRoutes = function (route, target) {
                    var _this = this;
                    var url = '/assets/shop/admin/components' + route.path + route.path + '.component';
                    this.addRoute(target.constructor, new router_1.AsyncRoute({
                        path: route.path,
                        loader: function () { return System.import(url).then(function (resp) { target.appRoutes = _this._getAppRoutes(target); return resp[route.component]; }); },
                        name: route.name
                    }));
                };
                DynamicRouteConfigurator.prototype._getAppRoutes = function (target) {
                    return this.getRoutes(target.constructor).configs.map(function (route) {
                        return { link: [("/" + route.name)], title: route.name, icon: 'mdi-action-dashboard' };
                    });
                };
                DynamicRouteConfigurator = __decorate([
                    core_1.Injectable(), 
                    __metadata('design:paramtypes', [router_1.RouteRegistry])
                ], DynamicRouteConfigurator);
                return DynamicRouteConfigurator;
            })();
            exports_1("DynamicRouteConfigurator", DynamicRouteConfigurator);
        }
    }
});
