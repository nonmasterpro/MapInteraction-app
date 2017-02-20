import { Injectable, Inject } from '@angular/core';
import { Course } from '../models/subject';
import { Headers, Http, RequestOptions } from '@angular/http';
import { Observable, Subject } from 'rxjs';
import { AuthHttp, tokenNotExpired } from 'angular2-jwt';

@Injectable()
export class ScheduleService {

	private headers = new Headers({ 'Content-Type': 'application/json' });
	private options = new RequestOptions({ headers: this.headers });

	_me: Subject<any> = new Subject();
	obMe: Observable<any>;

    constructor(private http: Http,
		private authHttp: AuthHttp,
		@Inject('AppConfig') private config: any
	) {}
    
    addS(subject) {
    return new Promise((resolve, reject) => {
      this.authHttp.post(this.config.apiEndpoints.subjects, subject).subscribe((res: any) => {
        console.log(res);
          if(res.status === 200) {
            let subject = JSON.parse(res._body);
            resolve(subject);
          } else {
            reject({
              'text': 'message'
            });
          }
      });
    });
  }
}