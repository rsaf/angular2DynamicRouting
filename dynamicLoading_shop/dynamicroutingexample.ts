/// <reference path="../../../node_modules/reflect-metadata/reflect-metadata.d.ts"/>

import {Type, Injectable, Input, Component, ViewEncapsulation} from 'angular2/core';
import {
  RouteConfig,
  ROUTER_DIRECTIVES,
  RouteRegistry
} from 'angular2/router';
// import {HTTP_PROVIDERS} from 'angular2/http';

import {HomeCmp} from '../home/home';
import {AboutCmp} from '../about/about';
import {NameList} from '../../services/name_list';

@Component({
  selector: 'app-nav',
  directives: [ROUTER_DIRECTIVES],
  template: `
    <nav>
      <a *ngFor="#route of routes"
        [routerLink]="route.path">
        {{route.name}}
      </a>
    </nav>
  `
})
export class AppNav {
  @Input()
  routes: string[];
}

@Injectable()
class DynamicRouteConfigurator {
  constructor(private registry: RouteRegistry) {}
  addRoute(component: Type, route) {
    let routeConfig = this.getRoutes(component);
    routeConfig.configs.push(route);
    this.updateRouteConfig(component, routeConfig);
    this.registry.config(component, route);
  }
  removeRoute() {
    // need to touch private APIs - bad
  }
  getRoutes(component: Type) {
    return Reflect.getMetadata('annotations', component)
      .filter(a => {
        return a.constructor.name === 'RouteConfig';
      }).pop();
  }
  updateRouteConfig(component: Type, routeConfig) {
    let annotations = Reflect.getMetadata('annotations', component);
    let routeConfigIndex = -1;
    for (let i = 0; i < annotations.length; i += 1) {
      if (annotations[i].constructor.name === 'RouteConfig') {
        routeConfigIndex = i;
        break;
      }
    }
    if (routeConfigIndex < 0) {
      throw new Error('No route metadata attached to the component');
    }
    annotations[routeConfigIndex] = routeConfig;
    Reflect.defineMetadata('annotations', annotations, AppCmp);
  }
}




@Component({
  selector: 'app',
  viewProviders: [NameList, DynamicRouteConfigurator],
  templateUrl: './components/app/app.html',
  styleUrls: ['./components/app/app.css'],
  encapsulation: ViewEncapsulation.None,
  directives: [AppNav, ROUTER_DIRECTIVES]
})
@RouteConfig([
  { path: '/', component: HomeCmp, as: 'Home' }
])


export class AppCmp {
  appRoutes: string[][];
  constructor(private dynamicRouteConfigurator: DynamicRouteConfigurator) {
    this.appRoutes = this.getAppRoutes();
    setTimeout(_ => {
      let route = { path: '/about', component: AboutCmp, as: 'About' };
      this.dynamicRouteConfigurator.addRoute(this.constructor, route);
      this.appRoutes = this.getAppRoutes();
    }, 1000);
  }
  private getAppRoutes(): string[][] {
    return this.dynamicRouteConfigurator
      .getRoutes(this.constructor).configs.map(route => {
        return { path: [`/${route.as}`], name: route.as };
      });
  }
}

//########################working one#########################


/// <reference path="../../../node_modules/reflect-metadata/reflect-metadata.d.ts"/>

import {Injectable, Type,ViewEncapsulation} from 'angular2/core'
import {RouteRegistry} from 'angular2/router'
import {Admin} from '../admin'

/// <reference path="../../typings/lodash/lodash.d.ts" />

declare var _:any;

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
}








@RouteConfig([])

@View({
  templateUrl:CONFIG.globalPath +  'admin.html',
  directives: [ROUTER_DIRECTIVES, Header, Navigator, CORE_DIRECTIVES]
})

export class Admin{
    appRoutes: any[];
  constructor(private dynamicRouteConfigurator: DynamicRouteConfigurator) {
    this.appRoutes = this.getAppRoutes();
      let routes = [ { path: '/', component: Home, name: 'Dashboard' },{ path: '/order', component: Order, name: 'Order' }];
      var i = -1;
      while(++i<routes.length){
         this.dynamicRouteConfigurator.addRoute(this.constructor, routes[i]);
      }
      this.appRoutes = this.getAppRoutes();
  }

  private getAppRoutes(): any[] {
      return this.dynamicRouteConfigurator
      .getRoutes(this.constructor).configs.map(route => {
        return { link: [`/${route.name}`], title: route.name,icon:'mdi-action-dashboard' };
      });
  }

}


