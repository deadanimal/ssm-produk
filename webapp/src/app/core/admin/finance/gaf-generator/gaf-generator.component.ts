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

  // Date
  yesterday : Date = new Date();
  currentDate : Date = new Date();
  maxDate : string;
  minDate : string;

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
    this.yesterday.setDate(this.currentDate.getDate()-1)
    this.maxDate = this.yesterday.toISOString().split('T')[0]
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
    this.searchForm.controls['start_date'].patchValue(this.searchForm.value['start_date'] + 'T00:00:00.000000Z')
    this.searchForm.controls['end_date'].patchValue(this.searchForm.value['end_date'] + 'T23:59:59.000000Z')
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
        let fileName = 'xcess-gaf.txt';
        link.download = fileName;
        link.click();
      },
      (error) => {
        console.log('f ', error)
        this.loadingBar.complete()
      }
    )
  }

  setminDate(e) {

    document.getElementById('end_date').setAttribute('min',e)
  }

  setmaxDate(e){
    let year = e.slice(0,4)
    let month = e.slice(5,7)
    let day = e.slice(8,10)
    let daybefore = year + "/" + month + "/" + day
    let mindate = moment(daybefore,"YYYY/MM/DD").subtract(1,'days')
    let a = mindate.format("YYYY/MM/DD")
    
    console.log(a)
    console.log(year + " " + month + " " + day)
    document.getElementById('start_date').setAttribute('max',e)
  }

}
