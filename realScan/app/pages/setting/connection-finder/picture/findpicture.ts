import { Component, NgZone} from '@angular/core';
import {Events, NavController} from "ionic-angular/index";
import {FirebaseService} from "../../../../provider/firebase";
import {ProfilePage} from "../../../profile/profile";
import {ImagePicker, ImagePickerOptions, Camera, CameraPopoverOptions} from "ionic-native/dist/index";

declare var clarifaiApp:any;
declare var firebase:any;
declare var window;

@Component({
    templateUrl: 'build/pages/setting/connection-finder/picture/findpicture.html',
})
export class FindPicturePage{

  foundHim;
  FirebaseReturnedData;
  zone;
  options:ImagePickerOptions;

  constructor(private events: Events, private firebase: FirebaseService, private navCtrl: NavController) {



    this.zone = new NgZone({enableLongStackTrace: false});


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



    // this.searchImageByGivenUrl('https://lh6.googleusercontent.com/-90WQCTWl0Co/AAAAAAAAAAI/AAAAAAAAAAs/mPzUsSiQ0Mw/photo.jpg');

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
    console.log("went inside here");
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
        console.log(JSON.stringify(err));
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
    ImagePicker.getPictures(this.options).then((results) => {
      for (var i = 0; i < results.length; i++) {
        console.log('Image URI: ' + results[i]);
        let testFile = results[i];
        // console.log(testFile);

        let myBase64 = this.encodeImageUri(testFile);
        console.log(myBase64);
        firebase.storage().ref("images/bruh.jpg").putString(myBase64, 'base64url').then(function(snapshot) {
          console.log('Uploaded a base64 string!');
          console.log(snapshot);
        });

        // this.searchImageByGivenUrl(myBase64);
      }
    }, (err) => {
      console.log(JSON.stringify(err));
    });


    var options = {
      quality: 50,
      destinationType: Camera.DestinationType.DATA_URL,
      sourceType: Camera.PictureSourceType.PHOTOLIBRARY,
      allowEdit: true,
      encodingType: Camera.EncodingType.JPEG,
      targetWidth: 100,
      targetHeight: 100,
      saveToPhotoAlbum: false
    };
    // Camera.getPicture(options).then((imageData) => {
    //   // imageData is either a base64 encoded string or a file URI
    //   // If it's base64:
    //   let base64Image = 'data:image/jpeg;base64,' + imageData;
    //   console.log(base64Image);
    //     this.searchImageByGivenUrl(base64Image);
    // }, (err) => {
    //   console.log("FAILED");
    //   console.log(err);
    //   // Handle error
    // });


  }

  encodeImageUri(imageUri) {
  var c=document.createElement('canvas');
  var ctx=c.getContext("2d");
  var img=new Image();
  img.onload = function(){
    c.width=this.width;
    c.height=this.height;
    ctx.drawImage(img, 0,0);
  };
  img.src=imageUri;
  var dataURL = c.toDataURL("image/jpeg");
  return dataURL;
}





}
