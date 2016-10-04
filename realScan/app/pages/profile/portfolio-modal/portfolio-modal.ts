import { Component, OnInit } from '@angular/core';
import {ViewController} from "ionic-angular";

@Component({
    templateUrl: 'build/pages/profile/portfolio-modal/portfolio-modal.html'
})
export class PortfolioModal implements OnInit {
    constructor(private vControl: ViewController) { }

    ngOnInit() { }

    dismissModal(){
      this.vControl.dismiss();
    }

}
