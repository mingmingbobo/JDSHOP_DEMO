//mport { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { StorageProvider } from '../../providers/storage/storage';

import { Md5 } from "ts-md5/dist/md5";

/*
  Generated class for the ToolsProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ToolsProvider {

  constructor(public storage: StorageProvider) {
    console.log('Hello ToolsProvider Provider');
  }

  getUserInfo() {
    var temp = this.storage.get('userinfo');

    if (temp) {
      return temp;
    } else {
      return '';
    }

  }

  sign(json) {
    var temArr = [];

    for (let key in json) {
      temArr.push(key);
    }

    temArr.sort();
    var tempStr = '';
    for (let index = 0; index < temArr.length; index++) {
      tempStr += temArr[index] + json[temArr[index]];
    }
    return Md5.hashStr(tempStr);
  }

}
