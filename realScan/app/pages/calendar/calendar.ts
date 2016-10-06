import { Component, OnInit } from '@angular/core';
import {MeetupService} from "../../provider/meetup";
import {LoadingController} from "ionic-angular/index";
import {MeetUpCategories} from "../../shared/meetup-categories";

@Component({
    templateUrl: 'build/pages/calendar/calendar.html'
})
export class CalendarPage{

    CheckLoader;


    constructor(private meetupservice_:MeetupService, private loadingCtrl: LoadingController, public meet_cate : MeetUpCategories) {

      console.log(this.meet_cate.myCat);
      console.log(this.meet_cate.myCat.length);

    }

    ionViewLoaded(){
      setTimeout(() => {
        this.CheckLoader = this.loadingCtrl.create(
          { content: "Grabbing local meet ups..." }
        );
        this.CheckLoader.present();
      }, 0);

      this.meetupservice_.testService().subscribe(
        (data) => {
          this.CheckLoader.dismiss();
          console.log(data);
        }, (err) => {
          this.CheckLoader.dismiss();
          console.log("There was an error");
          console.log(err);
        }
      );
    }

}
