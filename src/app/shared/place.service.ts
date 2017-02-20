import { Injectable, Inject } from '@angular/core';
import { AuthHttp } from 'angular2-jwt';

@Injectable()
export class PlaceService {

  constructor(
  		private authHttp: AuthHttp,
		@Inject('AppConfig') private config: any
		) { }

  all() {
  	return new Promise((resolve, reject) => {
  		this.authHttp.get(this.config.apiEndpoints.places).subscribe((res: any) => {
          if(res.status === 200) {
            let places = JSON.parse(res._body);
            resolve(places);
          } else {
            reject({});
          }
        });
	  });
  }

  get(id) {
    return new Promise((resolve, reject) => {
      this.authHttp.get(this.config.apiEndpoints.places + '/' + id).subscribe((res: any) => {
      let places = JSON.parse(res._body);
      resolve(places);
        });
    });
  }
  
   create(place) {
    return new Promise((resolve, reject) => {
      this.authHttp.post(this.config.apiEndpoints.places, place).subscribe((res: any) => {
        console.log(res);
          if(res.status === 200) {
            let places = JSON.parse(res._body);
            resolve(places);
          } else {
            reject({
              'text': 'message'
            });
          }
      });
    });
  }
  update(id, place) {
    return new Promise((resolve, reject) => {
      this.authHttp.put(this.config.apiEndpoints.places + '/' + id, place).subscribe((res: any) => {
        console.log(res);
          if(res.status === 200) {
            let place = JSON.parse(res._body);
            resolve(place);
          } else {
            reject({
              'text': 'message'
            });
          }
      });
    });
  }
  
  delete(id) {
    return new Promise((resolve, reject) => {
      this.authHttp.delete(this.config.apiEndpoints.places + '/' + id).subscribe((res: any) => {
      let place = JSON.parse(res._body);
      resolve(place);
        });
    });
  }

}
