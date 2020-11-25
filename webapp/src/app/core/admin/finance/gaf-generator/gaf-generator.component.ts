import { Component, OnInit } from '@angular/core';
import * as xlsx from 'xlsx';
import * as moment from 'moment';
import { TransactionsService } from 'src/app/shared/services/transactions/transactions.service';
import { LoadingBarService } from '@ngx-loading-bar/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-gaf-generator',
  templateUrl: './gaf-generator.component.html',
  styleUrls: ['./gaf-generator.component.scss']
})
export class GafGeneratorComponent implements OnInit {

  // Checker
  isHidden = true
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

  initForm() {
    this.searchForm = this.fb.group({
      // type: new FormControl('csv'),
      start_date: new FormControl(null),
      end_date: new FormControl(null)
    })
  }

  generateGaf() {
    this.loadingBar.start()
    this.searchForm.controls['start_date'].setValue(this.searchForm.value['start_date'] + 'T08:00:00.000000Z')
    this.searchForm.controls['end_date'].setValue(this.searchForm.value['end_date'] + 'T08:00:00.000000Z')
    console.log(this.searchForm.value)
    this.transactionService.generateGaf(this.searchForm.value).subscribe(
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
        let fileName = 'xcess-gaf';
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
