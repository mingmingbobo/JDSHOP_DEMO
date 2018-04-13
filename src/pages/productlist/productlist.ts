import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { HttpServicesProvider } from '../../providers/http-services/http-services';

import { ConfigProvider } from '../../providers/config/config';

/**
 * Generated class for the ProductlistPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-productlist',
  templateUrl: 'productlist.html',
})
export class ProductlistPage {

  public productList = [];
  public page = 1;
  public cid = '';

  constructor(public navCtrl: NavController, public navParams: NavParams,public config: ConfigProvider, public httpServices:HttpServicesProvider) {

    // for(let i=0;i<10;i++){
    //   this.productList.push({
    //     pic:'assets/imgs/'+'0'+i+'.jpg',
    //     title:'第'+i+'条'
    //   })
    // }
    // console.log('navParams:'+navParams.cid);
    this.cid = navParams.get('cid');
    this.getProductList('');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProductlistPage');
  }


  getProductList(infiniteScroll){
    var that = this;
    this.httpServices.requestData('api/plist?cid='+this.cid+'&page='+this.page,function(data){
      that.productList = that.productList.concat(data.result);
      if(infiniteScroll){
        //告诉ionic 请求数据完成
        infiniteScroll.complete();

        if(data.result.length<10){  /*没有数据停止上拉更新*/
          infiniteScroll.enable(false);
        }
      };

      that.page++;
    });

  }

  doLoadMore(infiniteScroll){
    this.getProductList(infiniteScroll);
  }
}
