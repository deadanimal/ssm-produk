import { Component, OnInit } from '@angular/core';

import * as moment from 'moment';
import { CartsService } from 'src/app/shared/services/carts/carts.service';
import { ProductsService } from 'src/app/shared/services/products/products.service';
import { NgxSpinnerService } from 'ngx-spinner';

export enum SelectionType {
  single = 'single',
  multi = 'multi',
  multiClick = 'multiClick',
  cell = 'cell',
  checkbox = 'checkbox',
}

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss']
})
export class OrdersComponent implements OnInit {

  // Table
  tableEntries: number = 10
  tableSelected: any[] = []
  tableTemp = []
  tableActiveRow: any
  tableRows: any[] = []

  // Data
  orders: any[] = []

  constructor(
    private cartService: CartsService,
    private productService: ProductsService,
    private spinner: NgxSpinnerService
  ) {
    this.getData()
  }

  ngOnInit(): void {

  }

  getData() {
    this.cartService.getOne('2210c8ea-ae65-480f-af82-5ee1c49b7e06').subscribe(
      () => {
        this.orders = this.cartService.cart.cart_item
        console.log(this.cartService.cart)
        this.tableRows = this.orders
        this.tableRows.forEach(
          (item) => {
            item.created_date = moment(item.created_date).format('DD/MM/YYYY hh:mm:ss')
          }
        )
      },
      () => {},
      () => {
        this.tableTemp = this.tableRows.map((prop, key) => {
          return {
            ...prop,
            id_index: key+1
          }
        })
        console.log(this.tableTemp)
      }
    )
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

  downloadOutput(row) { 
    if (row.product.id == 'abd86a30-3d41-4c68-94e3-280b0362e288') {
      let body = {
        "name": "company_profile",
        "language": "ms",
        "ctc": "False",
        "registration_no": row.entity.company_number,
        "entity_type": "ROC"
      }
      this.spinner.show()
      this.productService.generateDocument(body).subscribe(
        (res: any) => {
          this.spinner.hide()
          let url = res.pdflink
          window.open(url, '_blank');
          // window.location.href =url;
        },
        () => {
          this.spinner.hide()
        }
      )
    }
    else if (row.product.id == '74a97598-c817-4c06-971f-3197c4c12165') {
      let body = {
        "name": "company_profile",
        "language": "en",
        "ctc": "False",
        "registration_no": row.entity.company_number,
        "entity_type": "ROC"
      }
      this.spinner.show()
      this.productService.generateDocument(body).subscribe(
        (res: any) => {
          this.spinner.hide()
          let url = res.pdflink
          window.open(url, '_blank');
          // window.location.href =url;
        },
        () => {
          this.spinner.hide()
        }
      )
    }
    else if (row.product.id == 'f636d9f7-29f6-4d85-bf21-417c7496193d') {
      let body = {
        "name": "company_profile",
        "language": "ms",
        "ctc": "True",
        "registration_no": row.entity.company_number,
        "entity_type": "ROC"
      }
      this.spinner.show()
      this.productService.generateDocument(body).subscribe(
        (res: any) => {
          this.spinner.hide()
          let url = res.pdflink
          window.open(url, '_blank');
          // window.location.href =url;
        },
        () => {
          this.spinner.hide()
        }
      )
    }
    else if (row.product.id == '5b381e56-dc2f-4476-986e-ecb247d48499') {
      let body = {
        "name": "company_profile",
        "language": "en",
        "ctc": "True",
        "registration_no": row.entity.company_number,
        "entity_type": "ROC"
      }
      this.spinner.show()
      this.productService.generateDocument(body).subscribe(
        (res: any) => {
          this.spinner.hide()
          let url = res.pdflink
          window.open(url, '_blank');
          // window.location.href =url;
        },
        () => {
          this.spinner.hide()
        }
      )
    }
    else if (row.product.id == '1eca2caf-a8c7-4327-a37f-394f4dd9c78e') {
      let body = {
        "name": "business_profile",
        "language": "ms",
        "ctc": "False",
        "registration_no": row.entity.registration_number,
        "entity_type": "ROB"
      }
      this.spinner.show()
      this.productService.generateDocument(body).subscribe(
        (res: any) => {
          this.spinner.hide()
          let url = res.pdflink
          window.open(url, '_blank');
          // console.log(res)
        },
        () => {
          this.spinner.hide()
        }
      )
    }
    else if (row.product.id == '539aaa55-a0f6-4af4-b476-acc03bae8f62') {
      let body = {
        "name": "business_profile",
        "language": "en",
        "ctc": "False",
        "registration_no": row.entity.registration_number,
        "entity_type": "ROB"
      }
      this.spinner.show()
      this.productService.generateDocument(body).subscribe(
        (res: any) => {
          this.spinner.hide()
          let url = res.pdflink
          window.open(url, '_blank');
          // console.log(res)
        },
        () => {
          this.spinner.hide()
        }
      )
    }
    else if (row.product.id == 'f1dc2664-f55d-4012-a4fe-556da76eb32c') {
      let body = {
        "name": "business_profile",
        "language": "ms",
        "ctc": "True",
        "registration_no": row.entity.registration_number,
        "entity_type": "ROB"
      }
      this.spinner.show()
      this.productService.generateDocument(body).subscribe(
        (res: any) => {
          this.spinner.hide()
          let url = res.pdflink
          window.open(url, '_blank');
          // console.log(res)
        },
        () => {
          this.spinner.hide()
        }
      )
    }
    else if (row.product.id == '8df319e5-0bed-435d-81d4-03856870195d') {
      let body = {
        "name": "business_profile",
        "language": "en",
        "ctc": "True",
        "registration_no": row.entity.registration_number,
        "entity_type": "ROB"
      }
      this.spinner.show()
      this.productService.generateDocument(body).subscribe(
        (res: any) => {
          this.spinner.hide()
          let url = res.pdflink
          window.open(url, '_blank');
          // console.log(res)
        },
        () => {
          this.spinner.hide()
        }
      )
    }
    else if (row.product.id == 'aeb73efa-b89e-4e15-b1a7-3ba2409f7ec1') {
      let body = {
        "name": "financial_history",
        "language": "ms",
        "ctc": "False",
        "registration_no": row.entity.company_number,
        "entity_type": "ROC",
        "year1": 2016,
	      "year2": 2017
      }
      this.spinner.show()
      this.productService.generateDocument(body).subscribe(
        (res: any) => {
          this.spinner.hide()
          let url = res.pdflink
          window.open(url, '_blank');
          // console.log(res)
        },
        () => {
          this.spinner.hide()
        }
      )
    }
    else if (row.product.id == '6420ad7f-8639-451e-99c7-76a02ac2763c') {
      let body = {
        "name": "financial_history",
        "language": "en",
        "ctc": "False",
        "registration_no": row.entity.company_number,
        "entity_type": "ROC",
        "year1": 2016,
	      "year2": 2017
      }
      this.spinner.show()
      this.productService.generateDocument(body).subscribe(
        (res: any) => {
          this.spinner.hide()
          let url = res.pdflink
          window.open(url, '_blank');
          // console.log(res)
        },
        () => {
          this.spinner.hide()
        }
      )
    }
  }

  

}
