import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { ProductsService } from 'src/app/shared/services/products/products.service';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-search-engine',
  templateUrl: './search-engine.component.html',
  styleUrls: ['./search-engine.component.scss']
})
export class SearchEngineComponent implements OnInit {

  // Search field
  focus
  searchField: string = ''

  // Checker
  isEmpty = true
  isNoResult = false
  isGotResult = false

  // Form
  productForm: FormGroup

  // Data
  searchResults: any[] = []
  pdfProduct: any

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private productService: ProductsService,
    private spinner: NgxSpinnerService
  ) { }

  ngOnInit(): void {
    this.productForm = this.fb.group({
      name: new FormControl('getCompProfile'),
      registration_number: new FormControl('', Validators.compose([
        Validators.required
      ]))
    })
  }

  navigatePage(path: string) {
    // console.log('Path: ', path)
    this.router.navigate([path])
  }

  search() {
    
    // if (this.searchField == '') {

    // }
    // this.testService.getProducts(this.productForm.value).subscribe(
    //   {
    //     () => {},
    //     () => {},
    //     () => {}
    //   }
    // )
    this.spinner.show();
    console.log(this.productForm.value.registration_number)
    setTimeout(
      () => {
        this.spinner.hide()
        if (this.productForm.value.registration_number == 'Pipeline Network' || this.productForm.value.registration_number == '960536') {
          this.isGotResult = true
          this.isEmpty = false
        }
        else {
          this.isGotResult = true
          this.isEmpty = false
        }
      }, 2000
    )
    // this.productService.search(this.productForm.value).subscribe(
    //   (res) => {
    //     this.spinner.hide();
    //     this.searchResults = this.productService.product
    //     this.isEmpty = false 
    //     if (!res) {
    //       this.isNoResult = true

    //     }
    //     else if (res) {
    //       this.isGotResult = true
    //     }
    //   },
    //   (err) => {
    //     this.spinner.hide();
    //     console.log(err)
    //   },
    //   () => {}
    // )
    
  }

  viewResult() {
    console.log('View result')
    this.router.navigate(['/product-listing'])
  }

  getPDF() {
    let hello = {
      test: this.searchResults
    }
    console.log(hello)
    this.spinner.show();
    this.productService.getPDF(hello).subscribe(
      (res) => {
        this.spinner.hide();
        window.open(res, "_blank");
      },
      () => {
        this.spinner.hide();
      },
      () => {}
    )
  }

}
