import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { HttpServicesProvider } from '../../providers/http-services/http-services';
import { StorageProvider } from '../../providers/storage/storage';
/**
 * Generated class for the RegisterpasswordPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-registerpassword',
  templateUrl: 'registerpassword.html',
})
export class RegisterpasswordPage {

  public passWord = '';
  public rePassWord = '';

  public tel = '';
  public code = '';

  public flag = false;
  public message = '';

  constructor(public navCtrl: NavController, public navParams: NavParams, public httpService: HttpServicesProvider, public toast :ToastController, public strorage:StorageProvider) {
    this.tel = navParams.get('tel');
    this.code = navParams.get('code');
    console.log('tel:'+this.tel+' ,code:'+this.code);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RegisterpasswordPage');
  }

  doRegister(){

    console.log('tap tap');
    if(this.passWord != this.rePassWord){
      this.flag = true;
      this.message = '请保持两次输入的密码一致';
    }else if(this.passWord.length<6){
      this.flag = true;
      this.message = '密码长度不能少于6个字符';
    }else{
      this.flag = false;
      var api = 'api/register';
      this.httpService.doPost(api,{'tel':this.tel,'password':this.passWord,'code':this.code},(result)=>{
        console.log(result);  
        if(result.success){
          this.strorage.set('userinfo',result.userinfo[0]);
          this.navCtrl.popToRoot();
        }
        let toast = this.toast.create({
          message: result.message,
          duration: 3000,
          position: 'top'
        });
        toast.present();
      })
    }

  }

}
