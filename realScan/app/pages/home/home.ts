import {Component} from '@angular/core';
import {NavController, LoadingController} from 'ionic-angular';
import {BarcodeScanner} from 'ionic-native';
import {ScanPage} from "../scan/scan";
import {QrService} from "../../provider/qrservice";
import {AuthService} from "../../provider/auth";
import {FirebaseService} from "../../provider/firebase";

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

  CheckLoader;
  FirstTimeLoader;
  BarCodeLoader;

  profile;

  constructor(public navCtrl: NavController, private qr : QrService, private loadingCtrl: LoadingController, private auth: AuthService, private firebase_ : FirebaseService) {
  }

  ionViewLoaded(){
    // setTimeout(() => {
    //   this.CheckLoader = this.loadingCtrl.create(
    //     { content: "Please wait..." }
    //   );
    //   this.CheckLoader.present();
    // }, 0);

    let profile = JSON.parse(localStorage.getItem("profile"));
    console.log(profile);
    let mainID = profile.identities[0].user_id;

    this.firebase_.CheckForFirstTimeLogin(mainID).subscribe(
      (data) => {
        // this.CheckLoader.dismiss();
        console.log(data);
        this.profile = data;
        this.auth.setAccounts(data);
        if(data === null){
          setTimeout(() => {
            this.FirstTimeLoader = this.loadingCtrl.create(
              { content: "Making An Account For You..." }
            );
            this.FirstTimeLoader.present();
          }, 0);
          let obj = {
            email: profile.email,
            clientID: mainID,
            barcode_id: mainID,
            barcode_url: `https://suitup1.herokuapp.com/${mainID}.png`,
            total_connections: "",
            scanned: {
              recent: [""],
              favorite: [""]
            },
            contact: {
              name: profile.name,
              picture: profile.picture,
              phone: "",
              location: "",
              resume_pdf_url: "",
              birthday: "",
              university: "",
              map_connections: [
                {
                  long: "",
                  lat: "",
                  date: "",
                  id: ""
                }
              ]
            },
            portfolio: [
              {
                picture_url: "",
                title: "",
                description: ""
              }
            ],
            work: [
              {
                picture: "",
                description: "",
                company: "",
                job_title: "",
                start_date: "",
                end_date: "",
                is_current: "",
                company_phone_number: ""
              }
            ],
            social: {
              facebook: "",
              twitter: "",
              linkedin: "",
              youtube: "",
              github: "",
              instagram: "",
              snapchat: "",
              pinterest: "",
              dropbox: ""
            }
          };

          this.firebase_.CreateUserAccount(obj).subscribe(
            (data) => {
              console.log(`Created your account successfully!`);
              console.log(data);
              this.FirstTimeLoader.dismiss();

              setTimeout(() => {
                this.FirstTimeLoader = this.loadingCtrl.create(
                  { content: "Generating A Barcode For You...!" }
                );
                this.FirstTimeLoader.present();
              }, 0);

              this.qr.GenerateBarCodeForNewUser(data.barcode_id).subscribe(
                (data) => {
                  console.log("Sucessfully Created the Barcode");
                  console.log(data);
                  this.profile = data;
                  this.auth.setAccounts(data);
                  this.FirstTimeLoader.dismiss();
                }, (err) => {
                  console.log("Problem On The ServerSide when Creating the Barcode");
                  console.log(err);
                  this.FirstTimeLoader.dismiss();
                }
              )

            }, (err) => {
              console.log(`There was an error making the account`);
              console.log(err);
              this.FirstTimeLoader.dismiss();
            }
          );

        }
      }, (err) => {
        this.CheckLoader.dismiss();
        console.log(err);
      }
    )

  }

  ionViewDidEnter(){
      // this.loader.dismiss();
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
