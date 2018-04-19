import { Component, ViewChild, ElementRef } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { HttpServicesProvider } from '../../providers/http-services/http-services';

import { ConfigProvider } from '../../providers/config/config';

import { StorageProvider } from '../../providers/storage/storage';

import { CartPage } from '../cart/cart';

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

  @ViewChild('myattr') myattr: ElementRef;

  public PTabs = 'PContent';

  public prd = [];

  public number = 0;

  public cartNum = 0;

  constructor(public navCtrl: NavController, public navParams: NavParams, public config: ConfigProvider, public httpServices: HttpServicesProvider, public storage: StorageProvider) {
    var p_id = navParams.get('id');
    //console.log('id:'+this.p_id);
    this.getProductData(p_id);
    this.cartNum = this.getCartNum();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProductcontentPage');
    this.bindEvent();
  }


  getProductData(id) {
    var api = 'api/pcontent?id=' + id;

    this.httpServices.requestData(api, (data) => {
      //console.log('data:' + data.result);
      this.prd = data.result;
    });
  }

  bindEvent() {
    var attDom = this.myattr.nativeElement;
    attDom.onclick = function (e) {
     // console.log(e.target);
      //console.log(e.srcElement.nodeName);
      if (e.srcElement.nodeName == 'SPAN') {
        var ele: any = e.target;
        var parentNode = ele.parentNode;
        var children = parentNode.children;
        for (let index = 0; index < children.length; index++) {
          children[index].className = '';
        }
        ele.className = 'active';

      }

    }
  }

  incNum() {
    this.number++;

  }

  decNum() {
    if (this.number > 0) {
      this.number--;
    }

  }

  addToCart() {

    var product_title = this.prd['title']
    var product_id = this.prd['_id'];
    var product_pic = this.prd['pic']
    var product_price = this.prd['price'];
    var product_count = this.number;
    var product_attr = '';

    var activeDom = document.querySelectorAll('#myattr .active');
    console.log(activeDom);
    for (let az = 0; az < activeDom.length; az++) {
      product_attr += activeDom[az].innerHTML;
    }
    
    console.log(product_attr);
    var json = {
      'product_title': product_title,
      product_id,
      product_pic, /*es6 属性的简写*/
      product_price,
      product_count,
      product_attr,
      'checked':true
    }

    var storageData = this.storage.get('carts_data');
    if (storageData) {
      if (this.hasData(storageData, json.product_id)) {
        for (let index = 0; index < storageData.length; index++) {
          if (storageData[index].product_id == product_id) {
            storageData[index].product_count += json.product_count;
          }
        }
      } else {
        storageData.push(json);
      }

      this.storage.set('carts_data', storageData);
    } else {
      var tempArr = [];
      tempArr.push(json);
      this.storage.set('carts_data', tempArr);
    }

    this.cartNum += json.product_count;

  }

  hasData(storageData, product_id) {
    if (storageData) {
      for (let index = 0; index < storageData.length; index++) {
        if (storageData[index].product_id == product_id) {
          return true;
        }
      }
    }
    return false;
  }

  getCartNum() {
    //[{"product_title":"乐扣乐扣(lock&lock)菲特旋转盖轻量杯","product_id":"59f6a2d27ac40b223cfdcf811","product_pic":"public\\upload\\iPrQ_-r43nGjFyxYXiMZWTM6.jpg","product_price":"2001","product_count":1,"product_attr":"\n                    红色\n                  "},{"product_title":"乐扣乐扣(lock&lock)菲特旋转盖轻量杯","product_id":"59f6a2d27ac40b223cfdcf811","product_pic":"public\\upload\\iPrQ_-r43nGjFyxYXiMZWTM6.jpg","product_price":"2001","product_count":2,"product_attr":"\n                    红色\n                  "}]
    var num = 0;
    var storageData = this.storage.get('carts_data');
    if (storageData) {
      for (let index = 0; index < storageData.length; index++) {
        num += storageData[index].product_count;

      }
    }
    return num;
  }

  goCartPage(){
    this.navCtrl.push(CartPage);
  }

}
