import { Component, OnInit } from '@angular/core';
import { NavController, NavParams,  } from 'ionic-angular';
import { AuthService } from '../../app/shared/auth.service';
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

  constructor(
    private authService: AuthService,
    // private dialogRef: MdDialogRef<any>,
    ) { }

  ngOnInit() {}

  login() {
    this.authService.login(this.credentials).then(res => {
      // this.dialogRef.close();
      alert( 'เข้าระบบสำเร็จ' );
    }).catch(res => {
      let error = JSON.parse( res._body ).error;
      alert( error );
    });
  }

}
