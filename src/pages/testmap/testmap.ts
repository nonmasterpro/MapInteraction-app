import { Component, OnInit } from '@angular/core';
import { NavController, Platform } from 'ionic-angular';
import $ from 'jquery';
import { AuthService } from '../../app/shared/auth.service';
import { ScheduleService } from '../../app/shared/schedule.service';
import { PlaceService } from '../../app/shared/place.service';
import { SchedulePage } from '../../pages/schedule/schedule';

import _ from 'lodash';

// import $ from 'jquery';

// import $  from '../../../bower_components/jquery-skeduler/jquery.skeduler.js';

declare var google;

@Component({
  selector: 'page-testmap',
  templateUrl: 'testmap.html'
})
export class TestmapPage implements OnInit{
  user: any;
  allsche:any;
  constantDate: any;
  day: any;
  timeS: any;
  timeE: any;
  syntaxTime:any;
  subject: any;
  schedules: any;
  start: any;
  end: any;
  title: any;
  place: any;
  allInfo = [];
  eventss = [];

  alluser:any;
  daysche:any;

  rootPage: any = SchedulePage;
  Days = ["Mon","Tue","Wed","Thu","Fri","Sat","Sun"];
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



  constructor(private platform: Platform,
    private authService: AuthService,
    private scheduleService: ScheduleService,
    private placeService : PlaceService,
    public nav: NavController,
    public navCtrl: NavController
) {
      

  }
  

  calendarOptions: Object = {
    header: {
      left: '',
      center: 'agendaSevenDay',
      right: ''
    },
    defaultView: "agendaSevenDay",
    views: {
      agendaSevenDay: {
        type: 'agenda',
        duration: { days: 7 },
        buttonText: 'Schedule'
      }
    },
  
    eventClick: function(event) {
        if (event.url) {
            window.open(event.url);
            return false;
        }else{
          alert("this.title");
        }
    },
    allDaySlot: false,
    height: 'parent',
    fixedWeekCount: false,
    minTime: '00:00:00',
    maxTime: '24:00:00',
    columnFormat: 'ddd',
    defaultDate: '2017-05-7',
    firstDay: 0,
    editable: false,
    // dragScroll:false,
    eventLimit: true, // allow "more" link when too many events
    events: this.eventss
    
    // ()=>{
    //   let tempEvents=[];
    //   _.forEach(this.allsche,(value)=>{
    //     return value.events;
    //   })
    //   return tempEvents;
    // }
  };

  ngOnInit(){
    this.authService.me();
    this.authService.obMe.subscribe((user) => {
    // console.log(user);
    this.user = user;

    this.scheduleService.all(this.user.id).then(res => {
    this.allsche=res;
    // console.log(this.allsche);


    this.constantDate = '2017-05-0';
    // this.title = 'OOAD';
    // this.place = 'CAMT';
    // this.day = 3;
    // this.timeS = '12:00';
    // this.timeE = '14:07';
    this.syntaxTime= 'T';
    _.forEach(this.allsche,(value)=>{
      let aa = [];
    this.start = this.constantDate + value.day + this.syntaxTime + value.start;
    this.end = this.constantDate + value.day + this.syntaxTime + value.end;
    this.eventss.push({
          "title":value.courseName,
          "start":this.start,
          "end":  this.end
          // ,"day": value.day
          // ,"place":value.place_id
        })
    // value.events = this.eventss;
    
    
    
    })

    // this.DDD();
    console.log(this.eventss);
    // console.log(this.events);
   

  });

  })

  this.placeService.all().then(res => {
    this.place=res;
    })

}
  

  toggled: boolean;
  toggle() {
    this.toggled = true;
  }

delete(id) {
   this.scheduleService.delete(id).then((res) => {
      location.reload();
    }, (error) => {
      console.log(error);
    });
  }

  goAdd(){
    this.navCtrl.setRoot(SchedulePage)
  }


}
