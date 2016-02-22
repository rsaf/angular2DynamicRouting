import {Component, View} from 'angular2/core'
import {CONFIG} from '../../admin.config'

@Component({
	    selector: 'gin-admin-home',
})
@View({
  templateUrl: CONFIG.globalPath + 'components/home/home.html'
})
export class Home{
  test:string;
  constructor(){
  	console.log('home is up and running---');
  }
}
