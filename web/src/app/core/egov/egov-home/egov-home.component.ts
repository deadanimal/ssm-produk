import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/shared/services/users/users.model';
import { UsersService } from 'src/app/shared/services/users/users.service';

@Component({
  selector: 'app-egov-home',
  templateUrl: './egov-home.component.html',
  styleUrls: ['./egov-home.component.scss']
})
export class EgovHomeComponent implements OnInit {

  // Data
  user: User

  // Slider
  slider1 = 'assets/img/banner/banner portal-01.png';
  slider2 = 'assets/img/banner/banner portal-02.png';
  slider3 = 'assets/img/banner/banner portal-03.png';
  slider4 = 'assets/img/banner/banner portal-04.png';

  constructor(
    private userService: UsersService,
    private router: Router
  ) { 
    this.user = this.userService.currentUser
    // console.log(this.user)
  }

  ngOnInit(): void {
  }

  navigatePage(path: string) {
    // console.log('Path: ', path)
    // console.log('Package: ', this.user['egov_package'])
    if (
      this.user['egov_package'] == 3 ||
      this.user['egov_package'] == 4 &&
      path == '/products/search-egov'
    ) {
      this.router.navigate(['/profile/egov'], { queryParams: { tab: 'request-doc' }});
    }
    else {
      this.router.navigate([path]);
    }
  }

}
