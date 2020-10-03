import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { BsModalService } from 'ngx-bootstrap';

import { Router } from '@angular/router';
import { LoadingBarService } from '@ngx-loading-bar/core';


import { CartsService } from 'src/app/shared/services/carts/carts.service';
import { ProductsService } from 'src/app/shared/services/products/products.service';

export enum SelectionType {
  single = 'single',
  multi = 'multi',
  multiClick = 'multiClick',
  cell = 'cell',
  checkbox = 'checkbox',
}

@Component({
  selector: 'app-cbid-search',
  templateUrl: './cbid-search.component.html',
  styleUrls: ['./cbid-search.component.scss']
})
export class CbidSearchComponent implements OnInit {

  // Table
  tableEntries: number = 5;
  tableSelected: any[] = [];
  tableTemp = [];
  tableActiveRow: any;
  tableRows: any[] = [];
  SelectionType = SelectionType;
  listProject: any;
  listEntity: any;
  listProduct: any;

  // Form
  serviceForm: FormGroup
  requestToAdd: any[] = []

  // Checker
  isGotRequest: boolean = true

  constructor(
    private cartService: CartsService,
    private productService: ProductsService,
    private fb: FormBuilder,
    private loadingBar: LoadingBarService,
    private modalService: BsModalService,
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  updatePrice() {
    if (this.serviceForm.value['entity_type'] == 'ROB') {
      this.serviceForm.controls['price'].setValue(10.00)
    }
    else if (this.serviceForm.value['entity_type'] == 'ROC') {
      this.serviceForm.controls['price'].setValue(20.00)
    }
    else if (this.serviceForm.value['entity_type'] == 'Both') {
      this.serviceForm.controls['price'].setValue(30.00)
    }
  }

  addRequest() {
    let item = {
      'entity_type': this.serviceForm.value['entity_type'],
      'service_type': this.serviceForm.value['service_type'],
      'price': this.serviceForm.value['price']
    }
    // console.log('To add: ', item)
    this.requestToAdd.push(item)
  }

  removeRequest(row) {
    // console.log('To remove', row)
    this.requestToAdd.pop()
  }

  addToCart() {
    // console.log('Service to add: ')
    // this.cartService
  }

  entriesChange($event) {
    this.tableEntries = $event.target.value;
  }

  filterTable($event) {
    let val = $event.target.value;
    this.tableTemp = this.tableRows.filter(function (d) {
      for (var key in d) {
        if (d[key].toLowerCase().indexOf(val) !== -1) {
          return true;
        }
      }
      return false;
    });
  }

  onSelect({ selected }) {
    this.tableSelected.splice(0, this.tableSelected.length);
    this.tableSelected.push(...selected);
  }

  onActivate(event) {
    this.tableActiveRow = event.row;
  }

  navigatePage(path: string) {
    return this.router.navigate([path])
  }

}
