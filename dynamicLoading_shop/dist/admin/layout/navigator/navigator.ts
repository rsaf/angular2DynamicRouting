import {Component, View,Input} from 'angular2/core';
import {RouterLink,ROUTER_DIRECTIVES} from 'angular2/router';
import {CONFIG} from '../../admin.config'




@Component({
    selector: 'navigator',
})


@View({
	templateUrl: CONFIG.globalPath +  'layout/navigator/navigator.html',
  directives: [RouterLink,ROUTER_DIRECTIVES]
})
export class Navigator {
@Input() navigations: any[];
    constructor(link:RouterLink) {
      //console.log(link)
      // this.navigations = [
      //   {link:'Home', title:'Dashboard', icon:'mdi-action-dashboard'},
      //   {link:'Order', title:'Order', icon:'mdi-editor-insert-invitation'},
      // ]
      // alert(_globalPath);
        // console.log('app leftNav loaded...');
        //   var leftnav = $(".page-topbar").height();
        //   var leftnavHeight = window.innerHeight - leftnav;
        // $('.leftside-navigation').height(leftnavHeight).perfectScrollbar({
        //   suppressScrollX: true
        // });

		// console.log('this.navigation-->>>>>----', this.navigation);
    }
}
