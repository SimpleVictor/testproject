import { Injectable } from '@angular/core';
import 'rxjs/operator/map';
import {Http, Headers, RequestOptions, Response} from "@angular/http";



@Injectable()
export class QrService{

    constructor(private http_ : Http) {

    }

    GenerateBarCodeForNewUser(id){
      console.log(id);
      let obj ={
        id : id
      };
      let body = JSON.stringify(obj);
      let headers = new Headers({ 'Content-Type': 'application/json' });
      let options = new RequestOptions({ headers: headers });
      return this.http_.post(`https://suitup1.herokuapp.com/users/generate`, body, options).map((res: Response) => res.json());
    }

}
