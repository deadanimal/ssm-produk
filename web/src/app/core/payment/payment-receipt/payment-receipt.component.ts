import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TransactionsService } from 'src/app/shared/services/transactions/transactions.service';

@Component({
  selector: 'app-payment-receipt',
  templateUrl: './payment-receipt.component.html',
  styleUrls: ['./payment-receipt.component.scss']
})
export class PaymentReceiptComponent implements OnInit {

  transaction: any

  constructor(
    private transactionService: TransactionsService,
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
