import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { StorageProvider } from '../../providers/storage/storage';
import { ConfigProvider } from '../../providers/config/config';
//import { ToolsProvider } from '../../providers/tools/tools';
import { LoginPage } from '../login/login';
import { AddressPage } from '../address/address';
import { AddaddressPage } from '../addaddress/addaddress';
import { PaymentPage } from '../payment/payment';
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

  public address ;

  public totalPrice = 0;

  public disTotalPrice = 0;

  public comment = '';

  public loginPage = LoginPage;

  public addressPage = AddressPage;
  public addaddressPage = AddaddressPage;

  //打折
  public discount = 0;

  //运费
  public freight = 0;

  constructor(public navCtrl: NavController, public navParams: NavParams, public storage: StorageProvider, public config: ConfigProvider, public toolsP: ToolsProvider, public httpservice: HttpServicesProvider) {
    // console.log(this.userInfo);
    this.discount = 5;
    this.freight = 15;
  }

  ionViewDidLoad() {

  }

  ionViewWillEnter() {
    this.userInfo = this.toolsP.getUserInfo();
    this.orderList = this.storage.get('order_data');
    if (this.userInfo) {
      this.getDefaultAddress();
    }
    this.sumOrderPrice();
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

  sumOrderPrice() {
    var temPrice = 0;

    for (let index = 0; index < this.orderList.length; index++) {
      if (this.orderList[index].checked == true) {
        temPrice += this.orderList[index].product_count * this.orderList[index].product_price;
      }
    }

    this.disTotalPrice = temPrice+this.freight-this.discount;
    this.totalPrice = temPrice;
  }

  //下单
  goPayment() {
    let userInfo = this.userInfo;

    if (userInfo) {

      if(this.address){
        let json = {
          uid: userInfo._id,
          salt: userInfo.salt,
          address:this.address.address,
          phone:this.address.phone,
          name:this.address.name,
          all_price:this.totalPrice
        };

        let sign = this.toolsP.sign(json);
        let productsStr = JSON.stringify(this.orderList);

        let postData = {
          uid: userInfo._id,
          sign: sign,
          address:this.address.address,
          phone:this.address.phone,
          name:this.address.name,
          all_price:this.totalPrice,
          products:productsStr,
          leave_word:this.comment
        }

        console.log(postData);
        this.httpservice.doPost('api/doOrder',postData,(data)=>{
          if (data.success) {
            this.navCtrl.push(PaymentPage);
          }else{
            console.log(postData);
          }
        })
        
      }else{
        //地址信息为空
      }

    }else{
      //用户未登陆
      this.navCtrl.push(LoginPage, {history:'order'});
  
  }

    


  }
}
