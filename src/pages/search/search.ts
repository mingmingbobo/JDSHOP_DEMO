import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Picker } from 'ionic-angular';
import { Title } from '@angular/platform-browser';

/**
 * Generated class for the SearchPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-search',
  templateUrl: 'search.html',
})
export class SearchPage {

  public flag = true;
  public productList = [];


  constructor(public navCtrl: NavController, public navParams: NavParams) {

    for(let i=0;i<10;i++){
      this.productList.push({
        pic:'assets/imgs/'+'0'+i+'.jpg',
        title:'第'+i+'条'
      })
    }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SearchPage');
    //console.log(this.productList);
  }

}
