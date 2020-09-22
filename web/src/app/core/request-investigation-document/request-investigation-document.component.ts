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
  selector: "app-request-investigation-document",
  templateUrl: "./request-investigation-document.component.html",
  styleUrls: ["./request-investigation-document.component.scss"],
})
export class RequestInvestigationDocumentComponent implements OnInit {
  // Modal
  modalTransactionDetail: BsModalRef;
  modalConfig = {
    keyboard: true,
    class: "modal-dialog-centered modal-xl",
  };

  showpiv = false;
  showdoc = true;

  // array
  user_obj: any;

  // get data from auth service
  egovPackage: string;
  userType = this.AuthService.userType;
  userID = this.AuthService.userID;
  showIcondiv = false;
  userdetails: any;
  userPackage: string;

  /// form
  requestInvestigationDocForm: FormGroup;

  constructor(
    private modalService: BsModalService,
    private formBuilder: FormBuilder,
    private AuthService: AuthService,
    private UsersService: UsersService,
    private InvestigationTicketsService: InvestigationTicketsService,
    private router: Router
  ) {}

  ngOnInit(): void {
    // console.log("asdasdad -> ", this.AuthService.userID);
    // this.user_obj = this.AuthService.decodedToken();
    // let userType = this.user_obj.user_;

    this.UsersService.getOne(this.userID).subscribe((res) => {
      this.userdetails = res;
      console.log("data = ", this.userdetails);
      this.egovPackage = this.userdetails.egov_package;
      // console.log("Svc: ", this.tableRows);
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
  }

  addNewRequestData() {
    console.log("payment data -> ", this.requestInvestigationDocForm.value);
    this.InvestigationTicketsService.create(
      this.requestInvestigationDocForm.value
    ).subscribe(
      (res) => {
        console.log(res);
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
        // window.location.reload();
        this.navigatePage("/request-investigation-document");
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
