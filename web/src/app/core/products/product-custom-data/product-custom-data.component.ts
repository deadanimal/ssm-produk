import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-product-custom-data',
  templateUrl: './product-custom-data.component.html',
  styleUrls: ['./product-custom-data.component.scss']
})
export class ProductCustomDataComponent implements OnInit {

  constructor(
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  navigatePage(path: string) {
    // console.log('Path: ', path)
    return this.router.navigate([path]);
  }

}
