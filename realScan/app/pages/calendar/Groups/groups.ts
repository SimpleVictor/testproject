import { Component, OnInit } from '@angular/core';
import {NavParams} from "ionic-angular/index";

@Component({
    templateUrl: 'build/pages/calendar/Groups/groups.html'
})
export class GroupsPage implements OnInit {

  groups;

  constructor(private params: NavParams) {
    this.groups = this.params.get("groups");
    console.log(this.groups);
  }

    ngOnInit() { }

}
