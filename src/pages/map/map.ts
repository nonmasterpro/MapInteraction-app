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
export class MapPage implements OnInit {

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
  markers = [];

  
  places: any;


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


    if (this.options) {
      console.log("BUS MAP")
    }
    else if (!this.options) {
      console.log("MAP")
    }
  }

  listStart: any;
  onChangeStart(nameS) {
    console.log(nameS);
    let listS = [];
    _.forEach(this.places, (value) => {
      if (value.name === nameS)
        listS.push({ 'lat': value.x, 'lng': value.y })
    })
    this.listStart = listS;
    console.log(this.listStart);
  }

  listEnd: any;
  onChangeEnd(name) {
    console.log(name);
    let listE = [];
    _.forEach(this.places, (value) => {
      if (value.name === name)
        listE.push({ 'lat': value.x, 'lng': value.y })
    })
    this.listEnd = listE;
    console.log(this.listEnd);
  }


  onChangeHandler() {
    this.calculateAndDisplayRoute(this.directionsService, this.directionsDisplay);
  }



  calculateAndDisplayRoute(directionsService, directionsDisplay) {

    let a = new google.maps.LatLng(this.listStart[0].lat, this.listStart[0].lng);
    let b = new google.maps.LatLng(this.listEnd[0].lat, this.listEnd[0].lng);

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
    ;
  }

onChangeAAA() {
    this.calculateShortestRoute(this.directionsService, this.directionsDisplay);
  }

CurrentLat:any;
CurrentLng:any;
  calculateShortestRoute(directionsService, directionsDisplay) {
   
    let arr = [{'name':'qqq' , 'lat': 18.790355, 'lng':  98.955785 }, {'name':'www' , 'lat': 18.793362,  'lng': 98.945872 },
              {'name':'eee' , 'lat': 18.789665, 'lng': 98.951923 }];
   _.forEach((arr),(value)=> {
      let a = new google.maps.LatLng(this.CurrentLat, this.CurrentLng);
      let b = new google.maps.LatLng(value.lat,value.lng);
      console.log(this.CurrentLat);
      directionsService.route({
        origin: a,
        destination: b,
        travelMode: 'DRIVING'
      }, (response, status) => {
        if (status === 'OK') {
          // directionsDisplay.setDirections(response);
          // console.log(response);

          console.log(response.routes[0].legs[0].distance.value);
        } else {
          window.alert('Directions request failed due to ' + status);
        }
      });
  });
  }

  
  drop(type, imm) {
    this.test(type);
    // let place2 = this.inform(type);
    this.clearMarkers();
    for (let i = 0; i < this.test2.length; i++) {
      let image = imm;
      this.marker = new google.maps.Marker({
        position: this.test2[i],
        map: this.map,
        icon: image
      });
      this.markers.push(this.marker);
      
      let dd = "http://139.59.231.135/map/public/images/"
      let contentString = 
      
      '<h6 style="text-align:center" id="firstHeading" class="firstHeading">'+this.test3[i].name + '</h6>'+
       '<IMG WIDTH="100%" HEIGHT="120px" BORDER="0" ALIGN="Left" SRC="'
        + dd 
          +this.test3[i].images +
        '">'+
        '<div>' +
        "<b> Description : </b>"+
        this.test3[i].des+'</div>'+
        '</div>'+
        "<b> Contact : </b>"+
        this.test3[i].contact+'</div>'+
        '</div>'+
        "</br><b>Website : </b>"+
        this.test3[i].website+'</div>'+
        '</div>'+" "+'</div>'
        ;
     this.infoWin(this.marker, contentString);
    }
    
}
 
infoWin(markers,contentString){
     let infowindow = new google.maps.InfoWindow({
        content: contentString,
        maxWidth: 200,
        maxHeight: 500
      });
      // console.log(markers);
      // google.maps.event.addListener(this.markers, 'click', () => {
      //   infowindows.open(this.map, this.markers);
      // });
      markers.addListener('click', () => {
                 infowindow.open(this.map, markers);
               });
  }

  clearMarkers() {
    for (var i = 0; i < this.markers.length; i++) {
      this.markers[i].setMap(null);
    }
    this.markers = [];
    console.log("clear");
  }

  test2: any;
  test3:any;
  test(type) {
    let test1 = [];
    let aaa = [];
    // console.log(this.places);
    _.forEach(this.places, (value) => {
      if (value.type === type)
        test1.push({ 'lat': value.x, 'lng': value.y }),
        aaa.push({ 'name': value.name, 'des': value.description , 'contact': value.contact, 'website': value.website,
         'images':value.images[0].fileName})
    })
    // console.log(test1);
    this.test2 = test1;
    this.test3 = aaa;
    // return test1;
  }


  
  toggled: boolean;
  toggle() {
    this.clearMarkers();
    this.toggled = this.toggled ? false : true;
  }


  ngOnInit() {

    this.placeService.all().then(res => {
      this.places = res;
    })

    navigator.geolocation.getCurrentPosition((position)=> {
            let x = position.coords.latitude;
            let y = position.coords.longitude;
            this.CurrentLat=x;
            this.CurrentLng=y;
        })

      }

locate(){
  let infoWindow = new google.maps.Marker({map: this.map});
     if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition((position)=> {
            let x = position.coords.latitude;
            let y = position.coords.longitude;
            let pos = {
              lat: x,
              lng: y
            };
            infoWindow.setPosition(pos);
            // infoWindow.setContent('Location found.');
            this.map.setCenter(pos);
          }, () =>{
            this.handleLocationError(true, infoWindow, this.map.getCenter());
          });
        } else {
          // Browser doesn't support Geolocation
          this.handleLocationError(false, infoWindow, this.map.getCenter());
        }
}

      handleLocationError(browserHasGeolocation, infoWindow, pos) {
        infoWindow.setPosition(pos);
        // infoWindow.setContent(browserHasGeolocation ?
        //                       'Error: The Geolocation service failed.' :
        //                       'Error: Your browser doesn\'t support geolocation.');
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
