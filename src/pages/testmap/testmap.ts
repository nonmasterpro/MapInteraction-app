import { Component } from '@angular/core';
import { NavController, Platform } from 'ionic-angular';
import $ from 'jquery';
// import $ from 'jquery';

// import $  from '../../../bower_components/jquery-skeduler/jquery.skeduler.js';

declare var google;

@Component({
  selector: 'page-testmap',
  templateUrl: 'testmap.html'
})
export class TestmapPage {

  constantDate: any;
  day: any;
  timeS: any;
  timeE: any;
  subject: any;
  schedules: any;
  start: any;
  end: any;
  title: any;
  place: any;
  events = [];

  ex = {
    title: '',
    start: '',
    end: '',
    place: ''
  }

  constructor(private platform: Platform, public nav: NavController) {
    this.constantDate = '2017-10-0';

    this.title = 'OOAD';
    this.place = 'CAMT';
    this.day = 1;
    this.timeS = 'T12:07:00';
    this.timeE = 'T14:07:00';

    this.start = this.constantDate + this.day + this.timeS;
    this.end = this.constantDate + this.day + this.timeE;

    this.ex.title = this.title;
    this.ex.start = this.start;
    this.ex.end = this.end;
    this.ex.place = this.place;

    for (let i = 0; i < 1; i++) {
      this.events.push(this.ex)
    }
    console.log(this.events)
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
    // eventClick: function(calEvent, jsEvent, view) {

    //     alert('Event: ' + calEvent.title);
    //     alert('Coordinates: ' + jsEvent.pageX + ',' + jsEvent.pageY);
    //     alert('View: ' + view.title);

    //     // change the border color just for fun
    //     $(this).css('border-color', 'purple');

    // },
    eventClick: function(event) {
        if (event.url) {
            window.open(event.url);
            return false;
        }else{
          alert("ttt");
        }
    },
    allDaySlot: false,
    height: 'parent',
    fixedWeekCount: false,
    minTime: '00:00:00',
    maxTime: '24:00:00',
    columnFormat: 'ddd',
    defaultDate: '2017-10-7',
    firstDay: 0,
    editable: true,
    eventLimit: true, // allow "more" link when too many events
    events: this.events
  };
}



