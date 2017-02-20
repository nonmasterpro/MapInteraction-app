import { Component, OnInit } from '@angular/core';
import { NavController } from 'ionic-angular';
import { ScheduleService } from '../../app/shared/schedule.service';
import { HomePage } from '../../pages/home/home';
import { AuthService } from '../../app/shared/auth.service';
// import { User } from '../../app/models/user';
import { UserService } from '../../app/shared/user.service';
import { PlaceService } from '../../app/shared/place.service';
import _ from "lodash";



@Component({
  selector: 'page-schedule',
  templateUrl: 'schedule.html'
})
export class SchedulePage implements OnInit {
  //       public courseName: string,
  //       public day: number,
  //       public start: string,
  //       public end: string,
  //       public userId: number,
  //       public placeId: number,
  credentials = {
    'courseName': '',
    'day': '',
    'start': '',
    'end': '',
    'userId': '',
    'placeId': ''
  };
  user: any;
  rootPage: any = HomePage;
  data: any;
  places:any;


  constructor(public navCtrl: NavController,
    private authService: AuthService,
    private scheduleService: ScheduleService,
    private userService: UserService,
    private placeService: PlaceService) {
    //   this.authService.obMe.subscribe((user) => {
    //   console.log(user);
    //   this.user = user;
    //  });
  }

  ngOnInit() {
    this.authService.me();
    this.authService.obMe.subscribe((user) => {
    console.log(user);
    this.user = user;
    });
    // this.userService.all().then((res) => {
    //   this.data = res;
    //   console.log(res);
    // });

    this.placeService.all().then(res => {
      this.places=res;
      // console.log(res);

    })
  }

  // test(type) {
  //   let test1 =[];
  //   // console.log(this.places);
  //   _.forEach( this.places, (value) => {
  //     if (value.type===type)
  //       test1.push({'id':value.id,'name':value.name})
  //     })
  // console.log(test1);
  // return test1;
  // }

  onChange(type) {
    console.log(type);
    let listP =[];
    // console.log(this.places);
    _.forEach( this.places, (value) => {
      if (value.type===type)
        listP.push({'id':value.id,'name':value.name})
      })
  console.log(listP);
  return listP;
  }

  add() {
    this.credentials.userId = this.user.id;
    this.scheduleService.addS(this.credentials).then(res => {
      alert('Add Success');
      this.navCtrl.setRoot(HomePage)
    }).catch(res => {
      let error = JSON.parse(res._body).error;
      alert('Email is already used');
    });
  }



}
