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

@Component({
  selector: "app-egov",
  templateUrl: "./egov.component.html",
  styleUrls: ["./egov.component.scss"],
})
export class EgovComponent implements OnInit {
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
    private reCaptchaV3Service: ReCaptchaV3Service,
    private formBuilder: FormBuilder,
    private modalService: BsModalService
  ) {}

  ngOnInit(): void {
    new Glide(".presentation-cards", {
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

  closeModal() {
    this.modal.hide();
    // this.editAppReqForm.reset();
  }
}
