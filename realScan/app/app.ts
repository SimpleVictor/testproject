import {Component, provide} from '@angular/core';
import {Platform, ionicBootstrap, SqlStorage, Storage, MenuController} from 'ionic-angular';
import {StatusBar, SQLite} from 'ionic-native';
import {LoginPage} from "./pages/login/login";
import {FirebaseService} from "./provider/firebase";
import {QrService} from "./provider/qrservice";
import {SQLStorage} from "./provider/sqlstorage";
import {AuthService} from "./provider/auth";
import {Http} from "@angular/http";
import {AuthConfig, AuthHttp} from "angular2-jwt";
import {TabsPage} from "./pages/tabs/tabs";
import {MeetupService} from "./provider/meetup";


@Component({
  providers: [FirebaseService, QrService, SQLStorage, AuthService, MeetupService],
  template: `
<ion-menu [content]="content">
  <ion-toolbar>
    <ion-title>Pages</ion-title>
  </ion-toolbar>
  <ion-content>
    <ion-list>
      <button ion-item (click)="openPage(loginPage)">
        Login
      </button>
      <button ion-item (click)="openPage(signupPage)">
        Signup
      </button>
    </ion-list>
  </ion-content>
</ion-menu>


<ion-nav #content [root]="rootPage"></ion-nav>
`
})
export class MyApp {

  public rootPage: any;


  constructor(private platform: Platform, private menu: MenuController) {
    this.rootPage = TabsPage;
    menu.enable(true);

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
  })
]);
