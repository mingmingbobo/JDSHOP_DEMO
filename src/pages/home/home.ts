import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { SearchPage } from '../search/search';
import { ProductcontentPage } from '../productcontent/productcontent';

import { HttpServicesProvider } from '../../providers/http-services/http-services';

import { ConfigProvider } from '../../providers/config/config';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  public productcontentPage = ProductcontentPage;

  public focusList = [];
  public bestList = [];
  public hotList = [];
  public bestListWidth = '';

  constructor(public navCtrl: NavController, public config: ConfigProvider,public httpServices: HttpServicesProvider) {
    this.getFocus();
    this.getBestList();
    this.getHotList();
  }

  goSearchPage() {
    this.navCtrl.push(SearchPage);
  }

  getFocus(){
    var that = this;
    this.httpServices.requestData('api/Focus',function(data){
      that.focusList = data.result;
      //console.log(data);
      //console.log(data.result);
       
    });
  }

  getBestList(){
    var that = this;
    this.httpServices.requestData('api/plist?is_best=1',function(data){
      that.bestList = data.result;
      //console.log(data);
      //console.log(data.result);
      that.bestListWidth = that.bestList.length * 92 + 'px';
    });
  }

  getHotList(){
    //http://39.108.159.135/api/plist?is_hot=1
    var that = this;
    this.httpServices.requestData('api/plist?is_hot=1',function(data){
      that.hotList = data.result;
      //console.log(data);
      //console.log(data.result);
      //that.bestListWidth = that.bestList.length * 92 + 'px';
    });
  }
}
