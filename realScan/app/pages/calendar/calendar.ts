import { Component, OnInit } from '@angular/core';
import {MeetupService} from "../../provider/meetup";
import {LoadingController} from "ionic-angular/index";

@Component({
    templateUrl: 'build/pages/calendar/calendar.html'
})
export class CalendarPage{

    CheckLoader;


    constructor(private meetupservice_:MeetupService, private loadingCtrl: LoadingController) { }

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
