import {Component,View,Inject, Injectable, provide} from 'angular2/core'
import {CORE_DIRECTIVES} from 'angular2/common';
import {HTTP_PROVIDERS } from 'angular2/http';
import {ROUTER_DIRECTIVES, ROUTER_PROVIDERS, RouteConfig,Location, LocationStrategy,AsyncRoute, HashLocationStrategy, Route, Router, RouterLink} from 'angular2/router';
import {Request} from './services/request';
import {Header} from './layout/header/header';
import {Navigator} from './layout/navigator/navigator';
import {Sidebar} from './layout/sidebar/sidebar';
import {Footer} from './layout/footer/footer';
import {Action} from './layout/action/action';
//import {Home} from './components/home/home.component';
//import {Order} from './components/order/order.component';
import {CONFIG} from './admin.config';
import {DynamicRouteConfigurator} from './services/router';

declare var System:any;

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



@RouteConfig([])

@View({
  templateUrl:CONFIG.globalPath +  'admin.html',
  directives: [ROUTER_DIRECTIVES, Header, Navigator, CORE_DIRECTIVES]
})

export class Admin{
    appRoutes: any[];
    constructor(private dynamicRouteConfigurator: DynamicRouteConfigurator) {
               var routes = [{path:'/home',component:'Home',name:'Dashboard'},{path:'/order',component:'Order',name:'Order'}]; 
               this.dynamicRouteConfigurator.dynamicLoader(routes,this);

      }
}




