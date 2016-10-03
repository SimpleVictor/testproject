import {Component, provide} from '@angular/core';
import {Platform, ionicBootstrap, SqlStorage, Storage} from 'ionic-angular';
import {StatusBar, SQLite} from 'ionic-native';
import {LoginPage} from "./pages/login/login";
import {FirebaseService} from "./provider/firebase";
import {QrService} from "./provider/qrservice";
import {SQLStorage} from "./provider/sqlstorage";
import {AuthService} from "./provider/auth";
import {Http} from "@angular/http";
import {AuthConfig, AuthHttp} from "angular2-jwt";


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
                  console.log("Table has been created : "+JSON.stringify(data));
                }, (error) => {
                  console.error("Unable to open database", error);
                });
        });
      }else{
        console.log("You are running your device on a Web Application");
        let storage = new Storage(SqlStorage);
        storage.query('CREATE TABLE IF NOT EXISTS current_user (id INTEGER PRIMARY KEY AUTOINCREMENT, name text)').then(
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

ionicBootstrap(MyApp, [
  provide(AuthHttp, {
    useFactory: (http) => {
      return new AuthHttp(new AuthConfig({noJwtError: true}), http);
    },
    deps: [Http]
  }),
  AuthService
]);
