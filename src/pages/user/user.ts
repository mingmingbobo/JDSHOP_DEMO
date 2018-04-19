import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams} from 'ionic-angular';
import { LoginPage } from '../login/login';
import { RegisterPage } from '../register/register';
import { StorageProvider } from '../../providers/storage/storage';
import { PersonalPage } from '../personal/personal';

/**
 * Generated class for the UserPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-user',
  templateUrl: 'user.html',
})
export class UserPage {
  public LoginPage = LoginPage;
  public RegisterPage=RegisterPage;

  public personalPage = PersonalPage

  public userinfo ;

  constructor(public navCtrl: NavController, public navParams: NavParams, public storageService:StorageProvider) {
    
  }

  ionViewWillEnter(){
    this.userinfo = this.storageService.get('userinfo');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad UserPage');
  }

}
