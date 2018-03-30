import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the CategorysPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-categorys',
  templateUrl: 'categorys.html',
})
export class CategorysPage {

  public recList=[];

  public cateList=[];

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    for(let i=0 ;i<10;i++) {
      this.recList.push({
        pic : 'assets/imgs/0'+i+'.jpg',
        title : '第'+i+'条'
      })
    }

    for (let i = 0; i < 20; i++) {
      this.cateList.push("分类"+i);
    }
  }

 

  ionViewDidLoad() {
    console.log('ionViewDidLoad CategorysPage');
  }

}
