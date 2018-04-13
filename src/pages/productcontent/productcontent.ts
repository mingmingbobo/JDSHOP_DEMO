import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { HttpServicesProvider } from '../../providers/http-services/http-services';

import { ConfigProvider } from '../../providers/config/config';

/**
 * Generated class for the ProductcontentPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-productcontent',
  templateUrl: 'productcontent.html',
})
export class ProductcontentPage {

  public PTabs = 'PContent';

  public prd = [];

  constructor(public navCtrl: NavController, public navParams: NavParams,public config: ConfigProvider,public httpServices: HttpServicesProvider) {
    var p_id = navParams.get('id');
    //console.log('id:'+this.p_id);
    this.getProductData(p_id);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProductcontentPage');
  }


  getProductData(id){
    var api = 'api/pcontent?id='+id;

    this.httpServices.requestData(api,(data)=>{
      console.log('data:'+data.result);
     this.prd = data.result;
    });
  }
}
