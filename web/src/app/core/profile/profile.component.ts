import { Component, OnInit, TemplateRef } from "@angular/core";
import { BsModalRef, BsModalService } from "ngx-bootstrap/modal";
import swal from "sweetalert2";
import {
  FormGroup,
  FormBuilder,
  Validators,
  FormControl,
} from "@angular/forms";
import { Router, ActivatedRoute } from "@angular/router";

// user service
import { UsersService } from "src/app/shared/services/users/users.service";

// auth service
import { AuthService } from "src/app/shared/services/auth/auth.service";

// request
import { InvestigationTicketsService } from "src/app/shared/services/investigation-tickets/investigation-tickets.service";
import { TransactionsService } from 'src/app/shared/services/transactions/transactions.service';

import * as moment from 'moment';
import { CartsService } from 'src/app/shared/services/carts/carts.service';
import { ProductsService } from 'src/app/shared/services/products/products.service';
import { NgxSpinnerService } from 'ngx-spinner';

export enum SelectionType {
  single = 'single',
  multi = 'multi',
  multiClick = 'multiClick',
  cell = 'cell',
  checkbox = 'checkbox',
}

@Component({
  selector: "app-profile",
  templateUrl: "./profile.component.html",
  styleUrls: ["./profile.component.scss"],
})
export class ProfileComponent implements OnInit {

  // Modal
  modal: BsModalRef;
  modalTransactionDetail: BsModalRef;
  modalConfig = {
    keyboard: true,
    // class: "modal-dialog-centered",
  };

  showpiv = false;
  showdoc = true;

  // array
  user_obj: any;

  // get data from auth service
  egovPackage: string;
  userType: String;
  userID: String;
  userEmail: String;
  userFullname: string;
  userNric: String;
  UserHOD: string;
  showIcondiv = false;
  userdetails: any;
  userPackage: string;
  userQuota: any;
  formStatus = true;
  showSubmitButton = false;
  showRequestQuotaButton = false;
  showRequestInvestigationList = true;
  showRequestInvestigationAdd = false;
  InvestigationList: any;
  listNp = "0";
  runningNo = "2020061001";
  id = "b4d3fc09-2523-40f9-81bf-333960bbd611";
  intervalLogin: any;
  infodata: any;

  /// form
  requestInvestigationDocForm: FormGroup;
  updateUserInfoForm: FormGroup;

  // Table
  tableEntries: number = 10
  tableSelected: any[] = []
  tableTemp = []
  tableActiveRow: any
  tableRows: any[] = []
  SelectionType = SelectionType

  tableOrderEntries: number = 10
  tableOrderSelected: any[] = []
  tableOrderTemp = []
  tableOrderActiveRow: any
  tableOrderRows: any[] = []

  // Data
  transactions: any[] = []
  orders: any[] = []

  constructor(
    private modalService: BsModalService,
    private formBuilder: FormBuilder,
    private AuthService: AuthService,
    private UsersService: UsersService,
    private InvestigationTicketsService: InvestigationTicketsService,
    private router: Router,
    private transactionService: TransactionsService,
    private cartService: CartsService,
    private productService: ProductsService,
    private spinner: NgxSpinnerService,
  ) {}

  ngOnInit(): void {
    // this.intervalLogin = setInterval(() => {
    //   this.autoLogin();
    // }, 1000);
    // console.log("asdasdad -> ", this.AuthService.userID);
    this.user_obj = this.AuthService.decodedToken();
    // console.log("user_obj => ", this.user_obj);

    // if (
    //   this.AuthService.userID != undefined ||
    //   this.user_obj.user_id != undefined
    // ) {
    //   this.userType = this.AuthService.userType;

    //   if (this.AuthService.userID != undefined) {
    //     this.userID = this.AuthService.userID;
    //   } else {
    //     this.userID = this.user_obj.user_id;
    //   }

    //   // this.UsersService.getOne(this.id).subscribe((res) => {
    //   //   this.userdetails = res;
    //   //   console.log("userdata = ", this.userdetails);
    //   //   this.egovPackage = this.userdetails.egov_package;
    //   //   this.userFullname = this.userdetails.full_name;
    //   //   this.userEmail = this.userdetails.email;
    //   //   this.userNric = this.userdetails.nric_number;
    //   //   this.UserHOD = this.userdetails.head_of_department_name;
    //   //   this.userQuota = this.userdetails.egov_quota + " / 1000";
    //   //   console.log(this.egovPackage);

    //   //   if (this.egovPackage <= "2") {
    //   //     this.showRequestQuotaButton = true;
    //   //   }
    //   // });
    // }

    // this.InvestigationTicketsService.getAll().subscribe((res) => {
    //   this.InvestigationList = res;
    // });

    this.requestInvestigationDocForm = this.formBuilder.group({
      id: new FormControl(""),
      reference_letter_number: new FormControl(""),
      ip_no: new FormControl(""),
      court_case_number: new FormControl(""),
      // official_attachment: new FormControl(""),
      offense: new FormControl("qwee"),
      // document_request: new FormControl(""),
      // submit_request: new FormControl(""),
      officer: new FormControl(this.userID),
    });

    this.updateUserInfoForm = this.formBuilder.group({
      id: new FormControl(""),
      full_name: new FormControl(""),
      email: new FormControl(""),
      egov_package: new FormControl(""),
      nric_number: new FormControl(""),
      phone_number: new FormControl(""),
      // submit_request: new FormControl(""),
      // officer: new FormControl(this.userID),
    });

    this.getData()
  }


  // SB start

  getData() {
    this.transactionService.getExtended().subscribe(
      () => {
        this.transactions = this.transactionService.transactions
        this.tableRows = this.transactions
        this.tableRows.forEach(
          (item) => {
            item.created_date = moment(item.created_date).format('DD/MM/YYYY hh:mm:ss')
          }
        )
      },
      () => {},
      () => {
        this.tableTemp = this.tableRows.map((prop, key) => {
          return {
            ...prop,
            id_index: key+1
          }
        })
      }
    )

    this.cartService.getOne('2210c8ea-ae65-480f-af82-5ee1c49b7e06').subscribe(
      () => {
        this.orders = this.cartService.cart.cart_item
        console.log(this.cartService.cart)
        this.tableOrderRows = this.orders
        this.tableOrderRows.forEach(
          (item) => {
            item.created_date = moment(item.created_date).format('DD/MM/YYYY hh:mm:ss')
          }
        )
      },
      () => {},
      () => {
        this.tableOrderTemp = this.tableOrderRows.map((prop, key) => {
          return {
            ...prop,
            id_index: key+1
          }
        })
        console.log(this.tableOrderTemp)
      }
    )
  }

  entriesChange($event) {
    this.tableEntries = $event.target.value;
  }

  filterTable($event) {
    let val = $event.target.value;
    this.tableTemp = this.tableRows.filter(function (d) {
      for (var key in d) {
        if (d[key].toLowerCase().indexOf(val) !== -1) {
          return true;
        }
      }
      return false;
    });
  }

  onSelect({ selected }) {
    this.tableSelected.splice(0, this.tableSelected.length);
    this.tableSelected.push(...selected);
  }

  onActivate(event) {
    this.tableActiveRow = event.row;
  }

  downloadOutput(row) { 
    if (row.product.id == 'abd86a30-3d41-4c68-94e3-280b0362e288') {
      let body = {
        "name": "company_profile",
        "language": "ms",
        "ctc": "False",
        "registration_no": row.entity.company_number,
        "entity_type": "ROC"
      }
      this.spinner.show()
      this.productService.generateDocument(body).subscribe(
        (res: any) => {
          this.spinner.hide()
          let url = res.pdflink
          window.open(url, '_blank');
          // window.location.href =url;
        },
        () => {
          this.spinner.hide()
        }
      )
    }
    else if (row.product.id == '74a97598-c817-4c06-971f-3197c4c12165') {
      let body = {
        "name": "company_profile",
        "language": "en",
        "ctc": "False",
        "registration_no": row.entity.company_number,
        "entity_type": "ROC"
      }
      this.spinner.show()
      this.productService.generateDocument(body).subscribe(
        (res: any) => {
          this.spinner.hide()
          let url = res.pdflink
          window.open(url, '_blank');
          // window.location.href =url;
        },
        () => {
          this.spinner.hide()
        }
      )
    }
    else if (row.product.id == '1eca2caf-a8c7-4327-a37f-394f4dd9c78e') {
      let body = {
        "name": "business_profile",
        "language": "ms",
        "ctc": "False",
        "registration_no": row.entity.registration_number,
        "entity_type": "ROB"
      }
      this.spinner.show()
      this.productService.generateDocument(body).subscribe(
        (res: any) => {
          this.spinner.hide()
          let url = res.pdflink
          window.open(url, '_blank');
          // console.log(res)
        },
        () => {
          this.spinner.hide()
        }
      )
    }
    // else if (row.product.id == 'abd86a30-3d41-4c68-94e3-280b0362e288') {
    //   let body = {
    //     "name": "company_profile",
    //     "language": "ms",
    //     "ctc": "False",
    //     "registration_no": row.entity.company_number,
    //     "entity_type": "ROC"
    //   }   
    //   this.productService.generateDocument(body).subscribe()
    // }
  }



  // SB end










  autoLogin() {
    let username = "admin2";
    let password = "PabloEscobar";
    this.infodata = {
      username: username,
      password: password,
    };
    // this.AuthService.obtainToken(this.infodata).subscribe((res) => {});
  }

  addNewRequestData() {
    console.log("payment data -> ", this.requestInvestigationDocForm.value);
    this.InvestigationTicketsService.create(
      this.requestInvestigationDocForm.value
    ).subscribe(
      (res) => {
        console.log(res);
        this.closeModal();
        this.successAlert("Successfully Save Data");
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

  changeUserInfo() {
    this.UsersService.update(this.id, this.updateUserInfoForm.value).subscribe(
      (res) => {
        console.log(res);
        // this.closeModal();
        this.successAlert("Successfully Save Data");
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

  addNewRequestQuota() {
    this.UsersService.addQuota(this.userID).subscribe(
      (res) => {
        console.log(res);
        this.closeModal();
        this.successAlert("Successfully Save Data");
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

  addInvestigationReqForm() {
    this.showRequestInvestigationList = false;
    this.showRequestInvestigationAdd = true;
  }

  requestInvestigationDoc() {
    swal
      .fire({
        title: "Confirmation",
        text: "Are you sure to submit Application !",
        icon: "info",
        buttonsStyling: false,
        confirmButtonText: "Confirm",
        customClass: {
          confirmButton: "btn btn-primary ",
        },
      })
      .then((result) => {
        // if (result.value) {
        //   this.router.navigate(["/orders"]);
        // }
        this.addNewRequestData();
      });
    console.log("confirm");
  }

  disableFormAccount() {
    this.formStatus = false;
    this.showSubmitButton = true;
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
        this.closeModal();
        window.location.reload();
        // this.navigatePage("/profile");
      });
  }

  summaryRequest(task) {
    console.log(task);
    if (task == "doc") {
      this.showpiv = false;
      this.showdoc = true;
    } else {
      this.showpiv = true;
      this.showdoc = false;
    }
  }

  navigatePage(path: string) {
    // console.log('Path: ', path)
    // this.closeModal();
    this.router.navigate([path]);
  }

  // openTransactionDetail(modalRef: TemplateRef<any>) {
  //   this.modalTransactionDetail = this.modalService.show(
  //     modalRef,
  //     this.modalConfig
  //   );
  // }

  openModal(modalRef: TemplateRef<any>) {
    this.modal = this.modalService.show(
      modalRef,
      Object.assign({}, { class: "modal-dialog-centered gray modal-lg" })
    );
  }

  closeModal() {
    this.modal.hide();
  }

  openTransactionDetail(modalRef: TemplateRef<any>) {
    this.modalTransactionDetail = this.modalService.show(
      modalRef,
      this.modalConfig
    );
  }

  closeTransactionDetail() {
    this.modalTransactionDetail.hide();
  }

  downloadReceipt() {}

  successDownload() {
    swal
      .fire({
        title: "Success",
        text: "Successfully downloaded",
        icon: "success",
        buttonsStyling: false,
        confirmButtonText: "Ok",
        customClass: {
          confirmButton: "btn btn-outline-success ",
        },
      })
      .then((result) => {
        if (result.value) {
          window.open(
            "https://pipeline-project.sgp1.digitaloceanspaces.com/ssm/product/1599179232-96afbd34518b47af99a1fe4f488185d8.pdf",
            "_blank"
          );
        }
      });
    console.log("confirm");
  }

  failedDownload() {
    swal.fire({
      title: "Receipt failed to generate",
      text: "Please contact SSM Enquiry",
      icon: "warning",
      showCancelButton: true,
      buttonsStyling: false,
      confirmButtonText: "Confirm",
      customClass: {
        cancelButton: "btn btn-outline-primary ",
        confirmButton: "btn btn-primary ",
      },
    });
    console.log("confirm");
  }

  
}
