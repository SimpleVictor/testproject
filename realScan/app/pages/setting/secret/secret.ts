import {Component, NgZone} from '@angular/core';
import {NavController, Events} from 'ionic-angular';
import 'rxjs/operator/map';
import {Http, Response, Headers, RequestOptions} from "@angular/http";

declare var firebase:any;

@Component({
  templateUrl: 'build/pages/setting/secret/secret.html',
})
export class SecretPage {

  url;
  name;
  zone;
  constructor(private navCtrl: NavController, private http: Http, private events: Events) {

    this.zone = new NgZone({enableLongStackTrace: false});

    let valueChanged = firebase.database().ref('url');
    valueChanged.on('value', (snapshot) => {
      this.zone.run(() => {
        let obj = snapshot.val();
        this.url = obj.url;
        this.name = obj.name;
        console.log(obj);
      })
    });

  }

  steveButton(){
    this.url = "http://static5.businessinsider.com/image/54ff07ea6da8111c6feb1ed8-960/steve-jobs.jpg";
    this.name = "Steve Jobs";
    this.callFirebase(this.url, this.name);
  }

  billButton(){
    this.url = "http://d3dql2kihuy2db.cloudfront.net/wp-content/uploads/2015/07/Bill-Gates.jpg";
    this.name = "Bill Gates";
    this.callFirebase(this.url, this.name);
  }

  jeffButton(){
    this.url = "http://static.economic.bg/news/6/58031/item_item7.jpg";
    this.name = "Jeff Bezos";
    this.callFirebase(this.url, this.name);
  }

  markButton(){
    this.url = "https://s-media-cache-ak0.pinimg.com/originals/e1/da/9e/e1da9e6138617ada6522ce477414b4dc.jpg";
    this.name ="Mark Z"
    this.callFirebase(this.url, this.name);
  }

  randomButton(){
    this.url="http://www.bigshocking.com/wp-content/uploads/2014/10/Stare-at-a-Random-Person.jpg";
    this.name = "randomguy";
    this.callFirebase(this.url, this.name);
  }

  callFirebase(url, name){
    let obj = {
      url: url,
      name: name
    };
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    this.http.patch(`https://wowme-3c87e.firebaseio.com/url/.json`, JSON.stringify(obj), options).map((res:Response) => res.json()).subscribe(
      (data) => {
        console.log("Sucess");
        console.log(data);
      }, (err) => {
        console.log(err);
      }
    );

  }


}
