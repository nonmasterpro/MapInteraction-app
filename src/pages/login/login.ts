import { Component, OnInit } from '@angular/core';
import { NavController, NavParams,  } from 'ionic-angular';
import { AuthService } from '../../app/shared/auth.service';
import { HomePage } from '../../pages/home/home';

// import { MdDialogRef } from '@angular/material';

/*
  Generated class for the Login page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/

@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
// export class LoginPage {

//   constructor(public navCtrl: NavController, public navParams: NavParams) {}

//   ionViewDidLoad() {
//     console.log('ionViewDidLoad LoginPage');
//   }

// }

export class LoginPage implements OnInit {

  credentials = {
    'email': '',
    'password': ''
  };

  rootPage: any = HomePage;

  constructor(
    private authService: AuthService,
    public navCtrl: NavController
    ) { }

  ngOnInit() {}

  login() {
    this.authService.login(this.credentials).then(res => {
      alert( 'Log in Success' );
      this.navCtrl.setRoot(HomePage)
    }).catch(res => {
      let error = JSON.parse( res._body ).error;
      alert( 'Email or Password is invalid' );
    });
  }

}
