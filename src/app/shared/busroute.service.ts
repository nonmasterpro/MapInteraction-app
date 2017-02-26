import { Injectable, Inject } from '@angular/core';
import { Course } from '../models/course';
import { Headers, Http, RequestOptions } from '@angular/http';
import { AuthHttp, tokenNotExpired } from 'angular2-jwt';

@Injectable()
export class BusrouteService {

	private headers = new Headers({ 'Content-Type': 'application/json' });
	private options = new RequestOptions({ headers: this.headers });


    constructor(private http: Http,
		private authHttp: AuthHttp,
		@Inject('AppConfig') private config: any
	) {}
    
  all(id) {
  	return new Promise((resolve, reject) => {
  		this.authHttp.get(this.config.apiEndpoints.routes+'/'+id).subscribe((res: any) => {
          if(res.status === 200) {
            let routes = JSON.parse(res._body);
            resolve(routes);
          } else {
            reject({});
          }
        });
	  });
  }

    add(course) {
    console.log(course);
    return new Promise((resolve, reject) => {
      this.authHttp.post(this.config.apiEndpoints.schedules, course).subscribe((res: any) => {
        console.log(res);
          if(res.status === 200) {
            let course = JSON.parse(res._body);
            resolve(course);
          } else {
            reject({
              'text': 'message'
            });
          }
      });
    });
  }

  get(id) {
    return new Promise((resolve, reject) => {
      this.authHttp.get(this.config.apiEndpoints.schedules + '/' + id).subscribe((res: any) => {
      let schedules = JSON.parse(res._body);
      resolve(schedules);
        });
    });
  }

   delete(id) {
    return new Promise((resolve, reject) => {
      this.authHttp.delete(this.config.apiEndpoints.schedules + '/' + id).subscribe((res: any) => {
      let course = JSON.parse(res._body);
      resolve(course);
        });
    });
  }

}