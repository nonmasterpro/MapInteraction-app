import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar, Splashscreen } from 'ionic-native';

import { TabsPage } from '../pages/tabs/tabs';
import { ContactPage } from '../pages/contact/contact';
import { LoginPage } from '../pages/login/login';
import { RegisPage } from '../pages/regis/regis';
import { HomePage } from '../pages/home/home';
import { MapPage } from '../pages/map/map';
import { BusmapPage } from '../pages/busmap/busmap';
import { SchedulePage } from '../pages/schedule/schedule';
import { AuthService } from './shared/auth.service';

import{ LogoutPage } from '../pages/logout/logout';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {

  @ViewChild(Nav) nav: Nav;

  rootPage = TabsPage;

  pages: any;

  user: any;

  constructor(private platform: Platform, private authService: AuthService) {
    this.initializeApp();

    this.authService.obMe.subscribe((user) => {
      console.log(user);
      this.user = user;
    });

    // used for an example of ngFor and navigation
    this.pages = [
      { title: 'Home', component: HomePage },
      { 
        title: 'Log in',
        component: LoginPage,
        hide: 'login'
       },
      { 
        title: 'Registration', 
        component: RegisPage,
        hide: 'login'
      },
      { title: 'Map', component: MapPage },
      { title: 'Cmu Bus Map', component: BusmapPage },
      { title: 'Schedule', component: SchedulePage },
      { title: 'Red car time', component: HomePage }
    ];
  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      StatusBar.styleDefault();
      Splashscreen.hide();
    });
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }

logoutApp() {
    this.authService.logout();
  }
  
}