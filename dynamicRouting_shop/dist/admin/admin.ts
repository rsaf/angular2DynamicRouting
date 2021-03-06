import {Component,View,Inject, Injectable, provide} from 'angular2/core'
import {CORE_DIRECTIVES} from 'angular2/common';
import {HTTP_PROVIDERS } from 'angular2/http';
import {ROUTER_DIRECTIVES, ROUTER_PROVIDERS, RouteConfig,Location, LocationStrategy, HashLocationStrategy, Route, Router, RouterLink} from 'angular2/router';
import {Request} from './services/request';
import {Header} from './layout/header/header';
import {Navigator} from './layout/navigator/navigator';
import {Sidebar} from './layout/sidebar/sidebar';
import {Footer} from './layout/footer/footer';
import {Action} from './layout/action/action';
import {Home} from './components/home/home.component';
import {Order} from './components/order/order.component';
import {CONFIG} from './admin.config';
import {DynamicRouteConfigurator} from './services/router';

@Component({
  selector:'admin',
  providers: [
    HTTP_PROVIDERS,
    ROUTER_PROVIDERS,
    provide(LocationStrategy, { useClass: HashLocationStrategy }),
    Request,
    RouterLink,
    DynamicRouteConfigurator
  ]
})



@RouteConfig([
])

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




