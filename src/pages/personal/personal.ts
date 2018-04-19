import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { StorageProvider } from '../../providers/storage/storage';

/**
 * Generated class for the PersonalPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-personal',
  templateUrl: 'personal.html',
})
export class PersonalPage {

  public userInfo;
  constructor(public navCtrl: NavController, public navParams: NavParams, public storage:StorageProvider) {
    this.userInfo = storage.get('userinfo');
    console.log(this.userInfo);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PersonalPage');
  }

  logout(){
    this.userInfo = '';
    this.storage.remove('userinfo');
    this.navCtrl.popToRoot(); 
  }

  seletcSex(){

  }

  choosePic(){

  }

}
