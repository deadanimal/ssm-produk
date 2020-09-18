import { Component, OnInit, TemplateRef } from "@angular/core";
import Glide from "@glidejs/glide";
import { ReCaptchaV3Service } from "ngx-captcha";
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

@Component({
  selector: "app-egov-details",
  templateUrl: "./egov-details.component.html",
  styleUrls: ["./egov-details.component.scss"],
})
export class EgovDetailsComponent implements OnInit {
  isSignUp: boolean = false;
  registerDiv: boolean = false;

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

  userid = "8695666e-166e-4812-a8fd-83c958d3efd7";
  userdetails: any;
  user_type = "PB";
  showIcondiv = false;

  constructor(
    private reCaptchaV3Service: ReCaptchaV3Service,
    private formBuilder: FormBuilder,
    private modalService: BsModalService,
    private router: Router,
    private UsersService: UsersService
  ) {}

  ngOnInit(): void {
    this.UsersService.getOne(this.userid).subscribe((res) => {
      this.userdetails = res;
      this.user_type = this.userdetails.egov_package;

      console.log("data = ", this.userdetails.egov_package);
      // console.log("Svc: ", this.tableRows);
    });

    new Glide(".presentation-cards1", {
      type: "carousel",
      startAt: 1,
      focusAt: 1,
      perTouch: 1,
      perView: 4,
    }).mount();
    var body = document.getElementsByTagName("body")[0];
    body.classList.add("presentation-page");
    var navbar = document.getElementById("navbar-main");
    navbar.classList.add("bg-primary");

    this.aFormGroup = this.formBuilder.group({
      recaptcha: ["", Validators.required],
    });
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
    console.log("confirm");
  }

  navigatePage(path: string) {
    // console.log('Path: ', path)
    // this.closeModal();
    this.router.navigate([path]);
  }
}
