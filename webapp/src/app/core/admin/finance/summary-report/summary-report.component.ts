import { Component, OnInit } from '@angular/core';
import { TransactionsService } from 'src/app/shared/services/transactions/transactions.service';

import * as xlsx from 'xlsx';
import * as moment from 'moment';
import { LoadingBarService } from '@ngx-loading-bar/core';

@Component({
  selector: 'app-summary-report',
  templateUrl: './summary-report.component.html',
  styleUrls: ['./summary-report.component.scss']
})
export class SummaryReportComponent implements OnInit {

  // Table
  tableEntries: number = 10
  tableSelected: any[] = []
  tableTemp = []
  tableActiveRow: any
  tableRows: any[] = []

  transactions: any[] = []

  tableShow = false

  is_show = {
    name: false, //
    date: false, //
    amount: false, //
    address1: false, //
    address2: false, //
    address3: false, //
    city: false, //
    postcode: false, //
    state: false, //
    country: false, //
    email_address: false,
    payment_status: false, //
    payment_method: false,  //
    receipt_no: false, //
    reference: false, //
    reference_no: false, //
    transaction_id: false, //
    total_amount: false //
  }

  constructor(
    private transactionService: TransactionsService,
    private loadingBar: LoadingBarService
  ) { 
    this.getData()
  }

  ngOnInit() {
  }

  getData() {
    this.loadingBar.start()
    this.transactionService.getTransactions().subscribe(
      (res) => {
        this.transactions = res
        console.log('TRX', this.transactions)
      },
      () => {
        this.loadingBar.complete()
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
        this.loadingBar.complete()
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

  showTable() {
    let counter = 0
    for ( let x in this.is_show) {
      if (this.is_show[x]) {
        counter++
      }
    }

    if (counter < 6) {
      this.tableShow = true
    }
    else {
      console.log('bluek')
    }
  }

  onChange() {
    let counter = 0
    for ( let x in this.is_show) {
      if (this.is_show[x]) {
        counter++
      }
    }

    if (counter > 5) {
      console.log('bluek')
      this.tableShow = false
    }
  }

  exportExcel() {
    let fileName = 'summary_report_finance.xlsx'
    let element = document.getElementById('report_finance'); 
    const ws: xlsx.WorkSheet =xlsx.utils.table_to_sheet(element);

    /* generate workbook and add the worksheet */
    const wb: xlsx.WorkBook = xlsx.utils.book_new();
    xlsx.utils.book_append_sheet(wb, ws, 'Sheet1');

    /* save to file */
    xlsx.writeFile(wb, fileName);
  }

}
