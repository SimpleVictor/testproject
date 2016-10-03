import { Injectable } from '@angular/core';
import {SQLite} from "ionic-native/dist/index";
import {Platform} from "ionic-angular/index";

@Injectable()
export class SQLStorage{

    devicePlatform;
    iosDB: SQLite;
    webDB;

    constructor(private platform: Platform) {
      this.devicePlatform = platform.platforms();
      console.log(this.devicePlatform);
    }

}
