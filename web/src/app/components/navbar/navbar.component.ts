import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { ProductsService } from 'src/app/shared/services/products/products.service';

// auth service
import { AuthService } from 'src/app/shared/services/auth/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  // Checker
  isCollapsed = true;
  cartz: boolean = false;

  imgAvatar: any;

  // get data from auth service
  egovPackage: string;
  userType: string;
  userID: string;
  showIcondiv = false;
  userdetails: any;
  user_obj: any;

  constructor(
    private router: Router,
    private productService: ProductsService,
    private AuthService: AuthService,
    public cdRef: ChangeDetectorRef
  ) {
    // if (this.AuthService.decodedToken) {
    //   this.user_obj = this.AuthService.decodedToken();
    //   console.log('====> ', this.user_obj);
    //   let userType = this.user_obj.user_type;
    // }

    if (this.AuthService.userType) {
      this.userType = this.AuthService.userType;
      this.userID = this.AuthService.userID;
      console.log('user type ====> ', this.userType);
      console.log('user id ====> ', this.userID);
    }

    router.events.subscribe((val) => {
      this.isCollapsed = true;
    });
    this.cartz = this.productService.cart;
    // get data from auth service
    // this.userType = this.AuthService.userType;
    // this.userID = this.AuthService.userID;
  }

  ngOnInit() {
    // change image
    if (this.userType == 'EG') {
      this.imgAvatar = 'assets/img/faces/christian.jpg';
    } else {
      this.imgAvatar = 'assets/img/default/avatar.png';
    }

    console.log(this.imgAvatar);

    setInterval(() => {
      this.cartz = this.productService.cart;
    });
  }

  checkChanges() {
    this.userType = this.AuthService.userType;
    this.userID = this.AuthService.userID;
    if (this.userType == 'EG') {
      this.imgAvatar = 'assets/img/faces/christian.jpg';
    } else {
      this.imgAvatar = 'assets/img/default/avatar.png';
    }
    this.cdRef.detectChanges();
  }

  mobileView() {
    if (window.innerWidth < 992) {
      return true;
    }
    return false;
  }

  navigatePage(path: string) {
    // console.log('Path: ', path)
    this.router.navigate([path]);
  }
}
