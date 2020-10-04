import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {
  FormGroup,
  FormBuilder,
  Validators,
  FormControl,
} from '@angular/forms';

import { TransactionsService } from 'src/app/shared/services/transactions/transactions.service';
import { AuthService } from 'src/app/shared/services/auth/auth.service';
import { UsersService } from 'src/app/shared/services/users/users.service';
import { IpService } from 'src/app/shared/services/ip/ip.service';
import { Ip } from 'src/app/shared/services/ip/ip.model';

import swal from 'sweetalert2';
import { CartsService } from 'src/app/shared/services/carts/carts.service';

class PGInformation {
  transactionType: string
  paymentMethod: string
  serviceID: string
  paymentID: string
  orderNumber: string
  paymentDesc: string
  merchantName: string
  merchantReturnUrl: string
  merchantCallbackUrl: string
  amount: string
  currencyCode: string
  custIP: string
  custName: string
  custEmail: string
  custPhone: string
  hashValue: string
  merchantTermsUrl: string
  languageCode: string
  pageTimeout: string
}

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.scss'],
})
export class PaymentComponent implements OnInit {
  
  // get data from auth service
  egovPackage: string;
  userType: string;
  userID: string;
  showIcondiv = false;
  userdetails: any;
  userPackage: string;
  clientIP: Ip

  // Form
  transactionForm: FormGroup
  billingForm: FormGroup

  constructor(
    private authService: AuthService,
    private cartService: CartsService,
    private ipService: IpService,
    private transactionService: TransactionsService,
    private userService: UsersService,
    private fb: FormBuilder,
    private router: Router,
  ) {
    if (this.authService.userType) {
      this.userType = this.authService.userType;
    }

    if (this.authService.userID) {
      this.userID = this.authService.userID;
    }
  }

  ngOnInit(): void {
    this.transactionForm = this.fb.group({
      cart: new FormControl(''),
      total_amount: new FormControl(0)
    })

    this.billingForm = this.fb.group({
      name: new FormControl('', Validators.required),
      email_address: new FormControl('', Validators.required),
      phone_number: new FormControl('', Validators.required),
      address1: new FormControl('', Validators.required),
      address2: new FormControl('', Validators.required),
      address3: new FormControl('', Validators.required),
      postcode: new FormControl('', Validators.required),
      city: new FormControl('', Validators.required),
      state: new FormControl('', Validators.required),
      country: new FormControl('', Validators.required),
      ip: new FormControl('', Validators.required),
      cart: new FormControl('', Validators.required),
      total_amount: new FormControl(0)
    })
    console.log(this.billingForm)
    this.billingForm.controls['cart'].setValue(this.cartService.cart.id)
    this.getClientIP()
  }

  create() {
    console.log('Cart', this.cartService.cart)
    this.billingForm.controls['total_amount'].setValue(this.cartService.cart.total_price_before_tax)
    // let hashhhhhh = this.hashTheShit()

    // this.navigatePage('/payment')
    this.transactionService.create(this.billingForm.value).subscribe(
      () => {},
      () => {},
      () => {
        this.encode(this.transactionService.transaction.id)
      }
    )
  }

  encode(paymentID) {
    console.log('asd')
    console.log(paymentID)
    let itemz = {
      transactionType: 'SALE',
      paymentMethod: 'ANY',
      serviceID: 'SM2',
      paymentID: paymentID,
      orderNumber: 'OrderNumber',
      paymentDesc: 'PaymentDescription',
      merchantName: 'SSM',
      merchantReturnUrl: 'https://ssm-product-api.pipe.my/v1/transactions/pg_return/',
      amount: ((this.cartService.cart.total_price_before_tax/100).toFixed(2)).toString(),
      currencyCode: 'MYR',
      custIP: this.clientIP.ip,
      custName: this.billingForm.value['name'],
      custEmail: this.billingForm.value['email_address'],
      custPhone: this.billingForm.value['phone_number'],
      languageCode: 'MS',
      pageTimeout: '780'
    }

    this.transactionService.encode(itemz).subscribe(
      () => {},
      () => {},
      () => {
        // let dataz: any = {
        //   transactionType: 'SALE',
        //   paymentMethod: 'ANY',
        //   serviceID: 'SM2',
        //   paymentID: itemz.paymentID,
        //   orderNumber: 'ORDE124',
        //   paymentDesc: 'f13412412njndjsf',
        //   merchantName: 'SSM',
        //   merchantCallbackUrl: 'https://portal.ssm.prototype.com.my/#/payment/callback/',
        //   merchantReturnUrl: 'https://portal.ssm.prototype.com.my/#/payment/return',
        //   amount: '20.00',
        //   currencyCode: 'MYR',
        //   custIP: '1.1.1.1',
        //   custName: 'Amin',
        //   custEmail: 'aminredzuan@gmail.com',
        //   custPhone: '0176866917',
        //   hashValue: this.transactionService.encodedData,
        //   merchantTermsUrl: 'https://portal.ssm.prototype.com.my/#/terms/',
        //   languageCode: 'MS',
        //   pageTimeout: '780'
        // }
        let dataz = this.transactionService.encodedData
        // console.log(dataz)

        this.router.navigate(['/payment/to-confirm'], dataz)
      }
    )

  }

  successAlert(task) {
    swal
      .fire({
        title: 'Success',
        text: task,
        icon: 'success',
        // showCancelButton: true,
        buttonsStyling: false,
        confirmButtonText: 'Close',
        customClass: {
          cancelButton: 'btn btn-outline-success',
          confirmButton: 'btn btn-success ',
        },
      })
      .then((result) => {
        // console.log('confirm');
        window.location.reload();
        // this.navigatePage('/egov-details');
      }
    );
  }

  getClientIP(): any {
    // console.log('Nak dapat ip')
    this.ipService.get().subscribe(
      () => {
        this.clientIP = this.ipService.ip
        this.billingForm.controls['ip'].setValue(this.clientIP.ip)
        // console.log(this.clientIP.ip)
      }
    )
  }

  navigatePage(path: string) {
    // console.log('Path: ', path)
    this.router.navigate([path]);
  }

}

  
