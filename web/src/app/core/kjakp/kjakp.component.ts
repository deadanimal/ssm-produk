import {
  Component,
  OnInit,
  TemplateRef,
  ChangeDetectorRef,
} from "@angular/core";
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
import { HttpClient } from "@angular/common/http";
import { JwtHelperService } from "@auth0/angular-jwt";

// user service
import { UsersService } from "src/app/shared/services/users/users.service";

// auth service
import { AuthService } from "src/app/shared/services/auth/auth.service";

import { NavbarComponent } from "src/app/components/navbar/navbar.component";


@Component({
  selector: "app-kjakp",
  templateUrl: "./kjakp.component.html",
  styleUrls: ["./kjakp.component.scss"],
})
export class KjakpComponent implements OnInit {
  isSignUp: boolean = false;
  registerDiv: boolean = false;
  ministry: number = 0;
  listAgency: any;

  public aFormGroup: FormGroup;

  public readonly siteKey = "6LcvoUgUAAAAAJJbhcXvLn3KgG-pyULLusaU4mL1";

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
  authSignInForm: FormGroup;
  signUpForm: FormGroup;
  signInForm: FormGroup;

  constructor(
    private UsersService: UsersService,
    private AuthService: AuthService,
    private formBuilder: FormBuilder,
    private modalService: BsModalService,
    private router: Router,
    private cdRef: ChangeDetectorRef // public navBar: NavbarComponent
  ) {}

  ngOnInit(): void {
    // this.aFormGroup = this.formBuilder.group({
    //   recaptcha: ["", Validators.required],
    // });

    this.authSignInForm = this.formBuilder.group({
      username: new FormControl("", Validators.compose([Validators.required])),
      password: new FormControl(
        "",
        Validators.compose([Validators.required, Validators.minLength(8)])
      ),
    });

    // this.authSignInForm = this.formBuilder.group({
    //   recaptcha: new FormControl(""),
    //   username: new FormControl(""),
    //   password1: new FormControl(""),
    //   password2: new FormControl(""),
    //   email: new FormControl("test@gmail.com"),
    // });

    this.signUpForm = this.formBuilder.group({
      id: new FormControl(""),
      recaptcha: new FormControl("", Validators.required),
      full_name: new FormControl("Admin"),
      password: new FormControl(""),
      password2: new FormControl(""),
      email: new FormControl("admin@email.com.my"),
      phone_number: new FormControl("0123456789"),
      nric_number: new FormControl("910920114544"),
      username: new FormControl("admintest"),
      egov_request: new FormControl("PD"),
      // birth_date: new FormControl(""),
      // nationality: new FormControl(""),
      // identification_type: new FormControl(""),

      // gender: new FormControl(""),
      // race: new FormControl(""),
      // home_number: new FormControl(""),
      // office_number: new FormControl(""),
      // fax_number: new FormControl(""),
      // address_1: new FormControl(""),
      // address_2: new FormControl(""),
      // address_3: new FormControl(""),
      // city: new FormControl(""),
      // postcode: new FormControl(""),
      // state: new FormControl(""),
      // country: new FormControl(""),
      // registration_number: new FormControl(""),
      // company_name: new FormControl(""),
      // company_number: new FormControl(""),
      // company_email: new FormControl(""),

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
      // is_active: new FormControl(""),
    });
  }

  signInUser() {
    let jwtHelper: JwtHelperService = new JwtHelperService();
    console.log("login = ", this.authSignInForm.value);
    // this.authSignInForm.value.username = this.signInForm.value.username;
    // this.authSignInForm.value.email = this.signInForm.value.email;
    // this.authSignInForm.value.password = this.signInForm.value.password;
    // this.authSignInForm.value.password2 = this.signInForm.value.password2;
    // console.log(this.authSignInForm.value);
    this.AuthService.obtainToken(this.authSignInForm.value).subscribe(
      (res) => {
        this.cdRef.detectChanges();
        let decodedToken = jwtHelper.decodeToken(res.access);
        console.log("login ==>", decodedToken);
        // this.navBar.checkChanges();
        this.successAlert("Successfully Login To eGOV");
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

  signUpUser() {
    // this.authSignUpForm.value.username = this.signUpForm.value.username;
    // this.authSignUpForm.value.email = this.signUpForm.value.email;
    // this.authSignUpForm.value.password1 = this.signUpForm.value.password;
    this.signUpForm.value.id = "8695666e-166e-4812-a8fd-83c958d3efd7";
    // console.log(this.signUpForm.value.id);
    this.UsersService.update(
      this.signUpForm.value.id,
      this.signUpForm.value
    ).subscribe(
      (res) => {
        // this.listEntity = res;
        console.log(res);
        this.successAlert("Successfully sign up eGOV");
        window.location.reload();
        // this.navigatePage("/egov");
      },
      (err) => {
        console.error(err);
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
    // console.log("confirm");
    this.navigatePage("/egov-details");
  }

  navigatePage(path: string) {
    // console.log('Path: ', path)
    // this.closeModal();
    this.router.navigate([path]);
  }

  goTo() {
    console.log('ASD')
    this.router.navigate(['/kjakp/search/'])
  }
}
