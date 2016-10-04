import { Component, OnInit } from '@angular/core';
import {ViewController} from "ionic-angular";

@Component({
    templateUrl: 'build/pages/profile/map-modal/map-modal.html'
})
export class MapModal{

    constructor(private vControl: ViewController) { }

    dismissModal(){
      this.vControl.dismiss();
    }

}
