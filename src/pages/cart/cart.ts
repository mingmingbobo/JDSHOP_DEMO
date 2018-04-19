import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,LoadingController } from 'ionic-angular';
import { StorageProvider } from '../../providers/storage/storage';
import { ConfigProvider } from '../../providers/config/config';
import { flatten } from '@angular/compiler';


/**
 * Generated class for the CartPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-cart',
  templateUrl: 'cart.html',
})
export class CartPage {

  public cartsList = [];
  public totalPrice = 0;

  public isChecked = false;

  public isEdit = false;

  public hasCartData = true;
  public loader;

  constructor(public navCtrl: NavController, public navParams: NavParams, public storage: StorageProvider, public config: ConfigProvider,public loadingCtr:LoadingController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CartPage');
  }

  ionViewDidEnter() {
    this.presentLoading();
    var cartData = this.storage.get('carts_data');
    if (cartData) {
      this.cartsList = cartData;
      this.hasCartData = true;
      if (this.getCheckedArrayLenth() == this.cartsList.length&&this.cartsList.length>0) {
        this.isChecked = true;
      } else {
        this.isChecked = false;
      }
    }else{
      this.cartsList = [];
      this.hasCartData = false;
    }
    this.sumPrice();
    this.loader.dismiss();
  }

  ionViewWillEnter() {

  }

  ionViewWillLeave() {
    this.storage.set('carts_data', this.cartsList);
  }

  presentLoading() {
     this.loader = this.loadingCtr.create({
      content: "Please wait...",
      //duration: 3000
    });
    this.loader.present();
  }

  cartChange() {
    this.sumPrice();
    if (this.getCheckedArrayLenth() == this.cartsList.length&&this.cartsList.length>0) {
      this.isChecked = true;
    } else {
      this.isChecked = false;
    }
  }

  sumPrice() {
    var temPrice = 0;

    for (let index = 0; index < this.cartsList.length; index++) {
      if (this.cartsList[index].checked == true) {
        temPrice += this.cartsList[index].product_count * this.cartsList[index].product_price;
      }
    }

    this.totalPrice = temPrice;
  }

  decNum(item) {
    if (item.product_count > 0) {
      item.product_count--;
      this.sumPrice();
    }
  }

  incNum(item) {
    item.product_count++;
    this.sumPrice();
  }

  doOrder() {
    var tempArr = [];

    if (this.cartsList) {
      for (let index = 0; index < this.cartsList.length; index++) {
        if (this.cartsList[index].checked == true) {
          tempArr.push(this.cartsList[index]);
        }
      }
    }

  }

  selectAll() {
    if (this.cartsList) {

      if (this.isChecked) {
        for (let index = 0; index < this.cartsList.length; index++) {
          if (this.cartsList[index].checked == true) {
            this.cartsList[index].checked = false;
          }
        }
        this.isChecked = false;
      } else {
        for (let index = 0; index < this.cartsList.length; index++) {
          if (this.cartsList[index].checked == false) {
            this.cartsList[index].checked = true;
          }
        }

        this.isChecked = true;
      }
      this.sumPrice();
    }
  }

  getCheckedArrayLenth() {

    var length = 0;

    for (let index = 0; index < this.cartsList.length; index++) {
      if (this.cartsList[index].checked == true) {
        length++;
      }
    }
    return length;
  }

  doDelete() {
    var tempArr = [];
    if (this.cartsList) {
      for (let index = 0; index < this.cartsList.length; index++) {
        if (this.cartsList[index].checked == false) {
          tempArr.push(this.cartsList[index]);
        }
      }
      if (tempArr) {
        this.cartsList = tempArr;
        this.storage.set('carts_data', this.cartsList);
      }
      this.cartsList.length>0?this.hasCartData=true:this.hasCartData=false;

    }

  }


}
