import { Component, OnInit } from '@angular/core';
import {MeetupService} from "../../provider/meetup";

@Component({
    templateUrl: 'build/pages/calendar/calendar.html'
})
export class CalendarPage{
    constructor(private meetupservice_:MeetupService) { }

    ionViewLoaded(){
      this.meetupservice_.testService().subscribe(
        (data) => {
          console.log(data);
        }, (err) => {
          console.log("There was an error");
          console.log(err);
        }
      );
    }

}
