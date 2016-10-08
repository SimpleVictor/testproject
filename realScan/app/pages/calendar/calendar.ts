import { Component, OnInit } from '@angular/core';
import {MeetupService} from "../../provider/meetup";
import {LoadingController, NavController} from "ionic-angular/index";
import {MeetUpCategories} from "../../shared/meetup-categories";
import {Geolocation} from "ionic-native";
import {GroupsPage} from "./Groups/groups";

@Component({
    templateUrl: 'build/pages/calendar/calendar.html'
})
export class CalendarPage{

    CheckLoader;
    myCat;

    constructor(private meetupservice_:MeetupService, private loadingCtrl: LoadingController, public meet_cate : MeetUpCategories, public navCtrl: NavController) {

    }

    ionViewLoaded(){
      this.myCat = this.meet_cate.myCat;
    }

  getEvent(id){
    setTimeout(() => {
      this.CheckLoader = this.loadingCtrl.create(
        { content: "Grabbing local meet ups..." }
      );
      this.CheckLoader.present();
    }, 0);
    let options = {timeout: 10000, enableHighAccuracy: true};
    Geolocation.getCurrentPosition(options).then((resp) => {
      let lat = resp.coords.latitude;
      let long = resp.coords.longitude;
      console.log(resp);
      this.meetupservice_.getGroupsById(id, lat, long).subscribe(
        (data) => {
          this.CheckLoader.dismiss();
          console.log(data);
          this.navCtrl.push(GroupsPage, {groups: data.results});
        }, err => {
          this.CheckLoader.dismiss();
          console.log(err);
        }
      );
    });
  }

}
