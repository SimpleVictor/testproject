import { Component } from '@angular/core';
import {NavController, LoadingController} from 'ionic-angular';
import {BarcodeScanner} from "ionic-native/dist/index";
import {BarcodeData} from "../home/home";
import {ScanPage} from "../scan/scan";
import {AuthService} from "../../provider/auth";
import {FirebaseService} from "../../provider/firebase";


declare var firebase;

@Component({
  templateUrl: 'build/pages/barcode/barcode.html',
})
export class BarcodePage {

  whichtab:string = "recent";
  profileID;
  BarcodeLoader;
  recentList;
  favoriteList;
  DeleteLoader;

  constructor(private navCtrl: NavController, private auth: AuthService, private loadingCtrl : LoadingController, private firebase_: FirebaseService) {
    let profile = this.auth.accounts;
    this.profileID = profile.clientID;
  }

  ionViewLoaded(){
    setTimeout(() => {
      this.BarcodeLoader = this.loadingCtrl.create(
        { content: "Please wait..." }
      );
      this.BarcodeLoader.present();
    }, 0);

    let barCodeRef = firebase.database().ref(`users/${this.profileID}/`);
    barCodeRef.on('value', (snapshot) => {
        let snap = snapshot.val();
        this.recentList = snap.scanned.recent;
        this.favoriteList = snap.scanned.favorite;
        console.log(this.recentList);
        console.log(this.favoriteList);
        let myDate = this.recentList[0].date_scanned;

      function timeDifference( date1, date2){
        var difference = date1 - date2;

        var daysDifference = Math.floor(difference / 1000 / 60 / 60 / 24);
        difference -= daysDifference * 1000 * 60 * 60 * 24

        var hoursDifference = Math.floor(difference / 1000 / 60 / 60);
        difference -= hoursDifference * 1000 * 60 * 60

        var minutesDifference = Math.floor(difference / 1000 / 60);
        difference -= minutesDifference * 1000 * 60

        var secondsDifference = Math.floor(difference / 1000);

        console.log('difference = ' + daysDifference + ' day/s ' + hoursDifference + ' hour/s ' + minutesDifference + ' minute/s ' + secondsDifference + ' second/s ');
      };

      timeDifference(1475747469326, Date.now());

      this.BarcodeLoader.dismiss();
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

  favoriteRecent(obj){
    this.auth.getAccounts((account) => {
      this.firebase_.AddRecentObjToFavorite(obj, account.clientID, account.scanned.favorite, account.scanned.recent).subscribe(
        (data) => {
          console.log("**************************************************");
          console.log(data);
          this.favoriteList = data.scanned.favorite;
        }, (err) => {
          console.log("There was an error getting a recent favorited...")
          console.log(err);
        }
      );
    })
  }

  deleteRecent(){

  }

  deleteFavorite(id){
    setTimeout(() => {
      this.DeleteLoader = this.loadingCtrl.create(
        { content: "Deleteing this scan...Please wait.." }
      );
      this.DeleteLoader.present();
    }, 0);


    for(let i = 0; i < this.favoriteList.length; i++){
      if(this.favoriteList[i].id === id){
        this.favoriteList.splice(i, 1);
        console.log(this.favoriteList);
        console.log("Current User ID: " +this.profileID);
        this.firebase_.DeleteFromFavorite(this.favoriteList, this.profileID, this.recentList).subscribe(
          (data) => {
            this.DeleteLoader.dismiss();
            console.log("Deleted Sucessfully");

            console.log(data);
          }, (err) => {
            this.DeleteLoader.dismiss();
            console.log(err);
            console.log("failed to delete!");
          }
        )
      };
      if(this.favoriteList.length - 1 === i){
        console.log("Either this was the last iteraiton or the method didn't find anything with that number");
      };
    };

  }

}
