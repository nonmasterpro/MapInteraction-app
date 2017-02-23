import { Component, OnInit } from '@angular/core';
import { NavController } from 'ionic-angular';
import { ScheduleService } from '../../app/shared/schedule.service';
import { HomePage } from '../../pages/home/home';
import { ListSchedulePage } from '../../pages/list-schedule/list-schedule';
import { AuthService } from '../../app/shared/auth.service';
import { User } from '../../app/models/user';
import { Course } from '../../app/models/course';
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
  rootPage: any = ListSchedulePage;
  data: any;
  places:any;


  constructor(public navCtrl: NavController,
    private authService: AuthService,
    private scheduleService: ScheduleService,
    private userService: UserService,
    private placeService: PlaceService) {
   
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

  listN:any;
  onChange(type) {
    console.log(type);
    let listP = [];
    // console.log(this.places);
    _.forEach( this.places, (value) => {
      if (value.type===type)
        listP.push({'id':value.id,'name':value.name})
      })
  this.listN=listP;
  console.log(this.listN);
  }

listId: any;
  onChangeId(name){
console.log('id');
let pp = [];
    // console.log(this.places);
    _.forEach( this.places, (value) => {
      if (value.name===name)
        pp.push({'id':value.id,'name':value.name})
      }) 
this.listId=pp;
console.log(this.listId[0].id);
  }


  add() {
    this.credentials.userId = this.user.id;
    this.credentials.placeId = this.listId[0].id;
    this.scheduleService.add(this.credentials).then(res => {
      alert('Add Success');
      this.navCtrl.setRoot(ListSchedulePage)
    }).catch(res => {
      let error = JSON.parse(res._body).error;
      alert('Error');
    });
  }



}
