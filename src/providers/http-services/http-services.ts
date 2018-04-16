import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import {Http,Jsonp,Headers} from "@angular/http";

import 'rxjs/add/operator/map';

//配置文件
import { ConfigProvider } from '../../providers/config/config';

/*
  Generated class for the HttpServicesProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class HttpServicesProvider {

  private headers = new Headers({'Content-Type': 'application/json'});

  constructor(public http: Http, public jsonp: Jsonp, public config: ConfigProvider) {

  }

  requestData(apiUrl, callback) {
    var api;
    if (apiUrl.indexOf('?') == -1) {
       api = this.config.apiUrl + apiUrl + '?callback=JSONP_CALLBACK';
    } else {
       api = this.config.apiUrl + apiUrl + '&callback=JSONP_CALLBACK';
    }

    console.log(api);

    this.jsonp.get(api).subscribe(function (data) {
      callback(data['_body']);
    }, function (err) {
      console.log(err);
    })

  }

  doPost(apiUrl, json, callback){
    var api = this.config.apiUrl+apiUrl;
    console.log('post json:'+JSON.stringify(json));
    this.http.post(api,JSON.stringify(json),{headers:this.headers}).subscribe(function (res){
      //console.log('doPost res:'+res.json());
      callback(res.json());
    });
  }

}
