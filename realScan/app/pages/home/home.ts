import {Component} from '@angular/core';
import {NavController, LoadingController} from 'ionic-angular';
import {BarcodeScanner} from 'ionic-native';
import {ScanPage} from "../scan/scan";
import {QrService} from "../../provider/qrservice";

export class BarcodeData {
  constructor(
    public text: String,
    public format: String
  ) {}
}

@Component({
  templateUrl: 'build/pages/home/home.html'
})
export class HomePage{

  user;
  loader;

  constructor(public navCtrl: NavController, private qr : QrService, private loadingCtrl: LoadingController) {
  }

  ionViewLoaded(){
    // setTimeout(() => {
    //   this.loader = this.loadingCtrl.create(
    //     { content: "Please wait..." }
    //   );
    //   this.loader.present();
    // }, 0);
  }

  ionViewDidEnter(){
    this.qr.getUserData(localStorage.getItem("id_tokens"), (value) => {
      this.user = value;
      console.log(this.user);
      // this.loader.dismiss();
    });
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




  testData(){
    console.log(this.user);
  }

}
