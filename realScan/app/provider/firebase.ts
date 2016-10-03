import {Injectable, NgZone} from '@angular/core';
import {Events, NavController} from "ionic-angular";

import { tokenNotExpired } from 'angular2-jwt';
import {TabsPage} from "../pages/tabs/tabs";

declare var firebase;

@Injectable()
export class FirebaseService {

  users;

  zone;

    constructor(private events: Events) {
      this.zone = new NgZone({enableLongStackTrace: false});




      let valueChanged = firebase.database().ref('users/');
      valueChanged.on('value', (snapshot) => {
        this.zone.run(() => {
          this.users = snapshot.val();
          console.log("bang bang");
          console.log(this.users);
        })
      });
    }

    public authenticateUser(credentials, callback) {
      console.log(this.users);
      if (this.users) {
        Object.keys(this.users).forEach((myKey) => {
          console.log(this.users[myKey]);
          console.log(credentials);
          if (this.users[myKey].username === credentials.username && this.users[myKey].password === credentials.password) {
            localStorage.setItem('id_tokens', myKey);
            console.log("Password is correct");
            callback(true);
          } else {
            console.log("Password is INCORRECT");
            callback(false);
            return false;
          }
        });
      }
    }

  public logout() {
    // Remove token from localStorage
    localStorage.removeItem('id_tokens');
  };

  public checkAuth(callback){
    if(localStorage.getItem("id_tokens")){
      callback(true, localStorage.getItem("id_tokens"));
    }else{
      callback(false);
    }
  }

}
