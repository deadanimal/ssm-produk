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

@Component({
  selector: "app-profile",
  templateUrl: "./profile.component.html",
  styleUrls: ["./profile.component.scss"],
})
export class ProfileComponent implements OnInit {
  // Modal
  // modalTransactionDetail: BsModalRef;
  // modalConfig = {
  //   keyboard: true,
  //   class: "modal-dialog-centered modal-xl"
  // };
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

  constructor(
    private modalService: BsModalService,
    private formBuilder: FormBuilder,
    private AuthService: AuthService,
    private UsersService: UsersService,
    private InvestigationTicketsService: InvestigationTicketsService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.intervalLogin = setInterval(() => {
      this.autoLogin();
    }, 1000);
    // console.log("asdasdad -> ", this.AuthService.userID);
    this.user_obj = this.AuthService.decodedToken();
    console.log("user_obj => ", this.user_obj);

    if (
      this.AuthService.userID != undefined ||
      this.user_obj.user_id != undefined
    ) {
      this.userType = this.AuthService.userType;

      if (this.AuthService.userID != undefined) {
        this.userID = this.AuthService.userID;
      } else {
        this.userID = this.user_obj.user_id;
      }

      this.UsersService.getOne(this.id).subscribe((res) => {
        this.userdetails = res;
        console.log("userdata = ", this.userdetails);
        this.egovPackage = this.userdetails.egov_package;
        this.userFullname = this.userdetails.full_name;
        this.userEmail = this.userdetails.email;
        this.userNric = this.userdetails.nric_number;
        this.UserHOD = this.userdetails.head_of_department_name;
        this.userQuota = this.userdetails.egov_quota + " / 1000";
        console.log(this.egovPackage);

        if (this.egovPackage <= "2") {
          this.showRequestQuotaButton = true;
        }
      });
    }

    this.InvestigationTicketsService.getAll().subscribe((res) => {
      this.InvestigationList = res;
    });

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
  }

  autoLogin() {
    let username = "admin2";
    let password = "PabloEscobar";
    this.infodata = {
      username: username,
      password: password,
    };
    this.AuthService.obtainToken(this.infodata).subscribe((res) => {});
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
