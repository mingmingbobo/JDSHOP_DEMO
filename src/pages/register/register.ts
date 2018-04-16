import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { RegistersignPage } from '../registersign/registersign';


import { HttpServicesProvider } from '../../providers/http-services/http-services';

/**
 * Generated class for the RegisterPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})
export class RegisterPage {

  public tel = '';
  public message = '';
  public flag = true;

  public RegistersignPage = RegistersignPage;
  constructor(public navCtrl: NavController, public navParams: NavParams, public httpService: HttpServicesProvider, public toast: ToastController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RegisterPage');
  }

  goRegistersignPage() {

    if (/^\d{11}$/.test(this.tel)) {
      var api = 'api/sendCode';
      var json = { "tel": this.tel }
      this.httpService.doPost(api, json, (result) => {
        console.log('验证码：' + result.success + ':message:' + result.message);
        console.log(result);  
        this.message = result.message;
        if (result.success) {
          this.flag = true;
          let toast = this.toast.create({
            message: this.message,
            duration: 3000,
            position: 'top'
          });
          toast.present();

          this.navCtrl.push(RegistersignPage,{'tel':this.tel,'code':result.code});
        } else {
          this.flag = false;
        }
      });
    } else {
      this.flag = false;
      this.message = '请输入正确的手机号码';
    }


  }

}
