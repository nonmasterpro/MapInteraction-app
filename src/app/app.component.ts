import { Component, ViewChild, OnInit } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar, Splashscreen } from 'ionic-native';

// import { TabsPage } from '../pages/tabs/tabs';
import { LoginPage } from '../pages/login/login';
import { RegisPage } from '../pages/regis/regis';
import { HomePage } from '../pages/home/home';
import { MapPage } from '../pages/map/map';
import { BusmapPage } from '../pages/busmap/busmap';
import { SchedulePage } from '../pages/schedule/schedule';
import { AuthService } from './shared/auth.service';
import { TestmapPage } from '../pages/testmap/testmap';
import { ListSchedulePage } from '../pages/list-schedule/list-schedule';
import { ContactPage } from '../pages/contact/contact';


@Component({
  templateUrl: 'app.html'
})
export class MyApp implements OnInit{

  @ViewChild(Nav) nav: Nav;

  rootPage = HomePage;

  pages: any;

  user: any;

  schedules: any;

  pagess: any;

  constructor(private platform: Platform, private authService: AuthService) {
    this.initializeApp();

    this.authService.obMe.subscribe((user) => {
      // console.log(user);
      this.user = user;
    });
    

    // used for an example of ngFor and navigation
    this.pages = [
      { title: 'Home', component: HomePage },
      { title: 'Log in', component: LoginPage, hide: 'login'},
      { title: 'Registration', component: RegisPage, hide: 'login'},
      { title: 'Map', component: MapPage },
      { title: 'CMU Bus Map', component: BusmapPage },
      { title: 'CMU Transit', component: ContactPage }
    ];

    this.pagess = [
      // { title: 'List Schedule', component: ListSchedulePage },
      { title: 'Schedule', component: TestmapPage }
      // { title: 'Add Schedule', component: SchedulePage}
      ];

    
  }

ngOnInit(){
this.authService.me();
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