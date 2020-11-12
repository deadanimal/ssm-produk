import { Component, OnInit } from '@angular/core';
import * as xlsx from 'xlsx';
import * as moment from 'moment';
import { TransactionsService } from 'src/app/shared/services/transactions/transactions.service';
import { LoadingBarService } from '@ngx-loading-bar/core';

@Component({
  selector: 'app-gaf-generator',
  templateUrl: './gaf-generator.component.html',
  styleUrls: ['./gaf-generator.component.scss']
})
export class GafGeneratorComponent implements OnInit {

  // Checker
  isHidden = true
  transactions: any[] = []
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
        this.loadingBar.complete()
      }
    )
  }

  exportCsv() {
    let fileName = 'GAF.txt'
    let element = document.getElementById('reportTable'); 
    const ws: xlsx.WorkSheet = xlsx.utils.table_to_sheet(element);

    /* generate workbook and add the worksheet */
    const wb: xlsx.WorkBook = xlsx.utils.book_new();

    xlsx.utils.book_append_sheet(wb, ws, 'Sheet1');

    /* save to file */
    xlsx.writeFile(wb, fileName);
  }

}
