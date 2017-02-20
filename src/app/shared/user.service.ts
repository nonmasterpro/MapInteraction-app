import { Injectable, Inject } from '@angular/core';
import { Headers, Http, RequestOptions } from '@angular/http';
import { Observable, Subject } from 'rxjs';
import { AuthHttp, tokenNotExpired } from 'angular2-jwt';

import { User } from '../models/user';

import 'rxjs/add/operator/toPromise';

@Injectable()
export class UserService {

	constructor(
		private authHttp: AuthHttp,
		@Inject('AppConfig') private config: any
	) {}
    
add(user) {
    return new Promise((resolve, reject) => {
      this.authHttp.post(this.config.apiEndpoints.users, user).subscribe((res: any) => {
        console.log(res);
          if(res.status === 200) {
            let user = JSON.parse(res._body);
            resolve(user);
          } else {
            reject({
              'text': 'message'
            });
          }
      });
    });
  }

  all() {
  	return new Promise((resolve, reject) => {
  		this.authHttp.get(this.config.apiEndpoints.users).subscribe((res: any) => {
          if(res.status === 200) {
            let users = JSON.parse(res._body);
            resolve(users);
          } else {
            reject({});
          }
        });
	  });
  }

}
