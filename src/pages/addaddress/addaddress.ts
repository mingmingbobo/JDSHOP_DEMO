import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { ToolsProvider } from '../../providers/tools/tools';
//请求数据
import { HttpServicesProvider } from '../../providers/http-services/http-services';

/**
 * Generated class for the AddaddressPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-addaddress',
  templateUrl: 'addaddress.html',
})
export class AddaddressPage {

  public addressModel = {
    name: '',
    tel: '',
    address: ''
  };

  constructor(public navCtrl: NavController, public navParams: NavParams, public toolsP: ToolsProvider, public httpservice: HttpServicesProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AddaddressPage');
  }

  addAddress() {
    if (!this.isEmpty(this.addressModel)) {
      let userInfo = this.toolsP.getUserInfo();
      let json = {
        uid: userInfo._id,
        salt: userInfo.salt,
        name: this.addressModel.name,
        phone: this.addressModel.tel,
        address: this.addressModel.address
      };
      let sign = this.toolsP.sign(json);
      var api = 'api/addAddress';
      this.httpservice.doPost(api, {
        uid: userInfo._id,
        sign: sign,
        name: this.addressModel.name,
        phone: this.addressModel.tel,
        address: this.addressModel.address
      }, (data) => {
        if (data.success) {
          this.navCtrl.pop();
        } else {
          console.log(data.message);
        }

      });

    } else {
      console.log('有地址信息没填');
    }

  }

  isEmpty(json) {
    var empty = false;
    var temArr = [];

    for (let key in json) {
      if (json[key] == '') {
        empty = true;
        break;
      }
    }

    return empty;
  }

}
