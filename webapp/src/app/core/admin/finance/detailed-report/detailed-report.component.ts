import { Component, OnInit } from '@angular/core';
import { TransactionsService } from 'src/app/shared/services/transactions/transactions.service';

import * as moment from 'moment';
import { LoadingBarService } from '@ngx-loading-bar/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-detailed-report',
  templateUrl: './detailed-report.component.html',
  styleUrls: ['./detailed-report.component.scss']
})
export class DetailedReportComponent implements OnInit {

  // Table
  tableEntries: number = 10
  tableSelected: any[] = []
  tableTemp = []
  tableActiveRow: any
  tableRows: any[] = []

  transactions: any[] = []

  searchForm: FormGroup

  constructor(
    private transactionService: TransactionsService,
    private loadingBar: LoadingBarService,
    private fb: FormBuilder
  ) { 
    // this.getData()
  }

  ngOnInit() {
    this.initForm()
  }

  initForm() {
    this.searchForm = this.fb.group({
      type: new FormControl('csv'),
      start_date: new FormControl(null),
      end_date: new FormControl(null)
    })
  }

  getData() {
    this.loadingBar.start()
    this.transactionService.getTransactionsWCart().subscribe(
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

  generateReport() {
    this.loadingBar.start()
    this.searchForm.controls['start_date'].setValue(this.searchForm.value['start_date'] + 'T08:00:00.000000Z')
    this.searchForm.controls['end_date'].setValue(this.searchForm.value['end_date'] + 'T08:00:00.000000Z')
    console.log(this.searchForm.value)
    this.transactionService.generateTable(this.searchForm.value).subscribe(
      (res) => {
        this.loadingBar.complete()
        console.log(res)
        console.log('co')
        const blob = new Blob([res], { type: 'application/octet-stream' });
        // const url = window.URL.createObjectURL(blob);
        // console.log(url)
        // window.open(url, '_blank');
        let link = document.createElement('a');
        link.href = window.URL.createObjectURL(blob);
        let fileName = '';
        if (this.searchForm.value['type'] == 'excel') {
          fileName='xcess-mtt.xlsx'
        }
        else {
          fileName='xcess-mtt.csv'
        }
        link.download = fileName;
        link.click();
      },
      (error) => {
        console.log('f ', error)
        this.loadingBar.complete()
      }
    )
  }

}
