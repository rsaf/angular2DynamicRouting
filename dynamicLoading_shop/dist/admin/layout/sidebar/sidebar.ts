import {Component, View} from 'angular2/core';
import {CORE_DIRECTIVES} from 'angular2/common';
// import {utilService} from "../../commons/services/utilService";
import {RouterLink} from 'angular2/router';




@Component({
    selector: 'sidebar',
})
// @RouteConfig([
//     new Route({path: '/app', component: AppComponent, name: 'app'}),\
// ])


@View({
	templateUrl: '/assets/takashimaya/web/admin/components/layout/sidebar/sidebar.html',
    //styleUrls: [],
    directives: [CORE_DIRECTIVES, RouterLink]
})
export class Sidebar {
	// navigation: any[];
    constructor() {
        // console.log('app sidebar loaded...');
        //  var righttnav = $("#chat-out").height();
        // $('.rightside-navigation').height(righttnav).perfectScrollbar({
        //   suppressScrollX: true
        // });

		// this.navigation = [
		// 					{ icon: 'glyphicon-th', name: '主页', linkTo: ['/Home'] },
		// 					{ icon: 'glyphicon-user', name: '用户', linkTo: ['/Users'] },
		// 					{ icon: 'glyphicon-user', name: 'SHOP', linkTo: ['/Shop']}
		// 					];

		// console.log('this.navigation-->>>>>----', this.navigation);
    }
}
