import { Injectable } from '@angular/core';
import 'rxjs/operator/map';
import {Http, Response, Headers, RequestOptions} from "@angular/http";
import {Platform} from "ionic-angular/index";

@Injectable()
export class MeetupService {

    apiKey = "643e6d4c1554f483922e72b5a6a1b";

    isMobile;
    iosDB;
    webDB;

    constructor(private http_ : Http, private platform: Platform) {
      let whichPlat = platform.platforms();
      if(whichPlat[0] === 'cordova'){
        this.isMobile = true;
        console.log("You're on the iphone");
      }else{
        console.log("You're on the web")
      }
    }

    testService(){

      if(this.isMobile){
        let url =`https://api.meetup.com/2/groups.json?key=${this.apiKey}&sign=true&lat=40.5792700&lon=-74.4115400&category_id=34&page=20`;
        console.log(url);
        let headers = new Headers({ 'Content-Type': 'application/json' });
        headers.append('Allow-Access-Control-Origin', '*');
        // headers.append('Authorization', `Bearer ${authToken}`);
        // headers.append('')
        let options = new RequestOptions({ headers: headers });
        return this.http_.get(url, options).map((res:Response) => res.json());
      }else{
        return this.http_.get("https://suitup1.herokuapp.com/users/meetup").map((res:Response) => res.json());
      }
    }


}
