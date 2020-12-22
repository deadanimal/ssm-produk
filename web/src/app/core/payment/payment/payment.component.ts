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
import { User } from 'src/app/shared/services/users/users.model';

import { environment } from 'src/environments/environment';
 
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
  
  // Data
  clientInfo: User
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
    
  }

  ngOnInit(): void {
    // console.log(this.billingForm)
    this.initForm()
    this.billingForm.controls['cart'].setValue(this.cartService.cart.id)
    this.getClientIP()
    this.getBillingInfo()
  }

  initForm() {
    this.transactionForm = this.fb.group({
      cart: new FormControl(''),
      total_amount: new FormControl(0)
    })

    this.billingForm = this.fb.group({
      name: new FormControl('Amin Redzuan', Validators.required),
      email_address: new FormControl('aminredzuan@gmail.com', Validators.required),
      phone_number: new FormControl('0176866182', Validators.required),
      address1: new FormControl('Address 1', Validators.required),
      address2: new FormControl(null),
      address3: new FormControl(null),
      postcode: new FormControl('41200', Validators.required),
      city: new FormControl('Petaling Jaya', Validators.required),
      state: new FormControl('Selangor', Validators.required),
      country: new FormControl('Malaysia', Validators.required),
      ip: new FormControl('', Validators.required),
      cart: new FormControl('', Validators.required),
      total_amount: new FormControl(0)
    })
  }

  getBillingInfo() {
    if (this.userService.user) {
      this.clientInfo = this.userService.user
      this.billingForm.controls['name'].setValue(this.clientInfo.full_name)
      this.billingForm.controls['email_address'].setValue(this.clientInfo.email)
      this.billingForm.controls['phone_number'].setValue(this.clientInfo.phone_number)
      this.billingForm.controls['address1'].setValue(this.clientInfo.address_1)
      this.billingForm.controls['address1'].setValue(this.clientInfo.address_2)
      this.billingForm.controls['postcode'].setValue(this.clientInfo.postcode)
      this.billingForm.controls['city'].setValue(this.clientInfo.city)
      this.billingForm.controls['state'].setValue(this.clientInfo.state)
      this.billingForm.controls['country'].setValue(this.clientInfo.country)
    }
  }

  getClientIP(): any {
    this.ipService.get().subscribe(
      () => {
        this.clientIP = this.ipService.ip
        this.billingForm.controls['ip'].setValue(this.clientIP.ip)
      }
    )
  }

  create() {
    // console.log('Cart', this.cartService.cart)
    this.billingForm.controls['total_amount'].setValue(this.cartService.cart.total_price_before_tax)
    // this.navigatePage('/payment')
    this.transactionService.create(this.billingForm.value).subscribe(
      () => {},
      () => {},
      () => {
        this.encode(this.transactionService.transaction.id)
      }
    )
  }

  resetForm() {
    this.billingForm.controls['name'].setValue('')
    this.billingForm.controls['email_address'].setValue('')
    this.billingForm.controls['phone_number'].setValue('')
    this.billingForm.controls['address1'].setValue('')
    this.billingForm.controls['address2'].setValue('')
    this.billingForm.controls['address3'].setValue('')
    this.billingForm.controls['postcode'].setValue('')
    this.billingForm.controls['city'].setValue('')
    this.billingForm.controls['state'].setValue('')
    this.billingForm.controls['country'].setValue('')
  }

  // 'https://ssm-product-api.pipe.my/v1/transactions/pg_return/',
  // 'http://afeezaziz.ngrok.io/v1/transactions/pg_return/'
  encode(paymentID) {
    // console.log('asd')
    // console.log(paymentID)
    let itemz = {
      transactionType: 'SALE',
      paymentMethod: 'ANY',
      serviceID: 'SM2',
      paymentID: paymentID,
      orderNumber: 'OrderNumber',
      paymentDesc: 'PaymentDescription',
      merchantName: 'SSM',
      merchantReturnUrl: environment.baseUrl + 'v1/transactions/pg_return/',
      merchantCallbackUrl: environment.baseUrl + 'v1/transactions/callback/',
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
        let dataz = this.transactionService.encodedData
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

  navigatePage(path: string) {
    // console.log('Path: ', path)
    this.router.navigate([path]);
  }

}

  
