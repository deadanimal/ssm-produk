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

// user service
import { UsersService } from "src/app/shared/services/users/users.service";

// auth service
import { AuthService } from "src/app/shared/services/auth/auth.service";

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

  registerUser: any[] = [];

  // form
  addUserForm: FormGroup;
  loginForm: FormGroup;
  authSignUpForm: FormGroup;
  signUpForm: FormGroup;
  signInForm: FormGroup;

  constructor(
    // private reCaptchaV3Service: ReCaptchaV3Service,
    private UsersService: UsersService,
    private AuthService: AuthService,
    private formBuilder: FormBuilder,
    private modalService: BsModalService,
    private router: Router
  ) {}

  ngOnInit(): void {
    // this.aFormGroup = this.formBuilder.group({
    //   recaptcha: ["", Validators.required],
    // });

    this.loginForm = this.formBuilder.group({
      username: new FormControl("", Validators.compose([Validators.required])),
      password: new FormControl(
        "",
        Validators.compose([Validators.required, Validators.minLength(8)])
      ),
    });

    this.authSignUpForm = this.formBuilder.group({
      username: new FormControl(""),
      password1: new FormControl(""),
      password2: new FormControl(""),
      email: new FormControl(""),
    });
    this.signUpForm = this.formBuilder.group({
      full_name: new FormControl(""),
      password: new FormControl(""),
      password2: new FormControl(""),
      email: new FormControl(""),
      title: new FormControl(""),
      birth_date: new FormControl(""),
      nationality: new FormControl(""),
      identification_type: new FormControl(""),
      nric_number: new FormControl(""),
      gender: new FormControl(""),
      race: new FormControl(""),
      user_type: new FormControl(""),
      phone_number: new FormControl(""),
      home_number: new FormControl(""),
      office_number: new FormControl(""),
      fax_number: new FormControl(""),
      address_1: new FormControl(""),
      address_2: new FormControl(""),
      address_3: new FormControl(""),
      city: new FormControl(""),
      postcode: new FormControl(""),
      state: new FormControl(""),
      country: new FormControl(""),
      registration_number: new FormControl(""),
      company_name: new FormControl(""),
      company_number: new FormControl(""),
      company_email: new FormControl(""),
      company_address_1: new FormControl(""),
      company_address_2: new FormControl(""),
      company_address_3: new FormControl(""),
      company_city: new FormControl(""),
      company_postcode: new FormControl(""),
      company_state: new FormControl(""),
      company_country: new FormControl(""),
      position_or_grade: new FormControl(""),
      head_of_department_name: new FormControl(""),
      head_of_department_position: new FormControl(""),
      head_of_department_email: new FormControl(""),
      ministry_name: new FormControl(""),
      division_name: new FormControl(""),
      agency_name: new FormControl(""),
      department_name: new FormControl(""),
      username: new FormControl(""),
      is_active: new FormControl(""),
    });
  }

  signInUser() {
    // console.log("login = ", this.signInForm.value);
    // this.authSignUpForm.value.username = this.signInForm.value.username;
    // this.authSignUpForm.value.email = this.signInForm.value.email;
    // this.authSignUpForm.value.password = this.signInForm.value.password;
    // this.authSignUpForm.value.password2 = this.signInForm.value.password2;
    // console.log(this.authSignUpForm.value);
    // this.AuthService.obtainToken(this.loginForm.value).subscribe(
    //   (res) => {
    //     // this.loadingBar.complete();
    //     // this.successMessage();
    //     this.navigatePage("dashboard-admin");
    //     this.successAlert('Successfully Save Data')
    //   },
    //   (err) => {
    //     // this.loadingBar.complete();
    //     // this.errorMessage();
    //     // console.log("HTTP Error", err), this.errorMessage();
    //   },
    //   () => console.log("HTTP request completed.")
    // );
  }

  signUpUser() {
    console.log("login = ", this.signUpForm.value);
    this.authSignUpForm.value.username = this.signUpForm.value.username;
    this.authSignUpForm.value.email = this.signUpForm.value.email;
    this.authSignUpForm.value.password1 = this.signUpForm.value.password;
    this.authSignUpForm.value.password2 = this.signUpForm.value.password2;
    console.log(this.authSignUpForm.value);
    this.AuthService.register(this.authSignUpForm.value).subscribe(
      (res) => {
        // this.listEntity = res;
        console.log(res);
        this.successAlert("Success create new user");
        window.location.reload();
        // this.navigatePage("/egov");
      },
      () => {
        // Activityed
        // this.isLoading = false
        // this.successMessage();
        // this.errorAlert("edit");
      }
    );
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
    this.closeModal();
    this.router.navigate([path]);
  }
}
