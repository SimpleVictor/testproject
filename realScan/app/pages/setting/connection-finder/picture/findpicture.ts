import { Component, NgZone} from '@angular/core';
import {Events, NavController} from "ionic-angular/index";
import {FirebaseService} from "../../../../provider/firebase";
import {ProfilePage} from "../../../profile/profile";
import {Camera} from "ionic-native/dist/index";

declare var clarifaiApp:any;

@Component({
    templateUrl: 'build/pages/setting/connection-finder/picture/findpicture.html',
})
export class FindPicturePage{

  foundHim;
  FirebaseReturnedData;
  zone;


  constructor(private events: Events, private firebase: FirebaseService, private navCtrl: NavController) {
    this.zone = new NgZone({enableLongStackTrace: false});
    console.log(Camera);


  }

  ionViewLoaded(){
    console.log("now");
    // clarifaiApp.inputs.create([
    //   {
    //     url: "https://lh6.googleusercontent.com/-6Bp5kizaIbk/AAAAAAAAAAI/AAAAAAAAAAo/CGko4_lAKMc/photo.jpg",
    //     id: '102173779155628086789'
    //   }
    // ]).then(
    //   function(response) {
    //     // do something with response
    //   },
    //   function(err) {
    //     // there was an error
    //   }
    // );



    this.searchImageByGivenUrl('https://lh6.googleusercontent.com/-90WQCTWl0Co/AAAAAAAAAAI/AAAAAAAAAAs/mPzUsSiQ0Mw/photo.jpg');

  }


  addPictureIntoClariDB(url){
        clarifaiApp.inputs.create([
          {
            url: url
          },
        ]).then(
          function(response) {
            console.log("Finish Adding Image!");
          },
          function(err) {
            console.log(err);
          }
        );
  }


  searchImageByGivenUrl(url){
    clarifaiApp.inputs.search({url: url}).then(
      (response) => {
        console.log(response);
        //HERE IT WOULD GIVE US THE PROBABLITY AND WE WOULD ITERATE THROUGH THEM TO SEE WHICH WOULD HAVE THE HIGHEST NUMBER

        this.zone.run(() => {
          this.foundHim = response[0];
          console.log(this.foundHim.imageUrl);
          this.GetID(this.foundHim.id);
        });

      },
      (err) => {
        console.log(err);
      }
    );
  }


  testPrint(){
    console.log(this.foundHim);
  }

  GetID(id){
    this.firebase.FindIDWithScan(id).subscribe(
      (data) => {
        console.log(data);
        this.FirebaseReturnedData = data;
      }, (err) => {
        console.log(err);
      }
    )
  }

  goToProfilePage(){
    this.navCtrl.push(ProfilePage, {ScannedUser: this.FirebaseReturnedData});
  }


  openPhoto(){
    console.log(Camera);
    // this.myCamera.getPicture().then((imageData) => {
    //   // imageData is either a base64 encoded string or a file URI
    //   // If it's base64:
    //   console.log(imageData);
    //   let base64Image = 'data:image/jpeg;base64,' + imageData;
    // }, (err) => {
    //   console.log("THERE WAS AN ERROR GETTING THE PICTURE")
    //   // Handle error
    // });
  }






}
