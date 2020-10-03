import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';

import { CartsService } from '../../shared/services/carts/carts.service';
import { ProductsService } from 'src/app/shared/services/products/products.service';

// auth service
import { AuthService } from 'src/app/shared/services/auth/auth.service';
import { Cart } from 'src/app/shared/services/carts/carts.model';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {

  // Image
  imgAvatar = 'assets/img/default/avatar.png'

  // Checker
  isCollapsed = true;
  isEmpty: boolean = true
  cartz: boolean = false;

  // get data from auth service
  egovPackage: string;
  userType: string;
  userID: string;
  showIcondiv = false;
  userdetails: any;
  user_obj: any;
  cart: any;

  cartItems: any[] = []

  constructor(
    private router: Router,
    private cartService: CartsService,
    private productService: ProductsService,
    private authService: AuthService,
    public cdRef: ChangeDetectorRef
  ) {
    router.events.subscribe(
      (val) => {
        this.isCollapsed = true;
      }
    )
    this.cartz = this.productService.cart;
    this.checkUser()
    this.getData()
  }

  ngOnInit() {
    // setInterval(() => {
    //   this.cartz = this.productService.cart;
    // });

    // setInterval(() => {
    //   this.cart = this.cartService.carts;
    //   console.log(this.cart)
    // }, 1000);
    

  }

  getData() {
    this.cartService.getOne('2210c8ea-ae65-480f-af82-5ee1c49b7e06').subscribe(
      () => {
        this.cartItems = this.cartService.cart.cart_item
      },
      () => {},
      () => {
        if (this.cartItems.length > 0) {
          this.isEmpty = false
        }
      }
    )
  }

  checkUser() {
    if (this.authService.userType) {
      this.userType = this.authService.userType
      this.userID = this.authService.userID
      console.log('User type: ', this.userType)
      console.log('User id: ', this.userID)
    }
  }

  checkChanges() {
    this.userType = this.authService.userType;
    this.userID = this.authService.userID;
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
    if (path == 'profile') {
      return this.router.navigate([path], { queryParams: { tab: 'profile' } })
    } else {
      return this.router.navigate([path])
    }
  }
}
