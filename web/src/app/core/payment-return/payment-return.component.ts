import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TransactionsService } from 'src/app/shared/services/transactions/transactions.service';

@Component({
  selector: 'app-payment-return',
  templateUrl: './payment-return.component.html',
  styleUrls: ['./payment-return.component.scss']
})
export class PaymentReturnComponent implements OnInit {


  //
  loadedData
  constructor(
    private activatedRoute: ActivatedRoute,
    private transactionService: TransactionsService,
    private router: Router
  ) { 
    this.activatedRoute.queryParams.subscribe(
      (p: any) => {
        console.log(p['transactionId'])
        this.getData(p['transactionId'])
      }
    )      
  }

  ngOnInit(): void {
  }

  getData(val: string) {
    let filter = 'reference_no=' + val
    this.transactionService.filter(filter).subscribe(
      () => {
        this.loadedData = this.transactionService.transactionsFiltered
      },
      () => {},
      () => {
        this.router.navigate(['/orders'])
      }
    )
  }

  // straight g orders
  // 1 - Make a call to API find transaction = reference no
  // 2 - Ada cart
  // 3 - Find entity and jenis product

}
