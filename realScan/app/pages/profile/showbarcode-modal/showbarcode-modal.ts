import { Component, OnInit } from '@angular/core';
import {ViewController} from "ionic-angular";

@Component({
  templateUrl: 'build/pages/profile/showbarcode-modal/showbarcode-modal.html'
})
export class ShowBarcodeModal{

  constructor(private vControl: ViewController) { }

  dismissModal(){
    this.vControl.dismiss();
  }

}
