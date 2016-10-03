import { Injectable } from '@angular/core';
import {Platform, SqlStorage, Storage} from "ionic-angular/index";
import {SQLite} from "ionic-native/dist/index";

@Injectable()
export class SQLStorage{

    isMobile;
    iosDB;
    webDB;

    constructor(private platform: Platform) {
      let whichPlat = platform.platforms;
      if(whichPlat[0] === 'cordova'){
        this.isMobile = true;
        this.iosDB = new SQLite();
      }else{
        this.webDB = new Storage(SqlStorage);
      }
    }

    DeleteTable(){
      if(this.isMobile){
        return this.iosDB.executeSql(`DROP TABLE IF EXISTS current_user`, {});
      }else{
        return this.webDB.query(`DROP TABLE IF EXISTS current_user`);
      }
    }




}
