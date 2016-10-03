import { Component } from '@angular/core';
import {Platform, ionicBootstrap, SqlStorage, Storage} from 'ionic-angular';
import {StatusBar, SQLite} from 'ionic-native';
import {LoginPage} from "./pages/login/login";
import {FirebaseService} from "./provider/firebase";
import {QrService} from "./provider/qrservice";
import {SQLStorage} from "./provider/sqlstorage";


@Component({
  template: '<ion-nav [root]="rootPage"></ion-nav>',
  providers: [FirebaseService, QrService, SQLStorage]
})
export class MyApp {

  public rootPage: any;


  constructor(private platform: Platform) {
    this.rootPage = LoginPage;



    platform.ready().then(() => {
      console.log(platform.platforms());
      let myPlat = platform.platforms();
      if(myPlat[0] === 'cordova'){
        console.log("You are deploying the app on an Iphone");
        let db = new SQLite();
        db.openDatabase({
          name: 'data.db',
          location: 'default'
        }).then(() => {
              db.executeSql("CREATE TABLE IF NOT EXISTS current_user (id INTEGER PRIMARY KEY AUTOINCREMENT, name text)", [])
                .then((data) => {
                  console.log("Table has been created : "+data);
                }, (error) => {
                  console.error("Unable to open database", error);
                });
        });
      }else{
        console.log("You are running your device on a Web Application");
        let storage = new Storage(SqlStorage);
        storage.query('CREATE TABLE IF NOT EXISTS current_user (id INTEGER PRIMARY KEY AUTOINCREMENT, food_id text, food_name text, is_saved text, is_recent text, is_scanned text)').then(
          result => {
            console.log(result);
            console.log("Created Table Successfully");
          }, err => {
            console.log("Failed Making Table BOoo");
            console.log(err);
          }
        );
      }
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      StatusBar.styleDefault();
    });
  }
}

ionicBootstrap(MyApp);
