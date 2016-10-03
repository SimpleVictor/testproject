import {Component, OnInit } from '@angular/core';
import { NavController } from 'ionic-angular';
import {AuthService} from "../../provider/auth";
import {TabsPage} from "../tabs/tabs";


@Component({
  selector: 'page-login',
  templateUrl: 'build/pages/login/login.html'
})
export class LoginPage implements OnInit {

  constructor(public navCtrl: NavController, private auth: AuthService) {


  }

  ngOnInit(){
    if(this.auth.authenticated()){
      this.navCtrl.push(TabsPage);
    }

  }

  loginUser() {
    // this.firebase_.authenticateUser(this.credentials, (value) => {
    //   console.log(value);
    //   if(value){
    //     console.log("Success!");
    //     this.navCtrl.push(TabsPage);
    //   }else{
    //     console.log("Wrong pass!");
    //   }
    // });
  }



}
