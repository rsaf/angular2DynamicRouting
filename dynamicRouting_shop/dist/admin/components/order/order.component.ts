import {Component,View} from 'angular2/core'
import {CONFIG} from '../../admin.config'


@Component({
	    selector: 'gin-admin-order',
})

@View({
  templateUrl: CONFIG.globalPath + 'components/order/order.html'
})
export class Order{
  test:string;
  constructor(){
  	console.log('order is up and running----');
    this.test = 'order';
  }
}
