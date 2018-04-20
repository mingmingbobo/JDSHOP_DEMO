import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ToolsProvider } from '../../providers/tools/tools';
//请求数据
import { HttpServicesProvider } from '../../providers/http-services/http-services';

/**
 * Generated class for the EditAddressPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-edit-address',
  templateUrl: 'edit-address.html',
})
export class EditAddressPage {
  public addressModel = {
    name: '',
    phone: '',
    address: '',
    _id:''
  };
  constructor(public navCtrl: NavController, public navParams: NavParams,public toolsP:ToolsProvider, public httpservice:HttpServicesProvider) {
  
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EditAddressPage');
  }

  ionViewWillEnter(){
    this.addressModel = this.navParams.get('item');
    console.log(this.navParams.get('item'));
  }


  editAddress() {
    if (!this.isEmpty(this.addressModel)) {
      let userInfo = this.toolsP.getUserInfo();
      let json = {
        uid: userInfo._id,
        salt: userInfo.salt,
        name: this.addressModel.name,
        phone: this.addressModel.phone,
        address: this.addressModel.address,
        id:this.addressModel._id
      };
      let sign = this.toolsP.sign(json);
      var api = 'api/editAddress';
      this.httpservice.doPost(api, {
        uid: userInfo._id,
        sign: sign,
        name: this.addressModel.name,
        phone: this.addressModel.phone,
        address: this.addressModel.address,
        id:this.addressModel._id
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
