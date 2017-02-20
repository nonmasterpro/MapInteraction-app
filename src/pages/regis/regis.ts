import { Component, ViewEncapsulation } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { UserService } from '../../app/shared/user.service';
import { HomePage } from '../../pages/home/home';

/*
  Generated class for the Regis page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-regis',
  templateUrl: 'regis.html'
  // encapsulation: ViewEncapsulation.None
})
export class RegisPage {

   credentials = {
    'name':'',
    'email': '',
    'password': '',
    'roleName': 'user'
  };

  rootPage: any = HomePage;

  constructor(
    public navCtrl: NavController,
     private userService: UserService) {}

add() {
    this.userService.add(this.credentials).then(res => {
      alert( 'Registration Success' );
      this.navCtrl.setRoot(HomePage)
    }).catch(res => {
      let error = JSON.parse( res._body ).error;
      alert( 'Email is already used' );
    });
  }

}

  


