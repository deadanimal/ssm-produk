import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { ProductsService } from 'src/app/shared/services/products/products.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  // Checker
  isCollapsed = true;

  // Image
  imgAvatar = 'assets/img/default/avatar.png'

  cartz: boolean = false

  constructor(
    private router: Router,
    private productService: ProductsService
  ) {
    router.events.subscribe(val => {
      this.isCollapsed = true;
    });
    this.cartz = this.productService.cart
    
  }

  ngOnInit() {
    setInterval(
      () => {
        this.cartz = this.productService.cart
      }
    )
  }

  mobileView(){
    if (window.innerWidth < 992) {
        return true;
    }
    return false;
  }

  navigatePage(path: string) {
    // console.log('Path: ', path)
    this.router.navigate([path])
  }

}
