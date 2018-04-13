import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Config } from 'ionic-angular';
import { RegisterpasswordPage } from '../registerpassword/registerpassword';
import { HttpServicesProvider } from '../../providers/http-services/http-services';
/**
 * Generated class for the RegistersignPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-registersign',
  templateUrl: 'registersign.html',
})
export class RegistersignPage {
  public phoneNum = '';
  public RegisterpasswordPage=RegisterpasswordPage;
  public code = '1234';
  public flag = true;
  public message = '';

  constructor(public navCtrl: NavController, public navParams: NavParams,public httpService:HttpServicesProvider) {
    console.log('tel:'+navParams.get('tel'));
    this.phoneNum = navParams.get('tel');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RegistersignPage');
  }

doValidateCode(){
  var api = 'api/validateCode';
  this.httpService.doPost(api,{'tel':this.phoneNum,'code':this.code},(result) => {
    console.log('验证code：' + result.success + ':message:' + result.message);
    if(result.success){
      this.flag = true;
      this.navCtrl.push(RegisterpasswordPage);
    }else{
      this.flag = false;
      this.message = result.message;
    }
  });
}

goRegisterpasswordPage(){
  if (/^\d{4}$/.test(this.code)) {
    this.doValidateCode();
  }else{
    this.flag = false;
    this.message = '请输入4位正确的验证码';
  }
}
}
