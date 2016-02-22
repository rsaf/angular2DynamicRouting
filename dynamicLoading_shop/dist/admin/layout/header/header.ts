import {Component, View} from 'angular2/core';
import {CONFIG} from '../../admin.config'



@Component({
    selector: 'header',
})


@View({
    templateUrl: CONFIG.globalPath + 'layout/header/header.html'
    //styleUrls: [],
    //directives:[CORE_DIRECTIVES,RouterLink]
})
export class Header {
    search:string = 'Explore ' + CONFIG.project;
    title:string = CONFIG.project;
    logo:string = CONFIG.resourcePath + 'img/logo.png'
    constructor() {
      // this.logo = CONFIG.resourcePath + 'img/logo.png'
      // console.log(this.logo);

        // console.log('app header loaded...')
        // Search class for focus
        // $('.header-search-input').focus(
        // function(){
        //     $(this).parent('div').addClass('header-search-wrapper-focus');
        // }).blur(
        // function(){
        //     $(this).parent('div').removeClass('header-search-wrapper-focus');
        // });
        // // Search class for focus
        // $('.header-search-input').focus(
        // function(){
        //     $(this).parent('div').addClass('header-search-wrapper-focus');
        // }).blur(
        // function(){
        //     $(this).parent('div').removeClass('header-search-wrapper-focus');
        // });
    }
    change(val){
        console.log(val);
    }
    toggleFullScreen() {

        // if ((document.fullScreenElement && document.fullScreenElement !== null) || (!document.mozFullScreen && !document.webkitIsFullScreen)) {
        //     if (document.documentElement.requestFullScreen) {
        //         document.documentElement.requestFullScreen();
        //     }
        //     else if (document.documentElement.mozRequestFullScreen) {
        //         document.documentElement.mozRequestFullScreen();
        //     }
        //     else if (document.documentElement.webkitRequestFullScreen) {
        //         document.documentElement.webkitRequestFullScreen(Element.ALLOW_KEYBOARD_INPUT);
        //     }
        // }
        // else {
        //     if (document.cancelFullScreen) {
        //         document.cancelFullScreen();
        //     }
        //     else if (document.mozCancelFullScreen) {
        //         document.mozCancelFullScreen();
        //     }
        //     else if (document.webkitCancelFullScreen) {
        //         document.webkitCancelFullScreen();
        //     }
        // }
    }
}
// Fullscreen
// function toggleFullScreen() {

// }

// $('.toggle-fullscreen').click(function() {
//     toggleFullScreen();
// });
