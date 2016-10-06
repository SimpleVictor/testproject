import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import {SQLStorage} from "../../provider/sqlstorage";
import {BarcodeScanner, Geolocation} from "ionic-native";
import {BarcodeData} from "../home/home";
import {ScanPage} from "../scan/scan";
import {AuthService} from "../../provider/auth";
import {MeetUpCategories} from "../../shared/meetup-categories";

/*
  Generated class for the SettingPage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  templateUrl: 'build/pages/setting/setting.html',
})
export class SettingPage {

  constructor(private navCtrl: NavController, private sqlstorage: SQLStorage, private auth: AuthService, private meetup_category: MeetUpCategories) {
    // let options = {timeout: 10000, enableHighAccuracy: true};
    // Geolocation.getCurrentPosition().then((resp) => {
    //   console.log(resp);
    // })
    //
    // let watch = Geolocation.watchPosition(options);
    // watch.subscribe((data) => {
    //   // data.coords.latitude
    //   // data.coords.longitude
    //   console.log(data);
    // })


    console.log(this.meetup_category.myCat);
    console.log(this.meetup_category.myCat.length);


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
