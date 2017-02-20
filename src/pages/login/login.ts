import { Component, OnInit } from '@angular/core';
import { NavController } from 'ionic-angular';
import { AuthService } from '../../app/shared/auth.service';
import { HomePage } from '../../pages/home/home';



@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})


export class LoginPage implements OnInit {
user : any;
  credentials = {
    'email': '',
    'password': ''
  };

  rootPage: any = HomePage;

  constructor(
    private authService: AuthService,
    public navCtrl: NavController
    ) { }

  ngOnInit() {
//     this.authService.obMe.subscribe((user) => {
// console.log(user);
// this.user = user;
// });
}

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
