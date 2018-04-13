import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { HttpServicesProvider } from '../../providers/http-services/http-services';

import { ConfigProvider } from '../../providers/config/config';

import { ProductlistPage } from '../productlist/productlist';

/**
 * Generated class for the CategorysPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-categorys',
  templateUrl: 'categorys.html',
})
export class CategorysPage {

  //  public recList=[];

  //  public cateList=[];

  public leftCate = [];
  public rightCate = [];

  public productlistPage = ProductlistPage;



  constructor(public navCtrl: NavController, public navParams: NavParams,public config: ConfigProvider,public httpServices: HttpServicesProvider) {
    // for(let i=0 ;i<10;i++) {
    //   this.recList.push({
    //     pic : 'assets/imgs/0'+i+'.jpg',
    //     title : '第'+i+'条'
    //   })
    // }

    // for (let i = 0; i < 20; i++) {
    //   this.cateList.push("分类"+i);
    // }

    this.getLeftCate();
  }

 

  ionViewDidLoad() {
    console.log('ionViewDidLoad CategorysPage');
  }


  getLeftCate(){
    var that = this;
    this.httpServices.requestData('api/pcate',function(data){
      that.leftCate = data.result;
      that.getRightCate(data.result[0]._id);
    });
  }


  getRightCate(pid){
    var that = this;
    this.httpServices.requestData('api/pcate?pid='+pid,function(data){
      that.rightCate = data.result;
    });
  }

  goSearchPage(){
    
  }

}
