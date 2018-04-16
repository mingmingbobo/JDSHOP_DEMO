import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Config,ToastController } from 'ionic-angular';
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
  public code = '';
  public flag = true;
  public message = '';
  public showTimer = true;
  public timeCount = 10;

  constructor(public navCtrl: NavController, public navParams: NavParams,public httpService:HttpServicesProvider,public toast:ToastController) {
    console.log('tel:'+navParams.get('tel'));
    this.phoneNum = navParams.get('tel');
    this.code = navParams.get('code');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RegistersignPage');
    this.doTimer();
  }

doValidateCode(){
  var api = 'api/validateCode';
  this.httpService.doPost(api,{'tel':this.phoneNum,'code':this.code},(result) => {
    console.log('验证code：' + result.success + ':message:' + result.message);
    if(result.success){
      this.flag = true;
      this.navCtrl.push(RegisterpasswordPage,{'tel':this.phoneNum,'code':this.code});
    }else{
      this.flag = false;
      this.message = result.message;
    }
  });
}

doTimer(){
  this.showTimer = true;
  var timer = setInterval(()=>{
    --this.timeCount;
    if(this.timeCount==0){
      clearInterval(timer);
      this.showTimer = false;
    }
  },1000);

}

reSend(){
  var api = 'api/sendCode';
      var json = { "tel": this.phoneNum }
      this.httpService.doPost(api, json, (result) => {
        // console.log('验证码：' + result.success + ':message:' + result.message);
        // console.log(result);  
        // this.message = result.message;
          this.code = result.code;
          this.doTimer();
          let toast = this.toast.create({
            message: result.message,
            duration: 3000,
            position: 'top'
          });
          toast.present();
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
