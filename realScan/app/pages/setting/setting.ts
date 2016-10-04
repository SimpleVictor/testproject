import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import {SQLStorage} from "../../provider/sqlstorage";
import {BarcodeScanner} from "ionic-native/dist/index";
import {BarcodeData} from "../home/home";
import {ScanPage} from "../scan/scan";

/*
  Generated class for the SettingPage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  templateUrl: 'build/pages/setting/setting.html',
})
export class SettingPage {

  constructor(private navCtrl: NavController, private sqlstorage: SQLStorage) {

  }

  DeleteTableButton(){
    this.sqlstorage.DeleteTable().then(
      (data) => {
        console.log(`Deleted Table Successfully`);
        console.log(data);
      }, (err) => {
        console.log("Failed to delete table");
        console.log(err);
      })
  }

  activateScan(){
    console.log("works");
    BarcodeScanner.scan({
      "preferFrontCamera": false,
      "showFlipCameraButton" : true
    })
      .then((result) => {
        if (!result.cancelled) {
          const barcodeData = new BarcodeData(result.text, result.format);
          this.scanDetails(barcodeData);
        }
      })
      .catch((err) => {
        alert(err);
      })
  }

  scanDetails(details) {
    this.navCtrl.push(ScanPage, {details: details});
  }

}
