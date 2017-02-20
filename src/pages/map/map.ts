import { Component, ElementRef, ViewChild, Input, OnInit } from '@angular/core';
import { NavController } from 'ionic-angular';
import { ConnectivityService } from '../../providers/connectivity-service';
import _ from "lodash";
import { PlaceService } from '../../app/shared/place.service';



declare var google;
@Component({
  selector: 'page-map',
  templateUrl: 'map.html'
})
export class MapPage implements OnInit{

  @Input() options;

  @ViewChild('map') mapElement: ElementRef;

  map: any;
  mapInitialised: boolean = false;
  apiKey: any;



  constructor(public nav: NavController,
    public connectivityService: ConnectivityService,
    private placeService: PlaceService
  ) {

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

  building = [
        {lat: 18.792, lng: 98.922},
        {lat: 18.755, lng: 98.902},
        {lat: 18.733, lng: 98.896},
        {lat: 18.711, lng: 98.884}
      ];
  sportField = [
        {lat: 18.892, lng: 98.922},
        {lat: 18.855, lng: 98.902},
        {lat: 18.833, lng: 98.896},
        {lat: 18.811, lng: 98.884}
      ];
  markers = [];

  places:any;


  initMap() {

    this.directionsService = new google.maps.DirectionsService;
    this.directionsDisplay = new google.maps.DirectionsRenderer;

    this.map = new google.maps.Map(document.getElementById('map'), {
      zoom: 16,
      center: { lat: 18.800995, lng: 98.952569 },
    });
    this.directionsDisplay.setMap(this.map);

    // document.getElementById('start').addEventListener('change', onChangeHandler);
    // document.getElementById('end').addEventListener('change', onChangeHandler);

    this.marker = new google.maps.Marker({
      map: this.map,
      draggable: true,
      animation: google.maps.Animation.DROP,
      position: { lat: 44.92000, lng: -88.237559 }
    });


    // let image = 'https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png';
    // let beachMarker = new google.maps.Marker({
    //   position: { lat: 18.793042, lng: 98.956259 },
    //   map: this.map,
    //   icon: image
    // });

// _.forEach((image),(df)=>{
//      let contentString = '<div id="content">'+
//             '<div id="siteNotice">'+
//             '</div>'+
//             '<h1 id="firstHeading" class="firstHeading">Uluru</h1>'+
//             '<p>Attribution: Uluru, <a href="https://en.wikipedia.org/w/index.php?title=Uluru&oldid=297882194">'+
//             'https://en.wikipedia.org/w/index.php?title=Uluru</a> '+
//             '(last visited June 22, 2009).</p>'+
//             '</div>'+
//             '</div>';
//         let infowindow = new google.maps.InfoWindow({
//           content: contentString,
//           maxWidth: 200
//         });
//         let marker = new google.maps.Marker({
//           position: { lat: 18.800995, lng: 98.952569 },
//           map: this.map,
//           title: 'RB5'
//         });
//         marker.addListener('click', function() {
//           infowindow.open(this.map, marker);
//         });
// });
    //   let image2='logo.png';
    //    var marker = new google.maps.Marker({
    //   position: { lat: 45.92000, lng: -88.237559 },
    //   map: map,
    //   icon:image
    // });

        //   let ctaLayer = new google.maps.KmlLayer({
        //   url: 'http://googlemaps.github.io/js-v2-samples/ggeoxml/cta.kml',
        //   map: this.map
        // });

    if (this.options) {
      console.log("BUS MAP")
    }
    else if (!this.options) {
      console.log("MAP")
    }
  }

  onChangeHandler() {
    this.calculateAndDisplayRoute(this.directionsService, this.directionsDisplay);
  }



  calculateAndDisplayRoute(directionsService, directionsDisplay) {
    // let origin: any = new google.maps.LatLng(41.85, -87.65);
    let arr = [{ 'lat': 18.800995, 'lng': 98.952569 }, { 'lat': 18.800995, 'lng': 98.952569 }, { 'lat': 18.800995, 'lng': 98.952569 }];
    let arr2 = [{ 'lat': 18.796512, 'lng': 98.953316 }];
    // console.log(arr);
    let destination: any = document.getElementById('end');

   _.forEach((arr),(value)=> {
      // console.log(value);
      let origin = new google.maps.LatLng(value.lat, value.lng);

      let a = new google.maps.LatLng(18.800995, 98.952569);
      let b = new google.maps.LatLng(18.796512, 98.953316);

      console.log(origin);
      directionsService.route({
        origin: a,
        destination: b,
        //destination.value
        travelMode: 'DRIVING'
      }, (response, status) => {
        if (status === 'OK') {
          directionsDisplay.setDirections(response);
          console.log(response.routes[0].legs[0].distance.value);
        } else {
          window.alert('Directions request failed due to ' + status);
        }
      });
  });
  }



 drop(type,imm) {
        let place = this.test(type);
        this.clearMarkers();
        for (var i = 0; i < place.length; i++) {
          this.addMarkerWithTimeout(place[i], i * 200,imm);
        }
      }



 addMarkerWithTimeout(position, timeout,imm) {
   console.log("position");
        window.setTimeout(()=> {
          let image = imm;
          this.markers.push(new google.maps.Marker({
            position: position,
            map: this.map,
            icon: image
          }));
          // let contentString = '<div id="content">'+
          //              '<div id="siteNotice">'+
          //              '</div>'+
          //              '<h1 id="firstHeading" class="firstHeading">Uluru</h1>'+
          //              '<p>Attribution: Uluru, <a href="https://en.wikipedia.org/w/index.php?title=Uluru&oldid=297882194">'+
          //              'https://en.wikipedia.org/w/index.php?title=Uluru</a> '+
          //              '(last visited June 22, 2009).</p>'+
          //              '</div>'+
          //              '</div>';
          // let infowindow = new google.maps.InfoWindow({
          //            content: contentString,
          //            maxWidth: 200
          //         });
          // this.marker.addListener('click', () => {
          //            infowindow.open(this.map, this.marker);
          //          });
        }, timeout);
      }



       clearMarkers() {
        for (var i = 0; i < this.markers.length; i++) {
          this.markers[i].setMap(null);
        }
        this.markers = [];
        console.log(this.markers);
      }

toggled: boolean;
toggle() {
  this.clearMarkers();
        this.toggled = this.toggled ? false : true;
    }


ngOnInit(){

    this.placeService.all().then(res => {
      this.places=res;
      // console.log(res);

    })

  }


  test(type) {
    let test1 =[];
    // console.log(this.places);
    _.forEach( this.places, (value) => {
      if (value.type===type)
        test1.push({'lat':value.x,'lng':value.y})
      })
  console.log(test1);
  return test1;
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
