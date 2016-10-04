import { Component, OnInit } from '@angular/core';
import {ViewController} from "ionic-angular";

@Component({
  templateUrl: 'build/pages/profile/work-modal/work-modal.html'
})
export class WorkModal implements OnInit {
  constructor(private vControl: ViewController) { }

  ngOnInit() { }

  dismissModal(){
    this.vControl.dismiss();
  }

}
