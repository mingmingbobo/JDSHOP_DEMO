import { Component ,ViewChild} from '@angular/core';
import { IonicPage, NavController, NavParams, Picker,Content,AlertController } from 'ionic-angular';
import { Title } from '@angular/platform-browser';

import { HttpServicesProvider } from '../../providers/http-services/http-services';

import { ConfigProvider } from '../../providers/config/config';

import { StorageProvider } from '../../providers/storage/storage';
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

  @ViewChild(Content) content: Content;

  public flag = false;
  public productList = [];
  public keywords = '';
  public page = 1;
  public hasData = true;

  public historyList=[];


  constructor(public navCtrl: NavController, public navParams: NavParams,public config: ConfigProvider, public httpServices:HttpServicesProvider,public storage:StorageProvider,public alertcv:AlertController) {

    // for(let i=0;i<10;i++){
    //   this.productList.push({
    //     pic:'assets/imgs/'+'0'+i+'.jpg',
    //     title:'第'+i+'条'
    //   })
    // }
    this.getHistroy();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SearchPage');
    //console.log(this.productList);
  }

  getSerchList(infiniteScroll){
    console.log('keywords:'+this.keywords);

    if(!infiniteScroll){
      this.page = 1;
      this.hasData = true; 
      this.content.scrollToTop(0);
      this.saveHistroy();
    }
    var api = 'api/plist?search='+this.keywords+'&page='+this.page;
    this.httpServices.requestData(api,(data)=>{
      if(this.page==1){
        this.productList = data.result;
        //infiniteScroll.enable(true);
      }else{
        this.productList = this.productList.concat(data.result);
      }
    
    if(infiniteScroll){
      infiniteScroll.complete();
      if(this.productList.length<10){
        this.hasData = false;
      }
    }
    this.flag = true;
    this.page++;
    });
  }


  doLoadMore(infiniteScroll){
    this.getSerchList(infiniteScroll);
  }


  goSearch(keywords){
    this.keywords = keywords;
    this.getSerchList('');
  }

  //保存历史记录

  saveHistroy(){
    var history = this.storage.get('historyData');
    if(history){
      if(history.indexOf(this.keywords)==-1){
        history.push(this.keywords);
        this.storage.set('historyData',history);
      }else{

      }
    }else{
      this.historyList.push(this.keywords);
      this.storage.set('historyData',this.historyList);
    }
  }


  getHistroy(){
    var history = this.storage.get('historyData');
    if(history){
      this.historyList = history;
    }
  }

  removeHistory(keywords){

    let confirm = this.alertcv.create({
      title: '确认删除'+'"'+keywords+'"'+'?',
      message: '',
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
            var index = this.historyList.indexOf(keywords);
            this.historyList.splice(index,1);
            this.storage.set('historyData',this.historyList);
          }
        }
      ]
    });
    confirm.present();
  }

}
