import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';

import { CartsService } from '../../shared/services/carts/carts.service';
import { ProductsService } from 'src/app/shared/services/products/products.service';

// auth service
import { AuthService } from 'src/app/shared/services/auth/auth.service';
import { Cart } from 'src/app/shared/services/carts/carts.model';
import { UsersService } from 'src/app/shared/services/users/users.service';
import { User } from 'src/app/shared/services/users/users.model';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {

  // Image
  imgAvatar = 'assets/img/default/avatar.png'

  // Checker
  isCollapsed = true
  isEmpty: boolean = true
  cartz: boolean = false
  isAuthenticated = false

  cartItems: any[] = []

  // Data
  currentUser: User

  constructor(
    private router: Router,
    private cartService: CartsService,
    private productService: ProductsService,
    private authService: AuthService,
    public cdRef: ChangeDetectorRef,
    private userService: UsersService
  ) {
    router.events.subscribe(
      (val) => {
        this.isCollapsed = true;
      }
    )
    this.cartz = this.productService.cart;
    // this.getData()
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

  getData(choice) {
    if (choice == '1') {
      this.cartService.getOne(this.cartService.cartCurrent.id).subscribe(
        () => {
          this.cartService.cartCurrent = this.cartService.cart
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
    else {
      this.cartService.getOne(this.cartService.cartsFiltered[0].id).subscribe(
        () => {
          this.cartService.cartCurrent = this.cartService.cart
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
    
  }

  mobileView() {
    if (window.innerWidth < 992) {
      return true;
    }
    return false;
  }

  userLogin() {
    let userId = 'cd64567d-b88d-460c-a661-1d1e7305d876'
    this.userService.getOne(userId).subscribe(
      (res: any) => {
        this.currentUser = this.userService.currentUser
        this.isAuthenticated = true
      },
      () => {},
      () => {
        this.checkCart()
      }
    )
  }

  checkCart() {
    let field = 'user=' + this.userService.currentUser.id + '&cart_status=CR'
    this.cartService.filter(field).subscribe(
      (res) => {
        // if 
        if (res.length == 0) {
          let body = {
            'user': this.userService.currentUser.id,
            'cart_status': 'CR'
          }
          this.cartService.create(body).subscribe(
            () => {
              this.getData('1')
            }
          )
        }
        else {
          this.getData('2')
        }
      }
    )
  }

  navigatePage(path: string) {
    // console.log('Path: ', path)
    if (path == 'profile') {
      return this.router.navigate([path], { queryParams: { tab: 'profile' } })
    } 
    else if (path == 'profile3') {
      return this.router.navigate(['profile'], { queryParams: { tab: 'order' } })
    } 
    else {
      return this.router.navigate([path])
    }
  }
}
