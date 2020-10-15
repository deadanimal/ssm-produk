import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TransactionsService } from 'src/app/shared/services/transactions/transactions.service';
import Swal from 'sweetalert2';

import * as moment from 'moment';

@Component({
  selector: 'app-payment-return',
  templateUrl: './payment-return.component.html',
  styleUrls: ['./payment-return.component.scss']
})
export class PaymentReturnComponent implements OnInit {

  // Data
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
        this.loadedData = this.transactionService.transactionsFiltered[0]
        // console.log('ini lah data yang di load itu', this.loadedData)
        this.loadedData.created_date = moment(this.loadedData.created_date).format('DD/MM/YYYY hh:mm a')
        let year = (moment(this.loadedData.created).year()).toString()
        let month = (moment(this.loadedData.created).month() + 1).toString()
        let day = (moment(this.loadedData.created).date()).toString()
        console.log(year, month, day)
        this.loadedData['reference_no_new'] = 'PD' + year + month + day + this.loadedData['reference_no'].slice(6,12)
        this.loadedData['receipt_no'] = 'PP' + year + month + day + this.loadedData['reference_no'].slice(6,12)
      },
      () => {},
      () => {
        // this.success()
        // this.router.navigate(['/orders'])
        if (this.loadedData.payment_status == 'OK') {
          this.success()
        }
        else {
          this.failed()
        }
      }
    )
  }

  success() {
    Swal.fire({
      title: 'Success',
      text: 'Payment succesful',
      icon: 'success',
      html: '<div class="row"><div class="col"><div class="row"><div class="col"><p class="mb-0 text-light">Date time</p>'+
            '<p claass="mt-0">'+ this.loadedData.created_date +'</p></div></div><div class="row"><div class="col">'+
            '<p class="mb-0 text-light">Status</p><p claass="mt-0">Success</p></div></div></div><div class="col">'+
            '<div class="row"><div class="col"><p class="mb-0 text-light">Reference</p><p claass="mt-0">'+
            this.loadedData.reference_no_new +'</p></div></div><div class="row"><div class="col"><p class="mb-0 text-light">Description</p>'+
            '<p class="mt-0">Purchase of product</p></div></div></div></div>',
      buttonsStyling: false,
      confirmButtonText: 'View receipt',
      customClass: {
        confirmButton: 'btn btn-success rounded-pill',
      },
    }).then((res) => {
      if (res) {
        this.router.navigate(['/payment/receipt'])
        // this.router.navigate(['/profile'], {queryParams: {tab: 'order'}})
      } 
    })
  }

  failed() {
    Swal.fire({
      title: 'Unsuccessful',
      text: 'Payment unsuccesful',
      icon: 'error',
      html: '<div class="row"><div class="col"><div class="row"><div class="col"><p class="mb-0 text-light">Date time</p>'+
            '<p claass="mt-0">'+ this.loadedData.created_date +'</p></div></div><div class="row"><div class="col">'+
            '<p class="mb-0 text-light">Status</p><p claass="mt-0">Unsuccessful</p></div></div></div><div class="col">'+
            '<div class="row"><div class="col"><p class="mb-0 text-light">Reference</p><p claass="mt-0">'+
            this.loadedData.reference_no_new +'</p></div></div><div class="row"><div class="col"><p class="mb-0 text-light">Description</p>'+
            '<p class="mt-0">Purchase of product</p></div></div></div></div>',
      buttonsStyling: false,
      showCancelButton: true,
      confirmButtonText: 'Retry',
      cancelButtonText: 'Cancel',
      customClass: {
        confirmButton: 'btn btn-warning rounded-pill',
        cancelButton: 'btn btn-outline-warning rounded-pill'
      },
    }).then((res) => {
      if (res) {
        this.router.navigate(['/cart/checkout'])
      }
      else {
        this.router.navigate(['/home'])
      }
    })
  }



  // straight g orders
  // 1 - Make a call to API find transaction = reference no
  // 2 - Ada cart
  // 3 - Find entity and jenis product

}
