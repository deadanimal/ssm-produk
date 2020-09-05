import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

class Transaction {

}

@Component({
  selector: 'app-transactions',
  templateUrl: './transactions.component.html',
  styleUrls: ['./transactions.component.scss']
})
export class TransactionsComponent implements OnInit {

  // Data
  transactions: any [] = []

  constructor(
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
  }

  loadData() {

  }

  download(transaction: Transaction) {
    let title = 'Downloading'
    let message = 'Your file is downloading'
    this.toastr.success(message, title)
  }

}
