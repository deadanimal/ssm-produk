import {
  Component,
  OnInit,
  TemplateRef,
  ChangeDetectorRef,
  ElementRef,
  ViewChild,
} from '@angular/core';
import { ReCaptchaV3Service } from 'ngx-captcha';
import {
  FormGroup,
  FormBuilder,
  Validators,
  FormControl,
} from '@angular/forms';
import { BsModalRef, BsModalService } from 'ngx-bootstrap';
import swal from 'sweetalert2';
import { Router } from '@angular/router';

import { UsersService } from 'src/app/shared/services/users/users.service';
import { AuthService } from 'src/app/shared/services/auth/auth.service';
import { User } from 'src/app/shared/services/users/users.model';
import { LocalFilesService } from 'src/app/shared/services/local-files/local-files.service';
import { ServicesService } from 'src/app/shared/services/services/services.service';
import { LoadingBarService } from '@ngx-loading-bar/core';
import { ToastrService } from 'ngx-toastr';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-egov',
  templateUrl: './egov.component.html',
  styleUrls: ['./egov.component.scss'],
})
export class EgovComponent implements OnInit {
  
  // Data
  user: User

  // Checker
  isSignUp: boolean = false;
  ministry: number = 0;
  isAgree: boolean = false

  // Image
  egovBanner = 'assets/img/background/putrajaya.jpg'
  
  // Modal
  modal: BsModalRef;
  modalConfig = {
    keyboard: true,
    class: 'modal-dialog-centered',
  };

  registerUser: any[] = [];

  // Form
  @ViewChild('formRegistration') formRegistration: ElementRef;
  registerForm: FormGroup

  // List
  ministries: any[] = []
  departments: any[] = []

  constructor(
    private userService: UsersService,
    private fb: FormBuilder,
    private modalService: BsModalService,
    private router: Router,
    private fileService: LocalFilesService,
    private serviceService: ServicesService,
    private loadingBar: LoadingBarService,
    private toastr: ToastrService
  ) {
    this.getUser()
    this.getData()
  }

  ngOnInit(): void {
    this.initForm()
  }

  initForm() {
    this.registerForm = this.fb.group({
      user: new FormControl(null, Validators.required),
      egov_request: new FormControl('PD', Validators.required),
      position_or_grade: new FormControl(null, Validators.required),
      head_of_department_name: new FormControl(null, Validators.required),
      head_of_department_position: new FormControl(null, Validators.required),
      head_of_department_email: new FormControl(null, Validators.required),
      ministry_name: new FormControl(null, Validators.required),
      department_name: new FormControl(null, Validators.required),
      division_name: new FormControl(null, Validators.required),
      address_1: new FormControl(null, Validators.required),
      address_2: new FormControl(),
      address_3: new FormControl(),
      city: new FormControl(null, Validators.required),
      postcode: new FormControl(null, Validators.required),
      state: new FormControl(null, Validators.required),
      attachment_letter: new FormControl()
    })
    this.registerForm.controls['user'].setValue(this.user.id)
  }

  // SB start

  getUser() {
    this.user = this.userService.currentUser
    if (this.user['user_type'] == 'EG') {
      this.navigatePage('/egov/home')
    }
  }

  getData() {
    forkJoin([
      this.serviceService.getEgovMinistries(),
      this.serviceService.getEgovDepartments()
    ]).subscribe(
      (res) => {
        this.ministries = res[0]
        this.departments = res[1]
      },
      () => {},
      () => {}
    )
  }

  signIn() {
    if (this.user.user_type == 'EG') {
      return this.router.navigate(['/products/search-egov'])
    }
  }

  openRegistration() {
    this.isSignUp = true
    setTimeout(
      () => {
        this.formRegistration.nativeElement.scrollIntoView({ behavior: 'smooth' })
      }, 1000
    )
  }

  register() {
    // console.log(this.registerForm.value)
    this.loadingBar.useRef('http').start()
    this.serviceService.requestEgov(this.registerForm.value).subscribe(
      () => {
        this.loadingBar.useRef('http').complete()
        this.successAlert('Successfully sign up eGOV')
      },
      () => {
        this.loadingBar.useRef('http').complete()
      },
      () => {
        // let title = 'Success'
        // let message = 'Logging out...'
        // this.navigatePage('/home')
        // this.toastr.success(message, title)
      }
    )
  }

  successAlert(message) {
    swal.fire({
      title: 'Success',
      text: message,
      icon: 'success',
      // showCancelButton: true,
      buttonsStyling: false,
      confirmButtonText: 'Close',
      customClass: {
        confirmButton: 'btn btn-success rounded-pill',
      },
    })
    .then((res) => {
      if (res) {
        console.log('Confirm')
      }
    })
  }

  navigatePage(path: string) {
    // console.log('Path: ', path)
    // this.closeModal();
    this.router.navigate([path]);
  }
  
  // SB end

  
  ngOnDestroy() {
    var body = document.getElementsByTagName('body')[0];
    body.classList.remove('presentation-page');
    var navbar = document.getElementById('navbar-main');
    navbar.classList.remove('bg-primary');
  }

  openModal(modalRef: TemplateRef<any>) {
    this.modal = this.modalService.show(
      modalRef,
      Object.assign({}, { class: 'gray modal-lg' })
    );
  }

  openModalSm(modalRef: TemplateRef<any>) {
    this.modal = this.modalService.show(
      modalRef,
      Object.assign({}, { class: 'gray modal-sm' })
    );
  }

  closeModal() {
    this.modal.hide();
    // this.editAppReqForm.reset();
  }

}
