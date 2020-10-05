import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CartsService } from 'src/app/shared/services/carts/carts.service';
import { TransactionsService } from 'src/app/shared/services/transactions/transactions.service';

import * as moment from 'moment';

@Component({
  selector: 'app-payment-receipt',
  templateUrl: './payment-receipt.component.html',
  styleUrls: ['./payment-receipt.component.scss']
})
export class PaymentReceiptComponent implements OnInit {

  transaction: any
  item: any

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
    this.transaction = this.transactionService.transactionsFiltered[0]
    this.cartService.getOne(this.transaction['cart']['id']).subscribe(
      (res) => {
        this.item = res
        this.item.created_date = moment(this.item.created_date).format('DD/MM/YYYY hh:mm:ss')
      },
      () => {},
      () => {
        let cnt = 0
        this.item = this.item['cart_item'].forEach(
          (itemz) => {
            cnt++
            itemz['index'] += 1
            itemz.created_date = moment(itemz.created_date).format('DD/MM/YYYY hh:mm:ss')
          }
        )
        console.log('item: ', this.item)
        console.log('cart_item: ', this.item['cart_item'])
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
