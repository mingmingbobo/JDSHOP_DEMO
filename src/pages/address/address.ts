import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { AddaddressPage } from '../addaddress/addaddress';
import { ToolsProvider } from '../../providers/tools/tools';
import { HttpServicesProvider } from '../../providers/http-services/http-services';
import { EditAddressPage } from '../edit-address/edit-address';
/**
 * Generated class for the AddressPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-address',
  templateUrl: 'address.html',
})
export class AddressPage {
  public addressList = [];

  public addaddressPage = AddaddressPage;

  public editAddressPage = EditAddressPage;

  public userInfo;
  constructor(public navCtrl: NavController, public navParams: NavParams, public tool: ToolsProvider, public httpService: HttpServicesProvider, public alertCtr: AlertController) {

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AddressPage');
    //this.tool.sign();
  }

  ionViewDidEnter() {
    this.userInfo = this.tool.getUserInfo();
    this.getAddressList();
  }


  getAddressList() {
    let json = {
      uid: this.userInfo._id,
      salt: this.userInfo.salt
    };

    let signStr = this.tool.sign(json);
    console.log(json);
    console.log(signStr);
    var api = 'api/addressList?uid=' + this.userInfo._id + '&sign=' + signStr;
    this.httpService.requestData(api, (data) => {
      console.log(data);
      if (data.success) {
        this.addressList = data.result;
      } else {
        console.log(data.message);
      }
    });
  }

  checkAddress(addID) {
    console.log('checkAddress');
    let json = {
      uid: this.userInfo._id,
      salt: this.userInfo.salt,
      id: addID
    };
    let signStr = this.tool.sign(json);

    var api = 'api/changeDefaultAddress';

    this.httpService.doPost(api, {
      uid: this.userInfo._id,
      sign: signStr,
      id: addID
    }, (data) => {
      if (data.success) {
        this.navCtrl.pop();
      } else {
        console.log(data.message);
      }
    });

  }


  deleteAddress(key, addId) {

    let confirm = this.alertCtr.create({
      title: '提示信息',
      message: '确认删除?',
      buttons: [
        {
          text: '否',
          handler: () => {
            //console.log('Disagree clicked');
          }
        },
        {
          text: '是',
          handler: () => {
            //console.log('Agree clicked');
            this.deleteAddressFromServer(addId, key);
          }
        }
      ]
    });
    confirm.present();
  }

  deleteAddressFromServer(addId, key) {
    let json = {
      uid: this.userInfo._id,
      salt: this.userInfo.salt,
      id: addId
    };
    let signStr = this.tool.sign(json);

    var api = 'api/deleteAddress';

    this.httpService.doPost(api, {
      uid: this.userInfo._id,
      sign: signStr,
      id: addId
    }, (data) => {
      if (data.success) {
        this.addressList.splice(key, 1);
      } else {
        console.log(data.message);
      }
    });
  }

  editAddress(item) {
    this.navCtrl.push(EditAddressPage,{'item':item});
  }

}
