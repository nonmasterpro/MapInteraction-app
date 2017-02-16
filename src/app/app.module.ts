import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { AboutPage } from '../pages/about/about';
import { ContactPage } from '../pages/contact/contact';
import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';
import { LoginPage } from '../pages/login/login';
import { RegisPage } from '../pages/regis/regis';
import { MapPage } from '../pages/map/map';
import { SchedulePage } from '../pages/schedule/schedule';
import { BusmapPage } from '../pages/busmap/busmap';
import { ConnectivityService } from '../providers/connectivity-service';
import { TestmapPage } from '../pages/testmap/testmap';

import { AuthHttp, AuthConfig } from 'angular2-jwt';
import { Http, RequestOptions } from '@angular/http';

import { AuthService } from './shared/auth.service';

import { AppConfig } from './app.config';

import {CalendarComponent} from "angular2-fullcalendar/src/calendar/calendar";

export function getAuthHttp(http) {
  return new AuthHttp(new AuthConfig({
    headerPrefix: 'Bearer',
    noJwtError: true,
    globalHeaders: [{ 'Accept': 'application/json' }],
    tokenGetter: (() => localStorage.getItem('id_token')),
  }), http);
}

@NgModule({
  declarations: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    TabsPage,
    LoginPage,
    RegisPage,
    MapPage,
    SchedulePage,
    BusmapPage,
    TestmapPage,
    CalendarComponent
  ],
  imports: [
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    TabsPage,
    LoginPage,
    RegisPage,
    MapPage,
    SchedulePage,
    BusmapPage,
    TestmapPage
  ],
  providers: [
    { 
      provide: ErrorHandler,
      useClass: IonicErrorHandler
    },
    AuthService,
    {
      provide: AuthHttp,
      useFactory: getAuthHttp,
      deps: [Http, RequestOptions]
    },
    {
      provide: 'AppConfig',
      useValue: AppConfig
    },
    ConnectivityService
  ]
})
export class AppModule { }
