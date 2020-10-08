import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CartsService } from 'src/app/shared/services/carts/carts.service';
import { TransactionsService } from 'src/app/shared/services/transactions/transactions.service';

import * as moment from 'moment';
import { CartExtended } from 'src/app/shared/services/carts/carts.model';

@Component({
  selector: 'app-payment-receipt',
  templateUrl: './payment-receipt.component.html',
  styleUrls: ['./payment-receipt.component.scss']
})
export class PaymentReceiptComponent implements OnInit {

  transaction: any
  cart: CartExtended

  // Checker
  isReceipt = false

  constructor(
    private transactionService: TransactionsService,
    private cartService: CartsService,
    private router: Router
  ) { 
    this.getData()
  }

  ngOnInit(): void {
    // if (!this.transaction) {
    //   this.navigatePage('/home')
    // }
  }

  getData() {
    // console.log('data nak get sini')
    this.transaction = this.transactionService.transactionsFiltered[0]
    this.cartService.getOne(this.transaction['cart']).subscribe(
      (res) => {
        // console.log('res ', res)
        this.cart = res
        this.cart['created_date'] = moment(this.cart['created_date']).format('DD/MM/YYYY hh:mm:ss')
      },
      () => {},
      () => {
        let cnt = 0
        this.cart['cart_item'].forEach(
          (itemz) => {
            cnt++
            itemz['index'] = cnt
            itemz.created_date = moment(itemz['created_date']).format('DD/MM/YYYY hh:mm:ss')
          }
        )
        // console.log('item: ', this.cart)
        // console.log('cart_item: ', this.cart['cart_item'])
        this.isReceipt = true
        // console.log('asdas', this.cart)
      }
    )
  }

  navigatePage(path: string) {
    // console.log('Path: ', path)
    if (path == 'profile') {
      return this.router.navigate([path], { queryParams: { tab: 'order' } })
    } else {
      return this.router.navigate([path])
    }
  }

}
