import { Component, OnInit } from '@angular/core';
import { TransactionsService } from 'src/app/shared/services/transactions/transactions.service';

import * as moment from 'moment';

@Component({
  selector: 'app-master-table',
  templateUrl: './master-table.component.html',
  styleUrls: ['./master-table.component.scss']
})
export class MasterTableComponent implements OnInit {

  // Table
  tableEntries: number = 10
  tableSelected: any[] = []
  tableTemp = []
  tableActiveRow: any
  tableRows: any[] = []

  transactions: any[] = []

  constructor(
    private transactionService: TransactionsService,
  ) { 
    this.getData()
  }

  ngOnInit() {
  }

  getData() {
    this.transactionService.getTransactions().subscribe(
      (res) => {
        this.transactions = res
         console.log('TRX', this.transactions)
      },
      () => {

      },
      () => {
        this.transactions.forEach(
          (transaction) => {
            transaction['created_date'] = moment(transaction['created_date']).format('DD/MM/YYYY')
            transaction['modified_date'] = moment(transaction['modified_date']).format('DD/MM/YYYY')
            // ticket
          }
        )
        this.loadTable()
      }
    )
  }

  onSelect({ selected }) {
    this.tableSelected.splice(0, this.tableSelected.length);
    this.tableSelected.push(...selected);
  }

  onActivate(event) {
    this.tableActiveRow = event.row;
  } 
  
  entriesChange($event) {
    this.tableEntries = $event.target.value;
  }

  loadTable() {
    this.tableRows = this.transactions
    this.tableTemp = this.tableRows.map((prop, key) => {
      return {
        ...prop,
        id_index: key+1
      };
    })
  }

}
