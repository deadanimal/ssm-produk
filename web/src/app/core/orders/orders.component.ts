import { Component, OnInit } from '@angular/core';
import { ProductCart } from 'src/app/shared/services/product-carts/product-carts.model';
import { ProductCartsService } from 'src/app/shared/services/product-carts/product-carts.service';
import { Transaction } from 'src/app/shared/services/transactions/transactions.model';
import { TransactionsService } from 'src/app/shared/services/transactions/transactions.service';
import { ProductsService } from 'src/app/shared/services/products/products.service';

class mergeData {
  entity: string
  entity_number: string
  product_id: string
}
@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss']
})
export class OrdersComponent implements OnInit {

  // Data
  transactions: Transaction[] = []
  carts: ProductCart[] = []
  cartNew: mergeData[] = []

  constructor(
    private transactionService: TransactionsService,
    private cartService: ProductCartsService,
    private productService: ProductsService
  ) {
    this.getData()
  }

  ngOnInit(): void {
    console.log(this.cartNew)
  }

  getData() {
    this.cartService.getAll().subscribe(
      () => {
        this.carts = this.cartService.ProductCarts
        this.transactions = this.transactionService.transactionsFiltered
      },
      () => {},
      () => {
        this.getTableData()
        console.log('transactions', this.transactions)
        console.log('carts', this.carts)
      }
    )
  }

  download() {
    // window.open('https://pipeline-project.sgp1.digitaloceanspaces.com/ssm/product/1599179232-96afbd34518b47af99a1fe4f488185d8.pdf', "_blank");
  }

  getTableData() {
    this.carts.forEach(
      (cartz) => {
        this.transactions.forEach(
          (transaction) => {
            if (cartz.id == transaction.cart) {
              console.log('Found ya')
              this.cartNew.push({
                entity: cartz.entity,
                entity_number: cartz.entity_registration_number,
                product_id: cartz.product_type
              })
            }
          }
        )
      }
    )

  }

  downloadFile(row) {

    if (row.product_id == 'f941af40-ba69-441c-ab93-e328101c192b') {
      let _json = {
        "name": "company_profile",
        "language": "ms",
        "ctc": "False",
        "registration_no": parseInt(row.entity_number),
        "entity_type": "ROC"
      }
      console.log(_json)
      let a_json = JSON.parse(JSON.stringify(_json))
      console.log(a_json)

      // this.productService.getPDF(a_json).subscribe(
      //   (res) => {
      //     console.log(res)
      //     window.open(res.pdflink)
      //   }
      // )
    }
    else if (row.product_id == 'f941af40-ba69-441c-ab93-e328101c192b') {
      // this.productService.getPDF(
      //   {
      //     "name": "acgs",
      //     "language": "ms",
      //     "ctc": "False",
      //     "registration_no": row.entity_number,
      //     "entity_type": "ROC"
      //   }
      // ).subscribe(
      //   (res) => {
      //     console.log(res)
      //     window.open(res.pdflink)
      //   }
      // )
    }
  }

}
