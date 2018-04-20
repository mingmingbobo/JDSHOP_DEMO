import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { StorageProvider } from '../../providers/storage/storage';
import { ConfigProvider } from '../../providers/config/config';
//import { ToolsProvider } from '../../providers/tools/tools';
import { LoginPage } from '../login/login';
import { AddressPage } from '../address/address';
import { AddaddressPage } from '../addaddress/addaddress';
import { ToolsProvider } from '../../providers/tools/tools';
import { HttpServicesProvider } from '../../providers/http-services/http-services';

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
  public orderList = [];

  public userInfo;

  public address='';

  public loginPage = LoginPage;

  public addressPage = AddressPage;
  public addaddressPage = AddaddressPage;

  constructor(public navCtrl: NavController, public navParams: NavParams, public storage: StorageProvider, public config: ConfigProvider, public toolsP: ToolsProvider, public httpservice: HttpServicesProvider) {
    // console.log(this.userInfo);
  }

  ionViewDidLoad() {

  }

  ionViewWillEnter() {
    this.userInfo = this.toolsP.getUserInfo();
    this.orderList = this.storage.get('order_data');
    if (this.userInfo) {
      this.getDefaultAddress();
    }
  }

  //获取默认收货地址

  getDefaultAddress() {
    let userInfo = this.userInfo;

    let json = {
      uid: userInfo._id,
      salt: userInfo.salt
    };

    let sign = this.toolsP.sign(json);

    var api = 'api/oneAddressList?uid=' + userInfo._id + '&sign=' + sign;
    this.httpservice.requestData(api, (data) => {
      if (data.success) {
        console.log(data);
        this.address = data.result[0];
        console.log(this.address);
      } else {
        this.address = '';
      }
    });

  }
}
