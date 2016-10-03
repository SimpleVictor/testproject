import { Component } from '@angular/core';
import { HomePage } from '../home/home';
import {SettingPage} from "../setting/setting";
import {BarcodePage} from "../barcode/barcode";
import {ProfilePage} from "../profile/profile";
import {NavParams} from "ionic-angular/index";
import {QrService} from "../../provider/qrservice";


@Component({
  templateUrl: 'build/pages/tabs/tabs.html'
})
export class TabsPage {

  public tab1Root: any;
  public tab2Root: any;
  public tab3Root: any;
  public tab4Root: any;

  constructor(private params: NavParams, private my_service: QrService) {

    // this tells the tabs component which Pages
    // should be each tab's root Page
    this.tab1Root = HomePage;
    this.tab2Root = ProfilePage;
    this.tab3Root = BarcodePage;
    this.tab4Root = SettingPage;
  }
}
