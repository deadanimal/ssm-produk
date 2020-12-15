import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { ToastrService } from 'ngx-toastr';
import { LoadingBarService } from '@ngx-loading-bar/core';

import { CartsService } from '../../shared/services/carts/carts.service';
import { CookiezService } from 'src/app/shared/handler/cookie/cookie.service';
import { ProductsService } from 'src/app/shared/services/products/products.service';
import { UsersService } from 'src/app/shared/services/users/users.service';

import { User } from 'src/app/shared/services/users/users.model';
import { CartItemExtended } from 'src/app/shared/services/carts/carts.model';
import { LocalFilesService } from 'src/app/shared/services/local-files/local-files.service';
import { AuthService } from 'src/app/shared/services/auth/auth.service';

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
  // cartz: boolean = false
  isAuthenticated = false

  // Data
  currentUser: User
  cartItems: CartItemExtended[] = []
  formTypes: any[] = []

  constructor(
    private cartService: CartsService,
    private cookieService: CookiezService,
    private productService: ProductsService,
    private userService: UsersService,
    private loadingBar: LoadingBarService,
    private router: Router,
    private toastr: ToastrService,
    private fileService: LocalFilesService,
    private authService: AuthService
  ) {
    router.events.subscribe(
      (val) => {
        this.isCollapsed = true
      }
    )
    // this.cartz = this.productService.cart
    this.checkUser()
  }

  ngOnInit() {
    this.fileService.get('form-types.json').subscribe(
      (res) => {
        this.formTypes = res
        // console.log(this.formTypes)
      }
    )
    // this.checkCookies()
  }

  checkCookies() {
    console.log('Cookie: ',  window.localStorage)
  }

  checkUser() {
    this.loadingBar.useRef('http').start()
    this.userService.getAll().subscribe(
      (res) => {
        console.log('hello', res)
        this.loadingBar.useRef('http').complete()
        this.userService.currentUser = this.userService.users[0]
        this.currentUser = this.userService.users[0]
        this.isAuthenticated = true
      },
      (err) => {
        console.log(err)
        this.loadingBar.useRef('http').complete()
      },
      () => {
        this.checkCart()
      }
    )
    // let obtainedUserId = this.cookieService.getCookie('userId')

    // if (obtainedUserId) {
    //   this.loadingBar.useRef('http').start()
    //   this.userService.getOne(obtainedUserId).subscribe(
    //     (res: any) => {
    //       this.loadingBar.useRef('http').complete()
    //       let title = 'Success'
    //       let message = 'Logging in...'
    //       this.currentUser = this.userService.currentUser
    //       this.isAuthenticated = true
    //       // this.toastr.success(message, title)
    //     },
    //     () => {
    //       this.loadingBar.useRef('http').complete()
    //     },
    //     () => {
    //       this.checkCart()
    //       this.cookieService.saveCookie('userId', this.currentUser.id)
    //     }
    //   )
    // }
  }

  getData(choice) {
    if (choice == '1') {
      this.cartService.getOne(this.cartService.cartCurrent.id).subscribe(
        () => {
          this.cartService.cartCurrent = this.cartService.cart
          this.cartItems = this.cartService.cart.cart_item
        },
        () => { },
        () => {
          if (this.cartItems.length > 0) {
            this.isEmpty = false
          }
          else {
            this.isEmpty = true
          }
        }
      )
    }
    else {
      if (this.cartService.cartPending) {
        this.cartService.getOne(this.cartService.cartPending.id).subscribe(
          () => {
            this.cartService.cartCurrent = this.cartService.cart
            this.cartItems = this.cartService.cart.cart_item
          },
          () => { },
          () => {
            if (this.cartItems.length > 0) {
              this.isEmpty = false
            }
            else {
              this.isEmpty = true
            }
            this.cartItems.forEach(
              (item) => {
                if (item['image_form_type']) {
                  this.formTypes.forEach(
                    (code) => {
                      if (code.code == item['image_form_type']) {
                        item['image_form_type'] = code.desc_en
                      }
                    }
                  )
                }
              }
            )
          }
        )
      }
    }

  }

  mobileView() {
    if (window.innerWidth < 992) {
      return true;
    }
    return false;
  }

  userLogin(choice: number) {
    let userId = ''

    if (choice == 1) {
      userId = '78a008d1-d0c3-42f2-aa47-cc3e7587f802'
    }
    else if (choice == 2) {
      userId = '434f3f02-d3ce-4081-bab5-170d0bdce79d'
    }
    else if (choice == 3) {
      userId = '5eff06ec-86ee-41f6-8484-13003fb0e62d'
    }
    else if (choice == 4) {
      userId = '82b00e61-22e9-494d-aff7-240c5ca2692b'
    }
    else if (choice == 5) {
      userId = '87135e28-aff0-480f-9572-e68fd27e1d1b'
    }
    else if (choice == 6) {
      userId = '5c41e8d9-d6ac-410b-bea9-492958c16cd8'
    }


    this.loadingBar.useRef('http').start()
    this.userService.getOne(userId).subscribe(
      (res: any) => {
        this.loadingBar.useRef('http').complete()
        let title = 'Success'
        let message = 'Logging in...'
        this.currentUser = this.userService.currentUser
        this.isAuthenticated = true
        this.toastr.success(message, title)
      },
      () => {
        this.loadingBar.useRef('http').complete()
      },
      () => {
        this.checkCart()
        this.cookieService.saveCookie('userId', this.currentUser.id)
      }
    )
  }

  logout() {
    delete this.currentUser
    delete this.userService.currentUser
    this.cookieService.destroyCookie()
    this.isAuthenticated = false
    let title = 'Success'
    let message = 'Logging out...'
    this.navigatePage('/home')
    this.toastr.success(message, title)
  }

  checkCart() {
    this.cartService.checkCart(this.userService.currentUser.id).subscribe(
      () => {
        this.cartService.cartCurrent = this.cartService.cart
        this.cartItems = this.cartService.cart.cart_item
        console.log(this.cartItems)
      },
      () => { },
      () => {
        if (this.cartItems.length > 0) {
          this.isEmpty = false
        }
        else {
          this.isEmpty = true
        }
        this.cartItems.forEach(
          (item) => {
            if (item['image_form_type']) {
              this.formTypes.forEach(
                (code) => {
                  if (code.code == item['image_form_type']) {
                    item['image_form_type'] = code.desc_en
                  }
                }
              )
            }
          }
        )
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

  ssoLogin() {
    // this.authService.ssoLogin().subscribe()
    // const sso = new XMLHttpRequest();
    const url = 'http://192.168.43.113:8000/SSOLogin/?sso';
    // sso.open('GET', url, true);
    // sso.withCredentials = true;
    // // sso.onreadystatechange = handler;
    // sso.send(); 
    window.open(url, '_self')
  }

  checkCookie() {

  }


}
