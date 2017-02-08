import { Component, ElementRef, ViewChild } from '@angular/core';
import { NavController } from 'ionic-angular';
import { ConnectivityService } from '../../providers/connectivity-service';
import { Geolocation } from 'ionic-native';

declare var google;



@Component({
  selector: 'page-busmap',
  templateUrl: 'busmap.html'
})
export class BusmapPage {

 
  constructor() {

  }

}