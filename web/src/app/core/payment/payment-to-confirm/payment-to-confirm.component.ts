import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import * as moment from 'moment';
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
  hash_value: string
  payment_id: string
  order_number: string
  pageTimeout: string
}

@Component({
  selector: 'app-payment-to-confirm',
  templateUrl: './payment-to-confirm.component.html',
  styleUrls: ['./payment-to-confirm.component.scss']
})
export class PaymentToConfirmComponent implements OnInit {

  public paymentInfo: PGInformation
  public dataReceived: any

  constructor(
    private router: Router
  ) { 
    this.dataReceived = this.router.getCurrentNavigation().extras as PGInformation
    this.paymentInfo = this.dataReceived
    console.log(this.dataReceived)
    this.initData()

  }

  ngOnInit(): void {
    this.initData()
    
    setTimeout(() => {
      let url = 'https://test2pay.ghl.com/IPGSG/Payment.aspx'
      

      window.location.href = (url 
        + '?TransactionType=' + this.paymentInfo.transactionType
        + '&PymtMethod=' + this.paymentInfo.paymentMethod
        + '&ServiceID=' + this.paymentInfo.serviceID
        + '&PaymentID=' + this.paymentInfo.payment_id
        + '&OrderNumber=' + this.paymentInfo.orderNumber
        + '&PaymentDesc=' + this.paymentInfo.paymentDesc
        + '&MerchantReturnURL=' + environment.baseUrl + 'v1/transactions/pg_return/'
        // + '&MerchantCallbackURL=' + this.paymentInfo.merchantCallbackUrl
        + '&Amount=' + this.paymentInfo.amount
        + '&CurrencyCode=' + this.paymentInfo.currencyCode
        + '&CustIP=' + this.paymentInfo.custIP
        + '&CustName=' + this.paymentInfo.custName
        + '&CustEmail=' + this.paymentInfo.custEmail
        + '&CustPhone=' + this.paymentInfo.custPhone
        + '&HashValue=' + this.paymentInfo.hash_value
        //+ '&MerchantTermsURL=' + this.paymentInfo.merchantTermsUrl
        //+ '&LanguageCode=' + this.paymentInfo.languageCode
        + '&PageTimeout='+ this.paymentInfo.pageTimeout
    );
    }, 10)
    //window.location.href = url;
  }

  // https://test2pay.ghl.com/IPGSG/Payment.aspx?TransactionType=SALE&PymtMethod=ANY&ServiceID=A124&PaymentID=PYME1&OrderNumber=ORDE124&PaymentDesc=f13412412njndjsf&MerchantReturnURL=https://portal.ssm.prototype.com.my/#/payment/return/&MerchantCallbackURL=https://portal.ssm.prototype.com.my/#/payment/callback/&Amount=20.00&CurrencyCode=MYR&CustIP=1.1.1.1&CustName=Amin&CustEmail=aminredzuan@gmail.com&CustPhone=0176866917&HashValue=9aade2d55524c1bc511e03df88218cd0f37e3ba5ce9c300429bf1d24f7df4d06&MerchantTermsURL=https://portal.ssm.prototype.com.my/#/terms-conditions/&LanguageCode=MS&PageTimeout=780

  initData() {
    this.paymentInfo.transactionType = this.dataReceived.transactionType
    this.paymentInfo.paymentMethod = this.dataReceived.paymentMethod
    this.paymentInfo.serviceID = this.dataReceived.serviceID
    this.paymentInfo.paymentID = this.dataReceived.paymentID
    this.paymentInfo.orderNumber = this.dataReceived.orderNumber
    this.paymentInfo.paymentDesc = this.dataReceived.paymentDesc
    this.paymentInfo.merchantName = this.dataReceived.merchantName
    this.paymentInfo.merchantReturnUrl = this.dataReceived.merchantReturnUrl
    this.paymentInfo.merchantCallbackUrl = this.dataReceived.merchantCallbackUrl
    this.paymentInfo.amount = this.dataReceived.amount
    this.paymentInfo.currencyCode = this.dataReceived.currencyCode
    this.paymentInfo.custIP = this.dataReceived.custIP
    this.paymentInfo.custName = this.dataReceived.custName
    this.paymentInfo.custEmail = this.dataReceived.custEmail
    this.paymentInfo.custPhone = this.dataReceived.custPhone
    this.paymentInfo.hashValue = this.dataReceived.hashValue
    this.paymentInfo.merchantTermsUrl = this.dataReceived.merchantTermsUrl
    this.paymentInfo.languageCode = this.dataReceived.languageCode
    this.paymentInfo.pageTimeout = this.dataReceived.pageTimeout
  }

}


