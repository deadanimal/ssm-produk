import { Component, OnInit } from '@angular/core';
import { LoadingBarService } from '@ngx-loading-bar/core';
import { CookieService } from './shared/handler/cookie/cookie.service';
import { UsersService } from './shared/services/users/users.service';
// import Headroom from 'headroom.js';
// import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  
  private currentUser

  constructor(
    private loadingBar: LoadingBarService,
    private cookieService: CookieService,
    private userService: UsersService
  ){
    this.checkUser()
  }

  ngOnInit(){
    // var headroom = new Headroom(document.querySelector('#navbar-main'), {
    //   offset: 300,
    //   tolerance: {
    //     up: 30,
    //     down: 30
    //   },
    // });
    // headroom.init();
  }

  checkUser() {
    let obtainedUserId = this.cookieService.getCookie('userId')

    if (obtainedUserId) {
      this.loadingBar.useRef('http').start()
      this.userService.getOne(obtainedUserId).subscribe(
      (res: any) => {
        this.loadingBar.useRef('http').complete()
        let title = 'Success'
        let message = 'Logging in...'
        this.currentUser = this.userService.currentUser
      },
      () => {
        this.loadingBar.useRef('http').complete()
      }
    )
    }
  }
}
