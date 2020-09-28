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

import * as sha from 'js-sha256'
import swal from 'sweetalert2';
import { ProductCartsService } from 'src/app/shared/services/product-carts/product-carts.service';

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
  newBillingForm: FormGroup;
  transactionForm: FormGroup

  constructor(
    private router: Router,
    private TransactionsService: TransactionsService,
    private formBuilder: FormBuilder,
    private AuthService: AuthService,
    private IpService: IpService,
    private UsersService: UsersService,
    private cartService: ProductCartsService
  ) {
    this.userType = this.AuthService.userType;
    this.userID = this.AuthService.userID;
  }

  ngOnInit(): void {
    this.UsersService.getOne(this.userID).subscribe((res) => {
      this.userdetails = res;
      this.userPackage = this.userdetails.egov_package;
      console.log('this.egovPackage -> ', this.userPackage);
      console.log('this.userType -> ', this.userType);
      console.log('this.userID -> ', this.userID);
      this.egovPackage = this.userdetails.egov_package;
      if (this.userdetails.user_type == 'EG') {
        this.showIcondiv == false;
      }

      console.log('data = ', this.userdetails.user_type);
      // console.log('Svc: ', this.tableRows);
    });

    this.newBillingForm = this.formBuilder.group({
      // id: new FormControl(''),
      name: new FormControl('', Validators.required),
      payment_method: new FormControl('DD', Validators.required),
      amount: new FormControl('', Validators.required)
    });

    this.transactionForm = this.formBuilder.group({
      name: new FormControl('Test'),
      cart: new FormControl('')
    })

    // this.getClientIP()
  }

  addNewBillingData() {
    console.log('payment data -> ', this.newBillingForm);
    this.TransactionsService.create(this.newBillingForm.value).subscribe(
      (res) => {
        console.log(res);
        // this.successAlert('Successfully Save Data');
      },
      (err) => {
        console.log(err);
        // this.loadingBar.complete();
        // this.errorMessage();
        // console.log('HTTP Error', err), this.errorMessage();
      },
      () => console.log('HTTP request completed.')
    );
  }

  navigatePage(path: string) {
    // console.log('Path: ', path)
    this.router.navigate([path]);
  }

  makePayment() {
    swal
      .fire({
        title: 'Confirmation',
        text: 'Payment successfully been made!',
        icon: 'info',
        buttonsStyling: false,
        confirmButtonText: 'Okay',
        customClass: {
          confirmButton: 'btn btn-primary ',
        },
      })
      .then((result) => {
        // if (result.value) {
        //   this.router.navigate(['/orders']);
        // }
        this.addNewBillingData();
      });
    console.log('confirm');
    // this.tryMakePayment()
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
      });
  }

  calculateAmount() {
    console.log('Amount calculated')
  }

  tryMakePayment() {

    // this.pay().subscribe()
  }


  create() {
    let cart
    // console.log('gege', cart)
    this.cartService.ProductCarts.forEach(
      (product) => {
        if (!cart) {
          cart = product
        }
      }
    )
    console.log('gege', cart)
    this.transactionForm.controls['cart'].setValue(cart.id)
    // let hashhhhhh = this.hashTheShit()

    // this.navigatePage('/payment')
    this.TransactionsService.create(this.transactionForm.value).subscribe(
      () => {},
      () => {},
      () => {
        this.encode(this.TransactionsService.transaction.id)
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
      orderNumber: 'ORDE124',
      paymentDesc: 'f13412412njndjsf',
      merchantName: 'SSM',
      merchantCallbackUrl: 'https://portal.ssm.prototype.com.my/#/payment/callback/',
      merchantReturnUrl: 'https://syafiqbasri.ngrok.io/v1/transactions/pg_return/',
      amount: '20.00',
      currencyCode: 'MYR',
      custIP: '1.1.1.1',
      custName: 'Amin',
      custEmail: 'aminredzuan@gmail.com',
      custPhone: '0176866917',
      merchantTermsUrl: 'https://portal.ssm.prototype.com.my/#/terms/',
      languageCode: 'MS',
      pageTimeout: '780'
    }

    this.TransactionsService.encode(itemz).subscribe(
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
        //   hashValue: this.TransactionsService.encodedData,
        //   merchantTermsUrl: 'https://portal.ssm.prototype.com.my/#/terms/',
        //   languageCode: 'MS',
        //   pageTimeout: '780'
        // }
        let dataz = this.TransactionsService.encodedData
        console.log(dataz)

        this.router.navigate(['/payment/to-confirm'], dataz)
      }
    )

  }

}

  // getClientIP(): any {
  //   console.log('Nak dapat ip')
  //   this.IpService.get().subscribe(
  //     () => {
  //       this.clientIP = this.IpService.ip
  //       console.log(this.clientIP)
  //     }
  //   )
  // }

  // hashTheShit() {
  //   let merchantPwd = 'sm212345'
  //   let merchantID = 'SM2'
  //   let paymentID = 'ajfka14891'
  //   let merchantReturnURL = 'http://localhost:4200/#/terms-conditions'
  //   let amount = '100'
  //   let currencyCode = 'MYR'
  //   let custIP = '1.1.1.1'
  //   let pageTimeout = '780'
  //   // Password + ServiceID + PaymentID + MerchantReturnURL + MerchantApprovalURL + MerchantUnApprovalURL + MerchantCallBackURL + Amount + CurrencyCode + CustIP + PageTimeout + CardNo + Token
  //   let valueToHash = merchantPwd+merchantID+paymentID+merchantReturnURL+amount+currencyCode+custIP+pageTimeout
  //   console.log('val', sha.sha256(valueToHash))
  //   return sha.sha256(valueToHash)
  // }

