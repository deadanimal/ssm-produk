import { Component, OnInit, TemplateRef } from "@angular/core";
import Glide from "@glidejs/glide";
// import { ReCaptchaV3Service } from "ngx-captcha";
import {
  FormGroup,
  FormBuilder,
  Validators,
  FormControl,
} from "@angular/forms";
import { BsModalRef, BsModalService } from "ngx-bootstrap";
import swal from "sweetalert2";
import { Router, ActivatedRoute } from "@angular/router";

@Component({
  selector: "app-kjakp",
  templateUrl: "./kjakp.component.html",
  styleUrls: ["./kjakp.component.scss"],
})
export class KjakpComponent implements OnInit {
  isSignUp: boolean = false;
  registerDiv: boolean = false;

  public aFormGroup: FormGroup;

  // Modal
  modal: BsModalRef;
  modalConfig = {
    keyboard: true,
    class: "modal-dialog-centered",
  };
  constructor(
    // private reCaptchaV3Service: ReCaptchaV3Service,
    private formBuilder: FormBuilder,
    private modalService: BsModalService,
    private router: Router
  ) {}

  ngOnInit(): void {}

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
    this.closeModal();
    this.router.navigate([path]);
  }
}
