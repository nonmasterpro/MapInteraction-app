import { Component, ElementRef, ViewChild, Input } from '@angular/core';
import { NavController } from 'ionic-angular';
import { ConnectivityService } from '../../providers/connectivity-service';
import _ from "lodash";


declare var google;
@Component({
  selector: 'page-map',
  templateUrl: 'map.html'
})
export class MapPage {

  @Input() options;

  @ViewChild('map') mapElement: ElementRef;

  map: any;
  mapInitialised: boolean = false;
  apiKey: any;

  constructor(public nav: NavController, public connectivityService: ConnectivityService) {

    this.loadGoogleMaps();

  }

  ngOnDestroy() {

  }


  loadGoogleMaps() {

    this.addConnectivityListeners();

    if (typeof google == "object" || typeof google == "undefined" || typeof google.maps == "undefined") {

      console.log("Google maps JavaScript needs to be loaded.");
      this.disableMap();

      if (this.connectivityService.isOnline()) {
        console.log("online, loading map");

        //Load the SDK
        window['mapInit'] = () => {
          this.initMap();
          this.enableMap();
        }

        let script = document.createElement("script");
        script.id = "googleMaps";

        if (this.apiKey) {
          script.src = 'http://maps.google.com/maps/api/js?key=AIzaSyDno6v4eOHpCGhIJdkKDduCjkl2hItUOZg&callback=mapInit';
        } else {
          script.src = 'http://maps.google.com/maps/api/js?key=AIzaSyDno6v4eOHpCGhIJdkKDduCjkl2hItUOZg&callback=mapInit';
        }

        document.body.appendChild(script);
      }
    }
    else {
      console.log("Else");
      if (this.connectivityService.isOnline()) {
        console.log("showing map");
        this.initMap();
        this.enableMap();
      }
      else {
        console.log("disabling map");
        this.disableMap();
      }

    }

  }

  // initMap2(){

  //   this.mapInitialised = true;

  //   Geolocation.getCurrentPosition().then((position) => {

  //     let latLng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);

  //     let mapOptions = {
  //       center: latLng,
  //       zoom: 15,
  //       mapTypeId: google.maps.MapTypeId.ROADMAP
  //     }

  //     this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);


  //   });

  // }


  directionsService: any;
  directionsDisplay: any;
  start: string = '';
  marker: any;

  initMap() {

    this.directionsService = new google.maps.DirectionsService;
    this.directionsDisplay = new google.maps.DirectionsRenderer;

    let map = new google.maps.Map(document.getElementById('map'), {
      zoom: 7,
      center: { lat: 41.85, lng: -87.65 }
    });
    this.directionsDisplay.setMap(map);

    // document.getElementById('start').addEventListener('change', onChangeHandler);
    // document.getElementById('end').addEventListener('change', onChangeHandler);

    this.marker = new google.maps.Marker({
      map: map,
      draggable: true,
      animation: google.maps.Animation.DROP,
      position: { lat: 44.92000, lng: -88.237559 }
    });
    this.marker.addListener('click', this.toggleBounce);

    let image = 'https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png';
    let beachMarker = new google.maps.Marker({
      position: { lat: 43.92000, lng: -88.237559 },
      map: map,
      icon: image
    });
    beachMarker.addListener('click', this.toggleBounce);

    //   let image2='logo.png';
    //    var marker = new google.maps.Marker({
    //   position: { lat: 45.92000, lng: -88.237559 },
    //   map: map,
    //   icon:image
    // });


    if (this.options) {
      console.log("BUS MAP")
    }
    else if (!this.options) {
      console.log("MAP")
    }
  }

  toggleBounce() {
    if (this.marker.getAnimation() !== null) {
      this.marker.setAnimation(null);
    } else {
      this.marker.setAnimation(google.maps.Animation.BOUNCE);
    }
  }


  onChangeHandler() {
    this.calculateAndDisplayRoute(this.directionsService, this.directionsDisplay);
  };



  calculateAndDisplayRoute(directionsService, directionsDisplay) {
    // let origin: any = new google.maps.LatLng(41.85, -87.65);
    let arr = [{ 'lat': 43.04, 'lng': -87.90 }, { 'lat': 43.04, 'lng': -87.90 }, { 'lat': 43.04, 'lng': -87.90 }];
    // console.log(arr);
    let destination: any = document.getElementById('end');

   _.forEach((arr),(value)=> {
      // console.log(value);
      let origin = new google.maps.LatLng(value.lat, value.lng);
      console.log(origin);
      directionsService.route({
        origin: origin,
        destination: destination.value,
        travelMode: 'DRIVING'
      }, (response, status) => {
        if (status === 'OK') {
          // directionsDisplay.setDirections(response);
          console.log(response.routes[0].legs[0].distance.value);
        } else {
          window.alert('Directions request failed due to ' + status);
        }
      });
  });
  }

  disableMap() {
    console.log("disable map");
  }

  enableMap() {
    console.log("enable map");
  }

  addConnectivityListeners() {

    let onOnline = () => {

      setTimeout(() => {
        if (typeof google == "object" || typeof google == "undefined" || typeof google.maps == "undefined") {

          this.loadGoogleMaps();

        } else {

          if (!this.mapInitialised) {
            this.initMap();
          }

          this.enableMap();
        }
      }, 2000);

    };

    let onOffline = () => {
      this.disableMap();
    };

    document.addEventListener('online', onOnline, false);
    document.addEventListener('offline', onOffline, false);

  }

}