import {Component, OnInit} from '@angular/core';
import { NavController } from 'ionic-angular';
import {FirebaseService} from "../../provider/firebase";
import {TabsPage} from "../tabs/tabs";


@Component({
  selector: 'page-login',
  templateUrl: 'build/pages/login/login.html'
})
export class LoginPage implements OnInit{

  credentials = {
    username: "",
    password: ""
  };

  constructor(public navCtrl: NavController, public firebase_ : FirebaseService) {
  }

  ngOnInit(){
    this.firebase_.checkAuth((value, id) => {
      if(value){
        this.navCtrl.push(TabsPage, {id: id});
      }
    })
  }

  ionViewDidLoad() {}

  loginUser() {
    this.firebase_.authenticateUser(this.credentials, (value) => {
      console.log(value);
      if(value){
        console.log("Success!");
        this.navCtrl.push(TabsPage);
      }else{
        console.log("Wrong pass!");
      }
    });
  }



}
