import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { CartsService } from 'src/app/shared/services/carts/carts.service';
import { TransactionsService } from 'src/app/shared/services/transactions/transactions.service';

import * as moment from 'moment';
import { CartExtended, CartItemExtended } from 'src/app/shared/services/carts/carts.model';
import { LocalFilesService } from 'src/app/shared/services/local-files/local-files.service';

import * as domtoimage from 'dom-to-image';
import * as FileSaver from 'file-saver';
// import jsPDF from 'jspdf';
declare var jsPDF: any;

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

  //
  @ViewChild('receipt') receipt: ElementRef;

  constructor(
    private transactionService: TransactionsService,
    private cartService: CartsService,
    private fileService: LocalFilesService,
    private router: Router
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
        this.cart['created_date'] = moment(this.cart['created_date']).format('DD/MM/YYYY hh:mm:ss')
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
    const doc = new jsPDF();
    const specialElementHandlers = {
      '#editor': function (element, renderer) {
        return true;
      }
    };

    const content = this.receipt.nativeElement;

    doc.fromHTML(content.innerHTML, 15, 15, {
      'width': 190,
      'elementHandlers': specialElementHandlers
    });

    doc.save('receipt' + '.pdf');
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
