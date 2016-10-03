import { Injectable } from '@angular/core';
import 'rxjs/operator/map';
import {Http} from "@angular/http";

declare var firebase;

@Injectable()
export class QrService{

    url = "123";
    mainId;
    userData;

    constructor(private http : Http) {

    }

    sendData(obj){
      console.log(obj);
    }

    getUserData(id, callback){
      this.mainId = id;
      let myValue = firebase.database().ref(`${this.mainId}/`);
      myValue.on("value", (snap) => {
        this.userData = snap.val();
        callback(this.userData);
        console.log(this.userData);
      })

    }

}
