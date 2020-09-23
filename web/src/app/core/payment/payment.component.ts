import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import swal from "sweetalert2";
import {
  FormGroup,
  FormBuilder,
  Validators,
  FormControl,
} from "@angular/forms";

import { TransactionsService } from "src/app/shared/services/transactions/transactions.service";
import { AuthService } from "src/app/shared/services/auth/auth.service";
import { UsersService } from "src/app/shared/services/users/users.service";
import { IpService } from 'src/app/shared/services/ip/ip.service';
import { Ip } from 'src/app/shared/services/ip/ip.model';

@Component({
  selector: "app-payment",
  templateUrl: "./payment.component.html",
  styleUrls: ["./payment.component.scss"],
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
    private UsersService: UsersService
  ) {
    this.userType = this.AuthService.userType;
    this.userID = this.AuthService.userID;
  }

  ngOnInit(): void {
    this.UsersService.getOne(this.userID).subscribe((res) => {
      this.userdetails = res;
      this.userPackage = this.userdetails.egov_package;
      console.log("this.egovPackage -> ", this.userPackage);
      console.log("this.userType -> ", this.userType);
      console.log("this.userID -> ", this.userID);
      this.egovPackage = this.userdetails.egov_package;
      if (this.userdetails.user_type == "EG") {
        this.showIcondiv == false;
      }

      console.log("data = ", this.userdetails.user_type);
      // console.log("Svc: ", this.tableRows);
    });

    this.newBillingForm = this.formBuilder.group({
      // id: new FormControl(""),
      name: new FormControl("", Validators.required),
      payment_method: new FormControl('DD', Validators.required),
      amount: new FormControl('', Validators.required)
    });

    this.transactionForm = this.formBuilder.group({
      TransactionType: new FormControl('SALE', Validators.required),
      PymtMethod: new FormControl('', Validators.required),
      ServiceID: new FormControl('', Validators.required),
      PaymentID: new FormControl('', Validators.required),
      OrderNumber: new FormControl('', Validators.required),
      PaymentDesc: new FormControl('', Validators.required),
      MerchantName: new FormControl('', Validators.required),
      MerchantReturnURL: new FormControl('', Validators.required),
      MerchantCallbackURL: new FormControl('', Validators.required),
      Amount: new FormControl('', Validators.required),
      CurrencyCode: new FormControl('MYR', Validators.required),
      CustIP: new FormControl('', Validators.required),
      CustName: new FormControl('', Validators.required),
      CustEmail: new FormControl('', Validators.required),
      CustPhone: new FormControl('', Validators.required),
      HashValue: new FormControl(Validators.required),
      MerchantTermsURL: new FormControl('http://merchA.merchdomain.com/terms.html', Validators.required),
      LanguageCode: new FormControl('en', Validators.required),
      PageTimeout: new FormControl('780', Validators.required),
    })
  }

  addNewBillingData() {
    console.log("payment data -> ", this.newBillingForm);
    this.TransactionsService.create(this.newBillingForm.value).subscribe(
      (res) => {
        console.log(res);
        // this.successAlert("Successfully Save Data");
      },
      (err) => {
        console.log(err);
        // this.loadingBar.complete();
        // this.errorMessage();
        // console.log("HTTP Error", err), this.errorMessage();
      },
      () => console.log("HTTP request completed.")
    );
  }

  navigatePage(path: string) {
    // console.log('Path: ', path)
    this.router.navigate([path]);
  }

  makePayment() {
    swal
      .fire({
        title: "Confirmation",
        text: "Payment successfully been made!",
        icon: "info",
        buttonsStyling: false,
        confirmButtonText: "Okay",
        customClass: {
          confirmButton: "btn btn-primary ",
        },
      })
      .then((result) => {
        // if (result.value) {
        //   this.router.navigate(["/orders"]);
        // }
        this.addNewBillingData();
      });
    console.log("confirm");
  }

  successAlert(task) {
    swal
      .fire({
        title: "Success",
        text: task,
        icon: "success",
        // showCancelButton: true,
        buttonsStyling: false,
        confirmButtonText: "Close",
        customClass: {
          cancelButton: "btn btn-outline-success",
          confirmButton: "btn btn-success ",
        },
      })
      .then((result) => {
        // console.log("confirm");
        window.location.reload();
        // this.navigatePage("/egov-details");
      });
  }

  calculateAmount() {
    console.log('Amount calculated')
  }

  tryMakePayment() {
    console.log('Payment made')
    this.transactionForm.setValue['PymtMethod'] = this.newBillingForm.get('payment_method').value
    this.transactionForm.setValue['ServiceID'] = 'SM2'
    this.transactionForm.setValue['PaymentID'] = ''
    this.transactionForm.setValue['OrderNumber'] = ''
    this.transactionForm.setValue['PaymentDesc'] = ''
    this.transactionForm.setValue['MerchantCallbackURL'] = ''
    this.transactionForm.setValue['Amount'] = ''
    this.transactionForm.setValue['CustName'] = ''
    this.transactionForm.setValue['CustIP'] = this.clientIP.ip
    this.transactionForm.setValue['CustEmail'] = ''
    this.transactionForm.setValue['CustPhone'] = ''
    this.transactionForm.setValue['HashValue'] = ''
    this.transactionForm.setValue['MerchantTermsURL'] = 'http://localhost:4200/#/terms-conditions'
  }

  getClientIP() {
    this.IpService.get().subscribe(
      () => {
        this.clientIP = this.IpService.ip
      }
    )
  }

}
