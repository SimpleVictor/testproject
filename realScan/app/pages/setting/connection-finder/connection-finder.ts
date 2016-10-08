import { Component, OnInit } from '@angular/core';
import {FindPicturePage} from "./picture/findpicture";
import {NavController} from "ionic-angular/index";


@Component({
    templateUrl: 'build/pages/setting/connection-finder/connection-finder.html',
})
export class ConnectionFinderPage{
    constructor(private navCtrl: NavController) { }

    ionViewLoaded(){

    }

  LookByPicutre(){
    this.navCtrl.push(FindPicturePage);
  }

}
