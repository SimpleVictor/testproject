import {Injectable, NgZone} from '@angular/core';
import {Events, NavController} from "ionic-angular";
import {Http, Response, Headers, RequestOptions} from "@angular/http";
import 'rxjs/Rx';

declare var firebase;

@Injectable()
export class FirebaseService {

  users;

  zone;

    constructor(private events: Events, private http_ : Http) {
      this.zone = new NgZone({enableLongStackTrace: false});

      // let valueChanged = firebase.database().ref('users/');
      // valueChanged.on('value', (snapshot) => {
      //   this.zone.run(() => {
      //     this.users = snapshot.val();
      //     console.log("bang bang");
      //     console.log(this.users);
      //   })
      // });
    }

    CheckForFirstTimeLogin(id){
      console.log(id);
      return this.http_.get(`https://wowme-3c87e.firebaseio.com/users/${id}/.json`).map((res: Response) => res.json());
    }

    CreateUserAccount(obj){
      let body = JSON.stringify(obj);
      let headers = new Headers({ 'Content-Type': 'application/json' });
      let options = new RequestOptions({ headers: headers });
      return this.http_.put(`https://wowme-3c87e.firebaseio.com/users/${obj.clientID}/.json`, body, options).map((res: Response) => res.json());
    }

    FindIDWithScan(id){
      return this.http_.get(`https://wowme-3c87e.firebaseio.com/users/${id}/.json`).map((res:Response) => res.json());
    }

    AddScanIDIntoRecent(currentID, newUser, currentTotalConnections, currentRecents, currentFavorites,lat, long){
      let newRecents = currentRecents;

      let recentObj = {
        id: newUser.id,
        date_scanned: Date.now(),
        lat: lat,
        long: long,
        name: newUser.name,
        picture: newUser.picture
      };

      if(newRecents[0] === 'bruh'){
        newRecents.splice(0,1);
        newRecents.push(recentObj);
      }else{
        newRecents.push(recentObj);
      }

      let obj = {
        total_connections: currentTotalConnections + 1,
        scanned: {
          favorite: currentFavorites,
          recent: newRecents
        }
      };

      let body = JSON.stringify(obj);
      let headers = new Headers({ 'Content-Type': 'application/json' });
      let options = new RequestOptions({ headers: headers });
      return this.http_.patch(`https://wowme-3c87e.firebaseio.com/users/${currentID}/.json`, body, options).map((res:Response) => res.json());
    }

    AddRecentObjToFavorite(obj, id ,OriginalFavorite , oldRecent){
      console.log(obj);
      if(OriginalFavorite[0] === ''){
        OriginalFavorite.splice(0,1);
        OriginalFavorite.push(obj);
      }else{
        OriginalFavorite.push(obj);
      }

      let mainObj = {
        scanned: {
          favorite: OriginalFavorite,
          recent: oldRecent
        }
      };

      let body = JSON.stringify(mainObj);
      let headers = new Headers({ 'Content-Type': 'application/json' });
      let options = new RequestOptions({ headers: headers });
      return this.http_.patch(`https://wowme-3c87e.firebaseio.com/users/${id}/.json`, body, options).map((res:Response) => res.json());
    }




}
