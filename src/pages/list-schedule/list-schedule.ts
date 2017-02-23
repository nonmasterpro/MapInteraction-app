import { Component, OnInit } from '@angular/core';
import { NavController } from 'ionic-angular';
import { ScheduleService } from '../../app/shared/schedule.service';
import { HomePage } from '../../pages/home/home';
import { AuthService } from '../../app/shared/auth.service';
import { User } from '../../app/models/user';
import { Course } from '../../app/models/course';
import { UserService } from '../../app/shared/user.service';
import { PlaceService } from '../../app/shared/place.service';
import _ from "lodash";

/*
  Generated class for the ListSchedule page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-list-schedule',
  templateUrl: 'list-schedule.html'
})
export class ListSchedulePage implements OnInit{

  user:any;
  place:any;
  alluser:any;
  allsche:any;
  daysche:any;

  Days = ["Mon","Tue","Wed","Thu","Fri","Sat","Sun"];

  Day = [
    {
      'id':1,
      'name':"Monday"
    },
     {
      'id':2,
      'name':"Tuesday"
    },
     {
      'id':3,
      'name':"Wednesday"
    },
     {
      'id':4,
      'name':"Thursday"
    },
     {
      'id':5,
      'name':"Friday"
    },
     {
      'id':6,
      'name':"Saturday"
    },
     {
      'id':7,
      'name':"Sunday"
    }
  ]

  headers = [{
          'prop': 'no',
          'type': 'text',
          'name': 'No.'
        },{
          'prop': 'day',
          'type': 'text',
          'name': 'Day'
        },
        {
          'prop': 'name',
          'type': 'text',
          'name': 'Name',
          'maxWidth': '10'
        },
        {
          'prop': 'start',
          'type': 'text',
          'name': 'Time Start'
        },
        {
          'prop': 'end',
          'type': 'text',
          'name': 'Time End'
        },
        {
          'prop': 'place',
          'type': 'text',
          'name': 'Place'
        }
      ];

  constructor(public navCtrl: NavController,
    private authService: AuthService,
    private scheduleService: ScheduleService,
    private userService: UserService,
    private placeService: PlaceService) {

    }

  ngOnInit(){
    this.authService.me();
    this.authService.obMe.subscribe((user) => {
    this.user = user;

    this.scheduleService.all(this.user.id).then(res => {
    this.allsche=res;
    console.log(this.allsche);
    })

    });
    
    this.placeService.all().then(res => {
    this.place=res;
    })
  
    
  }

  delete(id) {
   this.scheduleService.delete(id).then((res) => {
      location.reload();
    }, (error) => {
      console.log(error);
    });
  }

  // DDD(){
  //    let listD = [];
  //   _.forEach(this.Day, (value) => {
  //     if (value.id === this.allsche.day)
  //       listD.push({ 'day': value.name})
  //   })
  //   this.daysche = listD;
  //   console.log(listD);
  // }

// AAA(){
// let listD = [];
// for(let i=0;i<this.allsche.length;i++){
//      if (this.Day[i].id === this.allsche[i].day)
//         listD.push({ 'day': this.Day[i].name})
// }
// this.daysche = listD;
//     console.log(listD);
// }

}
