import {
  Component,
  OnInit,
  TemplateRef,
  ChangeDetectorRef,
  ElementRef,
  ViewChild,
} from '@angular/core';
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
  egovBanner = 'assets/img/background/egov-2.png'
  
  // Modal
  modal: BsModalRef;
  modalTemp: BsModalRef;
  modalname: ''
  modalConfig = {
    keyboard: true,
    class: 'modal-dialog-centered',
  };

  registerUser: any[] = [];

  // Form
  @ViewChild('formRegistration') formRegistration: ElementRef;
  registerForm: FormGroup
  registerFormMessages = {
    'phone_number': [
      { type: 'required', message: 'Phone no. is required' },
      { type: 'pattern', message: 'A valid phone no. is required' },
      { type: 'minLength', message: 'A valid phone no. is required' },
      { type: 'maxLength', message: 'A valid phone no. is required' },
    ],
    'position_or_grade': [
      { type: 'required', message: 'Position or grade is required' }
    ],
    'head_of_department_name': [
      { type: 'required', message: 'Head of department name is required' }
    ],
    'head_of_department_position': [
      { type: 'required', message: 'Head of department position is required' }
    ],
    'head_of_department_email': [
      { type: 'required', message: 'Head of department email is required' },
      { type: 'email', message: 'A valid email is required'}
    ],
    'ministry_name': [
      { type: 'required', message: 'Ministry name is required' }
    ],
    'department_name': [
      { type: 'required', message: 'Department / agency name is required' }
    ],
    'division_name': [
      { type: 'required', message: 'Division / section / unit name is required' }
    ],
    'address_1': [
      { type: 'required', message: 'Address line 1 is required' }
    ],
    'city': [
      { type: 'required', message: 'City is required' }
    ],
    'postcode': [
      { type: 'required', message: 'Postcode is required' },
      { type: 'pattern', message: 'A valid postcode is required' },
      { type: 'minLength', message: 'A valid postcode is required' },
      { type: 'maxLength', message: 'A valid postcode is required' },
    ],
    'state': [
      { type: 'required', message: 'State is required' }
    ],
    'attachment_letter': [
      { type: 'requirement', message: 'Attachment (official letter from government agency is required)' }
    ]
  }
  fileName: string
  fileSize: number

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
    private toastr: ToastrService,
    private cd: ChangeDetectorRef
  ) {
    this.getUser()
    this.getData()
  }

  ngOnInit(): void {
    this.initForm()
  }

  initForm() {
    this.registerForm = this.fb.group({
      user: new FormControl(null, Validators.compose([
        Validators.required
      ])),
      request_type: new FormControl('RG', Validators.compose([
        Validators.required
      ])),
      phone_number: new FormControl(null, Validators.compose([
        Validators.required,
        Validators.pattern("^[0-9]*$"),
        Validators.minLength(8),
        Validators.maxLength(14)
      ])),
      position_or_grade: new FormControl(null, Validators.compose([
        Validators.required
      ])),
      head_of_department_name: new FormControl(null, Validators.compose([
        Validators.required
      ])),
      head_of_department_position: new FormControl(null, Validators.compose([
        Validators.required
      ])),
      head_of_department_email: new FormControl(null, Validators.compose([
        Validators.required,
        Validators.email
      ])),
      ministry_name: new FormControl(null, Validators.compose([
        Validators.required
      ])),
      department_name: new FormControl(null, Validators.compose([
        Validators.required
      ])),
      division_name: new FormControl(null, Validators.compose([
        Validators.required
      ])),
      address_1: new FormControl(null, Validators.compose([
        Validators.required
      ])),
      address_2: new FormControl(),
      address_3: new FormControl(),
      city: new FormControl(null, Validators.compose([
        Validators.required
      ])),
      postcode: new FormControl(null, Validators.compose([
        Validators.required,
        Validators.pattern("^[0-9]*$"),
        Validators.minLength(5),
        Validators.maxLength(5)
      ])),
      state: new FormControl(null, Validators.compose([
        Validators.required
      ])),
      attachment_letter: new FormControl(null, Validators.compose([
        Validators.required
      ]))
    })
    
    this.registerForm.controls['user'].setValue(this.user.id)
  }

  // SB start

  getUser() { 
    if (this.userService.currentUser) {      
      this.user = this.userService.currentUser
    }
    if (this.user && this.user['user_type'] == 'EG') {
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
        this.successAlert('Successfully sign up for eGOV')
      },
      () => {
        this.loadingBar.useRef('http').complete()
        this.failedAlert('Error. Please try again later')
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
        this.navigatePage('/egov/home')
      }
    })
  }
  
  failedAlert(message) {
    swal.fire({
      title: 'Error',
      text: message,
      icon: 'warning',
      // showCancelButton: true,
      buttonsStyling: false,
      confirmButtonText: 'Close',
      customClass: {
        confirmButton: 'btn btn-warning rounded-pill',
      },
    })
    .then((res) => {
      if (res) {
        //console.log(res);        
        console.log('Confirm')
      }
    })
  }

  navigatePage(path: string) {
    // console.log('Path: ', path)
    // this.closeModal();
    this.router.navigate([path]);
  }

  onFileChange(event) {
    let reader = new FileReader();
    this.fileSize = event.target.files[0].size
    this.fileName = event.target.files[0].name
    if (
      event.target.files && 
      event.target.files.length &&
      this.fileSize < 5000000
    ) {
      const [file] = event.target.files;
      reader.readAsDataURL(file)
      // readAsDataURL(file);
      // console.log(event.target)
      // console.log(reader)
      
      
      reader.onload = () => {
        // console.log(reader['result'])
        this.registerForm.controls['attachment_letter'].setValue(reader.result)
        // console.log(this.registerForm.value)
        // console.log('he', this.registerForm.valid)
        // console.log(this.isAgree)
        // !registerForm.valid || !isAgree
        // need to run CD since file load runs outside of zone
        this.cd.markForCheck();
      };
    }
  }

  removeFile() {
    this.registerForm.controls['attachment_letter'].setValue(null)
    delete this.fileName
    delete this.fileSize
  }
  
  // SB end

  // openModal(modalRef: TemplateRef<any>) {
  //   this.modal = this.modalService.show(
  //     modalRef,
  //     Object.assign({}, { class: 'gray modal-lg' })
  //   );
  // }

  openModal(modalRef: TemplateRef<any>,name) {
    if (name != "ss"){
      this.modalname = name;
      this.modal = this.modalService.show(
        modalRef,
        Object.assign({}, { class: 'gray modal-lg' })
      );
    }else{
      this.modalTemp = this.modal;
      this.modal = this.modalService.show(
        modalRef,
        Object.assign({}, { class: 'gray modal-lg' })
      );
    }   
    
    
  }

  closeModal(flag) {
    if (flag != "ss"){
      this.modal.hide();
    }else{
      this.modal.hide();
      this.modal = this.modalTemp;
    }
    
    
    // this.editAppReqForm.reset();
  }

  openModalSm(modalRef: TemplateRef<any>) {
    this.modal = this.modalService.show(
      modalRef,
      Object.assign({}, { class: 'gray modal-sm' })
    );
  }

  // closeModal() {
  //   this.modal.hide();
  //   // this.editAppReqForm.reset();
  // }

}
