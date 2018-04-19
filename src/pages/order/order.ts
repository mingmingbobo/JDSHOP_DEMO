import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { StorageProvider } from '../../providers/storage/storage';
import { ConfigProvider } from '../../providers/config/config';
import { LoginPage } from '../login/login';

/**
 * Generated class for the OrderPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-order',
  templateUrl: 'order.html',
})
export class OrderPage {

  public addressList = [];
  public orderList = [];

  public userInfo ;

  public loginPage = LoginPage;

  constructor(public navCtrl: NavController, public navParams: NavParams,public storage:StorageProvider,public config:ConfigProvider) {
    this.userInfo = this.storage.get('userinfo');
    console.log(this.userInfo);
  }

  ionViewDidLoad() {
  
  }

  ionViewDidEnter(){
   
   this.orderList =  this.storage.get('order_data');
  }



}
