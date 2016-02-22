/// <reference path="../../../node_modules/reflect-metadata/reflect-metadata.d.ts"/>

import {Injectable, Type,ViewEncapsulation} from 'angular2/core'
import {RouteRegistry,AsyncRoute} from 'angular2/router'
import {Admin} from '../admin'

/// <reference path="../../typings/lodash/lodash.d.ts" />

declare var _:any;
declare var System:any;

@Injectable()
export class DynamicRouteConfigurator {
  constructor(private registry: RouteRegistry) {}

  addRoute(component: Type, route) {
    let routeConfig = this.getRoutes(component);
    routeConfig.configs.push(route);
    this._updateRouteConfig(component, routeConfig);
    this.registry.config(component, route);
  }
  removeRoute() {
    // need to touch private APIs - bad
  }
  getRoutes(component: Type) {
      return Reflect.getMetadata('annotations', component)
          .filter(a => {
            return a.configs!=undefined;
          }).pop();
  }
  _updateRouteConfig(component: Type, routeConfig) {
    let annotations = Reflect.getMetadata('annotations', component);
    let routeConfigIndex = -1;
    for (let i = 0; i < annotations.length; i += 1) {
        if (annotations[i].configs!=undefined) {
            routeConfigIndex = i;
            break;
          }
    }
    if (routeConfigIndex < 0) {
      throw new Error('No route metadata attached to the component');
    }
    annotations[routeConfigIndex] = routeConfig;
    Reflect.defineMetadata('annotations', annotations, Admin);
  }

  dynamicLoader(routes,target){

    for (var i = 0; i < routes.length; ++i) {this._setRoutes(routes[i],target);} 

  }

   _setRoutes(route,target){
              var _this = this;
              var url = '/assets/shop/admin/components'+route.path+route.path+'.component';
               this.addRoute(target.constructor, 
                                     new AsyncRoute({
                                       path: route.path
                                       ,loader:() =>   System.import(url).then(function(resp){ target.appRoutes = _this._getAppRoutes(target); return resp[route.component]; })
                                       ,name:route.name
                          })); 
      }  
      _getAppRoutes(target): any[] {
          return this.getRoutes(target.constructor).configs.map(route => {
                return { link: [`/${route.name}`], title: route.name,icon:'mdi-action-dashboard' };
          
          });
      }
}








