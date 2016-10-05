import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import {BarcodeScanner} from "ionic-native/dist/index";
import {BarcodeData} from "../home/home";
import {ScanPage} from "../scan/scan";

@Component({
  templateUrl: 'build/pages/barcode/barcode.html',
})
export class BarcodePage {

  whichtab:string = "recent";

  constructor(private navCtrl: NavController) {

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
