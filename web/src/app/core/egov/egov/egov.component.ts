import {
  Component,
  OnInit,
  TemplateRef,
  ChangeDetectorRef,
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
  registerDiv: boolean = false;
  ministry: number = 0;
  listAgency: any;
  

  public aFormGroup: FormGroup;

  public readonly siteKey = '6LcvoUgUAAAAAJJbhcXvLn3KgG-pyULLusaU4mL1';

  // Modal
  modal: BsModalRef;
  modalConfig = {
    keyboard: true,
    class: 'modal-dialog-centered',
  };

  registerUser: any[] = [];

  // form
  addUserForm: FormGroup;
  loginForm: FormGroup;
  authSignInForm: FormGroup;
  signUpForm: FormGroup;
  signInForm: FormGroup;



  // List
  ministryOptions: any[] = [
    { 'name': 'JABATAN PERDANA MENTERI (JPM)' },
    { 'name': 'KEMENTERIAN BELIA DAN SUKAN' },
    { 'name': 'KEMENTERIAN DALAM NEGERI' },
    { 'name': 'KEMENTERIAN HAL EHWAL EKONOMI' },
    { 'name': 'KEMENTERIAN INDUSTRI UTAMA' },
    { 'name': 'KEMENTERIAN KERJA RAYA (KKR)' },
    { 'name': 'KEMENTERIAN KESIHATAN MALAYSIA' },
    { 'name': 'KEMENTERIAN KEWANGAN' },
    { 'name': 'KEMENTERIAN KOMUNIKASI DAN MULTIMEDIA' },
    { 'name': 'KEMENTERIAN LUAR NEGERI' },
    { 'name': 'KEMENTERIAN PELANCONGAN, SENI DAN BUDAYA MALAYSIA (MOTAC)' },
    { 'name': 'KEMENTERIAN PEMBANGUNAN LUAR BANDAR' },
    { 'name': 'KEMENTERIAN PEMBANGUNAN USAHAWAN DAN KOPERASI (MEDAC)' },
    { 'name': 'KEMENTERIAN PEMBANGUNAN WANITA, KELUARGA DAN MASYARAKAT (KPWKM)' },
    { 'name': 'KEMENTERIAN PENDIDIKAN' },
    { 'name': 'KEMENTERIAN PENGANGKUTAN' },
    { 'name': 'KEMENTERIAN PERDAGANGAN ANTARABANGSA DAN INDUSTRI' },
    { 'name': 'KEMENTERIAN PERDAGANGAN DALAM NEGERI DAN HAL EHWAL PENGGUNA (KPDNHEP)' },
    { 'name': 'KEMENTERIAN PERPADUAN NEGARA' },
    { 'name': 'KEMENTERIAN PERTAHANAN' },
    { 'name': 'KEMENTERIAN PERTANIAN DAN INDUSTRI ASAS TANI' },
    { 'name': 'KEMENTERIAN PERUMAHAN DAN KERAJAAN TEMPATAN' },
    { 'name': 'KEMENTERIAN SUMBER MANUSIA' },
    { 'name': 'KEMENTERIAN TENAGA DAN SUMBER ASLI' },
    { 'name': 'KEMENTERIAN TENAGA, SAINS, TEKNOLOGI, ALAM SEKITAR DAN PERUBAHAN IKLIM (MESTECC)' },
    { 'name': 'KEMENTERIAN WILAYAH PERSEKUTUAN' }
  ]
  departmentOptions: any[] = []

  constructor(
    private reCaptchaV3Service: ReCaptchaV3Service,
    private userService: UsersService,
    private AuthService: AuthService,
    private formBuilder: FormBuilder,
    private modalService: BsModalService,
    private router: Router,
    private cdRef: ChangeDetectorRef,
    private fileService: LocalFilesService
  ) {
    this.getUser()
    this.getData()
  }

  ngOnInit(): void {
    this.authSignInForm = this.formBuilder.group({
      username: new FormControl('', Validators.compose([Validators.required])),
      password: new FormControl(
        '',
        Validators.compose([Validators.required, Validators.minLength(8)])
      ),
    });

    this.signUpForm = this.formBuilder.group({
      id: new FormControl(''),
      recaptcha: new FormControl('', Validators.required),
      full_name: new FormControl('Admin'),
      password: new FormControl(''),
      password2: new FormControl(''),
      email: new FormControl('admin@gov.com.my'),
      phone_number: new FormControl('0123456789'),
      nric_number: new FormControl('910920114544'),
      username: new FormControl('admintest'),
      egov_request: new FormControl('PD'),

      company_address_1: new FormControl(''),
      company_address_2: new FormControl(''),
      company_address_3: new FormControl(''),
      company_city: new FormControl(''),
      company_postcode: new FormControl(''),
      company_state: new FormControl(''),
      company_country: new FormControl(''),
      position_or_grade: new FormControl(''),
      head_of_department_name: new FormControl(''),
      head_of_department_position: new FormControl(''),
      head_of_department_email: new FormControl(''),
      ministry_name: new FormControl(''),
      division_name: new FormControl(''),
      agency_name: new FormControl(''),
      department_name: new FormControl('')
    });
  }

  // SB start

  getUser() {
    this.user = this.userService.currentUser
  }

  getData() {
    this.fileService.get('egov-list.json').subscribe(
      (res) => {
        this.departmentOptions = res
      }
    )
  }

  signIn() {
    if (this.user.user_type == 'EG') {
      return this.router.navigate(['/products/search-egov'])
    }
  }

  
  // SB end

  signInUser() {
    this.router.navigate(['/products/search-egov'])
  }

  signUpUser() {
    this.signUpForm.value.id = this.userService.currentUser.id
    this.userService.update(
      this.signUpForm.value.id,
      this.signUpForm.value
    ).subscribe(
      (res) => {
        console.log(res);
        this.successAlert('Successfully sign up eGOV');
        window.location.reload();
      },
      (err) => {
        console.error(err);
      }
    );
  }

  signUp() {
    this.isSignUp = true;
  }

  scrollToDownload(element: any) {
    element.scrollIntoView({ behavior: 'smooth' });
  }

  ngOnDestroy() {
    var body = document.getElementsByTagName('body')[0];
    body.classList.remove('presentation-page');
    var navbar = document.getElementById('navbar-main');
    navbar.classList.remove('bg-primary');
  }

  registerUserDiv() {
    this.registerDiv = true;
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

  confirm(row) {
    swal
      .fire({
        title: 'Confirmation',
        text: 'Are you sure to delete this data ?',
        icon: 'info',
        showCancelButton: true,
        buttonsStyling: false,
        confirmButtonText: 'Confirm',
        customClass: {
          cancelButton: 'btn btn-outline-primary ',
          confirmButton: 'btn btn-primary ',
        },
      })
      .then(() => {
        // this.deleteApplicationData(row);
      });
  }

  successAlert(task) {
    swal.fire({
      title: 'Success',
      text: task,
      icon: 'success',
      // showCancelButton: true,
      buttonsStyling: false,
      confirmButtonText: 'Close',
      customClass: {
        cancelButton: 'btn btn-outline-success',
        confirmButton: 'btn btn-success ',
      },
    });
    // console.log('confirm');
    this.navigatePage('/egov-details');
  }

  navigatePage(path: string) {
    // console.log('Path: ', path)
    // this.closeModal();
    this.router.navigate([path]);
  }
}
