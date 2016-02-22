import {View} from 'angular2/core'
import {CONFIG} from '../../admin.config'

@View({
  templateUrl: CONFIG.globalPath + 'components/product/product.html'
})
export class Product{
  test:string;
  constructor(){
    this.test = 'product';
  }
}
