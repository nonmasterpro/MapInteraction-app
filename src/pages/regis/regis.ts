import { Component, ViewEncapsulation, OnInit } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { UserService } from '../../app/shared/user.service';
import { HomePage } from '../../pages/home/home';

import { FormGroup,FormControl,Validators,FormBuilder} from '@angular/forms';
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
export class RegisPage implements OnInit{

    formManage: FormGroup;
todo:FormGroup;

   credentials = {
    'name':'',
    'email': '',
    'password': '',
    'roleName': 'user'
  };
  
  rootPage: any = HomePage;

  constructor(
    public navCtrl: NavController,
     private userService: UserService,
     private formBuilder: FormBuilder) {

    this.todo = this.formBuilder.group({
      name: ['', [<any>Validators.required,  Validators.minLength(4)]],
      email: ['', [<any>Validators.required, <any>Validators.pattern('([a-zA-Z0-9\.]+)@([a-zA-Z0-9])+[.]([a-zA-Z]{2,4})')]],
      password: ['', [<any>Validators.required,  Validators.minLength(4)]]
    });

     }

ngOnInit(){
  
}

setupForm() {
      this.formManage = new FormGroup({
      name: new FormControl('',[<any>Validators.required,  Validators.minLength(4)]),
      emails:  new FormControl('', [<any>Validators.required, <any>Validators.pattern('([a-zA-Z0-9\.]+)@([a-zA-Z0-9]+\.)([a-zA-Z]{2,4})')]),    
      passwords: new FormControl('',[<any>Validators.required,  Validators.minLength(4)])
    });
    
  
  }

add() {
    this.userService.add(this.credentials).then(res => {
      alert( 'Registration Success' );
      this.navCtrl.setRoot(HomePage)
    }).catch(res => {
      let error = JSON.parse( res._body ).error;
      alert( 'Email is already used' );
    });
  }

cancel(){
      this.navCtrl.setRoot(HomePage)
  
}

}

  


