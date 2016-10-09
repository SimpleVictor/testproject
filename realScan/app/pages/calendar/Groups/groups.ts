import { Component, OnInit } from '@angular/core';
import {NavParams} from "ionic-angular/index";

@Component({
    templateUrl: 'build/pages/calendar/Groups/groups.html'
})
export class GroupsPage implements OnInit {

  groups;
  newGroup:any[] = [];

  constructor(private params: NavParams) {
    this.groups = this.params.get("groups");
    console.log(this.groups);
    for(let i = 0; i < this.groups.length; i++){
      // console.log(this.groups[i].group_photo.photo_link);
      if(this.groups[i].group_photo){
        this.newGroup.push(this.groups[i]);
      }
    }
  }

    ngOnInit() { }



}
