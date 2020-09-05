import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { ProductsService } from 'src/app/shared/services/products/products.service';

class Entity {
  name: string
  registration_no: string
}

@Component({
  selector: 'app-product-listing',
  templateUrl: './product-listing.component.html',
  styleUrls: ['./product-listing.component.scss']
})
export class ProductListingComponent implements OnInit {

  // Data
  entity: Entity
  products: any[] = []

  // Checker
  isProceed: boolean = false

  // Options
  ctcOpts = [
    { name: 'non-CTC', value: 'non-ctc' },
    { name: 'CTC', value: 'ctc' },
    { name: 'Both', value: 'both' }
  ]

  constructor(
    private toastr: ToastrService,
    private productService: ProductsService
  ) { }

  ngOnInit(): void {
    this.entity = { 
      name: 'PIPELINE NETWORK SDN. BHD.', 
      registration_no: '201101032401 (960536-K)'
    }
  }

  proceed() {
    this.isProceed = true
  }

  addCart() {
    let title = 'Success'
    let message = 'Item is added to the cart'
    this.toastr.success(message, title)
    this.productService.cart = true
  }

}
