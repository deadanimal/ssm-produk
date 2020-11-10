import { Component, OnInit, TemplateRef } from "@angular/core";
import Glide from "@glidejs/glide";
import {
  FormGroup,
  FormBuilder,
  Validators,
  FormControl,
} from "@angular/forms";
import { BsModalRef, BsModalService } from "ngx-bootstrap";
import swal from "sweetalert2";
import { Router, ActivatedRoute } from "@angular/router";

// user service
import { UsersService } from "src/app/shared/services/users/users.service";

// auth service
import { AuthService } from "src/app/shared/services/auth/auth.service";

@Component({
  selector: "app-egov-details",
  templateUrl: "./egov-details.component.html",
  styleUrls: ["./egov-details.component.scss"],
})
export class EgovDetailsComponent implements OnInit {
  isSignUp: boolean = false;
  registerDiv: boolean = false;
  AuthDetails: any;

  public aFormGroup: FormGroup;

  // Modal
  modal: BsModalRef;
  modalConfig = {
    keyboard: true,
    class: "modal-dialog-centered",
  };

  slider1 = "assets/img/banner/banner portal-01.png";
  slider2 = "assets/img/banner/banner portal-02.png";
  slider3 = "assets/img/banner/banner portal-03.png";
  slider4 = "assets/img/banner/banner portal-04.png";

  // get data from auth service
  egovPackage: string;
  userType: string;
  userID: String;
  showIcondiv = false;
  userdetails: any;
  userPackage: string;

  constructor(
    private formBuilder: FormBuilder,
    private modalService: BsModalService,
    private router: Router,
    private UsersService: UsersService,
    private AuthService: AuthService
  ) {}

  ngOnInit(): void {
    if (this.AuthService.userID != undefined) {
      this.userType = this.AuthService.userType;
      this.userID = this.AuthService.userID;
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
    }
  }

  signUp() {
    this.isSignUp = true;
  }

  scrollToDownload(element: any) {
    element.scrollIntoView({ behavior: "smooth" });
  }

  ngOnDestroy() {
    var body = document.getElementsByTagName("body")[0];
    body.classList.remove("presentation-page");
    var navbar = document.getElementById("navbar-main");
    navbar.classList.remove("bg-primary");
  }

  registerUserDiv() {
    this.registerDiv = true;
  }

  openModal(modalRef: TemplateRef<any>) {
    // if (row) {
    //   console.log(row);
    //   this.editAppReqForm.patchValue(row);
    // }
    this.modal = this.modalService.show(
      modalRef,
      Object.assign({}, { class: "gray modal-lg" })
    );
    // this.modal = this.modalService.show(modalRef, this.modalConfig);
  }

  openModalSm(modalRef: TemplateRef<any>) {
    // if (row) {
    //   console.log(row);
    //   this.editAppReqForm.patchValue(row);
    // }
    this.modal = this.modalService.show(
      modalRef,
      Object.assign({}, { class: "gray modal-sm" })
    );
    // this.modal = this.modalService.show(modalRef, this.modalConfig);
  }

  closeModal() {
    this.modal.hide();
    // this.editAppReqForm.reset();
  }

  confirm(row) {
    swal
      .fire({
        title: "Confirmation",
        text: "Are you sure to delete this data ?",
        icon: "info",
        showCancelButton: true,
        buttonsStyling: false,
        confirmButtonText: "Confirm",
        customClass: {
          cancelButton: "btn btn-outline-primary ",
          confirmButton: "btn btn-primary ",
        },
      })
      .then(() => {
        // this.deleteApplicationData(row);
      });
  }

  successAlert(task) {
    swal.fire({
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
    });
    // console.log("confirm");
  }

  navigatePage(path: string) {
    // console.log('Path: ', path)
    // this.closeModal();
    this.router.navigate([path]);
  }
}
