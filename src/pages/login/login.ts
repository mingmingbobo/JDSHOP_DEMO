import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HttpServicesProvider } from '../../providers/http-services/http-services';
import { StorageProvider } from '../../providers/storage/storage';
import { OrderPage } from '../../pages/order/order';

/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  public userInfo = {
    username: '',
    password: ''
  }

  public flag = false;

  public message = '';

  public history = '';

  constructor(public navCtrl: NavController, public navParams: NavParams, public httpService: HttpServicesProvider, public storage: StorageProvider) {
    this.history = navParams.get('history');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  doLogin() {
    console.log(this.userInfo);
    if (!/^\d{11}$/.test(this.userInfo.username)) {
      this.flag = true;
      this.message = '用户名不合法';

    }else if(this.userInfo.password.length<6){
      this.flag = true;
      this.message = '密码长度少于6位';
    }else{
      var api = 'api/doLogin';
      this.httpService.doPost(api, this.userInfo, (result) => {
        console.log(this.userInfo);
        console.log(result);
        this.storage.set('userinfo',result.userinfo[0]);
        if(this.history=='order'){
          this.navCtrl.push(OrderPage);
        }else{
          this.navCtrl.popToRoot();
        }
      });
    }
  }

}
