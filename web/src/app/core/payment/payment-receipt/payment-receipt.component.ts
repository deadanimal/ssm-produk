import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { CartsService } from 'src/app/shared/services/carts/carts.service';
import { TransactionsService } from 'src/app/shared/services/transactions/transactions.service';

import * as moment from 'moment';
import { CartExtended, CartItemExtended } from 'src/app/shared/services/carts/carts.model';
import { LocalFilesService } from 'src/app/shared/services/local-files/local-files.service';

// import * as html2pdf from 'html2pdf.js';

@Component({
  selector: 'app-payment-receipt',
  templateUrl: './payment-receipt.component.html',
  styleUrls: ['./payment-receipt.component.scss']
})
export class PaymentReceiptComponent implements OnInit {

  transaction: any
  cart: CartExtended
  items: CartItemExtended[] = []
  formTypes: any[] = []

  // Checker
  isReceipt = false

  // Receipt

  constructor(
    private transactionService: TransactionsService,
    private cartService: CartsService,
    private fileService: LocalFilesService,
    private router: Router,
  ) { 
    this.getData()
  }

  ngOnInit(): void {
    // if (!this.transaction) {
    //   this.navigatePage('/home')
    // }
  }

  getData() {
    // console.log('data nak get sini')
    this.fileService.get('form-types.json').subscribe(
      (res) => {
        this.formTypes = res
        // console.log(this.formTypes)
      }
    )

    this.transaction = this.transactionService.transactionsFiltered[0]
    this.cartService.getOne(this.transaction['cart']).subscribe(
      (res) => {
        // console.log('res ', res)
        this.cart = res
        let cr_date = this.cart['created_date']
        this.cart['created_date'] = moment(cr_date).format('DD/MM/YYYY hh:mm:ss')
        let year = (moment(cr_date).year()).toString()
        let month = (moment(cr_date).month() + 1).toString()
        let day = (moment(cr_date).date()).toString()
        console.log(year, month, day)
        this.transaction['reference_no_new'] = 'PD' + year + month + day + this.transaction['reference_no'].slice(6,12)
        this.transaction['receipt_no'] = 'PP' + year + month + day + this.transaction['reference_no'].slice(6,12)
      },
      () => {},
      () => {
        let cnt = 0
        this.cart['cart_item'].forEach(
          (itemz) => {
            cnt++
            itemz['index'] = cnt
            itemz.created_date = moment(itemz['created_date']).format('DD/MM/YYYY hh:mm:ss')
            if (itemz['image_form_type']) {
              this.formTypes.forEach(
                (code) => {
                  if (code.code == itemz['image_form_type']) {
                    itemz['image_form_type'] = code.desc_en
                  } 
                }
              )
            }
          }
        )
        // console.log('item: ', this.cart)
        // console.log('cart_item: ', this.cart['cart_item'])
        this.isReceipt = true
        // console.log('asdas', this.ca
        this.items = this.cart['cart_item']
        // console.log(this.cart['cart_item'])


      }
    )
  }

  downloadReceipt() {
    // this.exportService.save(this.exportAsConfig, 'Receipt').subscribe(() => {
    //   // save started
    // });
    // const options = {
    //   filename: 'Receipt.pdf',
    //   image: {type: 'png'},
    //   htmltocanvas: 'scale: 2',
    //   jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' }

    // }

    // const content: Element = document.getElementById('receipt')

    // html2pdf()
    //   .from(content)
    //   .set(options)
    //   .save()
    let url = this.transaction.receipt
    window.open(url, '_blank');
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
