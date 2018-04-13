//import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

/*
  Generated class for the ConfigProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ConfigProvider {

   //api请求地址
  public apiUrl="http://39.108.159.135/";
  constructor() {
    console.log('Hello ConfigProvider Provider');
  }

  run(){
    console.log("run provider");
  }

}
