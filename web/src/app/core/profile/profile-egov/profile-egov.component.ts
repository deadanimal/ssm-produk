import { ChangeDetectorRef, Component, OnInit, TemplateRef } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { LoadingBarService } from '@ngx-loading-bar/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap';
import { CartsService } from 'src/app/shared/services/carts/carts.service';
import { LocalFilesService } from 'src/app/shared/services/local-files/local-files.service';
import { ServicesService } from 'src/app/shared/services/services/services.service';
import { User } from 'src/app/shared/services/users/users.model';
import { UsersService } from 'src/app/shared/services/users/users.service';

import { forkJoin } from 'rxjs';
import swal from 'sweetalert2';
import * as moment from 'moment';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductsService } from 'src/app/shared/services/products/products.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { exit } from 'process';

export enum SelectionType {
  single = 'single',
  multi = 'multi',
  multiClick = 'multiClick',
  cell = 'cell',
  checkbox = 'checkbox',
}

@Component({
  selector: 'app-profile-egov',
  templateUrl: './profile-egov.component.html',
  styleUrls: ['./profile-egov.component.scss']
})
export class ProfileEgovComponent implements OnInit {

  // Data
  user: User
  requestsPending: any[] = []
  requestsApproved: any[] = []
  requestToAdd: any[] = []
  formTypes: any[] = []
  businessCodes: any[] = []
  companyStatus: any[] = []
  stateCodes: any[] = []
  companyOrigins: any[] = []
  companyTypes: any[] = []
  sectors: any[] = []
  divisions: any[] = []
  searchType = 'document'
  ministries: any[] = []
  departments: any[] = []
  selectedTask: any
  requestItemList: any

  // Table
  tableInvestigationEntries: number = 10
  tableInvestigationSelected: any[] = []
  tableInvestigationTemp = []
  tableInvestigationActiveRow: any
  tableInvestigationRows: any[] = []
  
  tableRequestEntries: number = 10
  tableRequestSelected: any[] = []
  tableRequestTemp = []
  tableRequestActiveRow: any
  tableRequestRows: any[] = []

  tableRequestToAddEntries: number = 10
  tableRequestToAddSelected: any[] = []
  tableRequestToAddTemp = []
  tableRequestToAddActiveRow: any
  tableRequestToAddRows: any[] = []

  tableItemEntries: number = 10;
  tableItemSelected: any[] = [];
  tableItemTemp = [];
  tableItemActiveRow: any;
  tableItemRows: any[] = [];

  // Form
  informationForm: FormGroup
  investigationForm: FormGroup
  quotaForm: FormGroup
  
  renewForm: FormGroup
  
  requestForm: FormGroup

  informationFormMessages = {
    'phone_number': [
      { type: 'required', message: 'Don\'t leave this field blank' }
    ],
    'position_or_grade': [
      { type: 'required', message: 'Don\'t leave this field blank' }
    ],
    'head_of_department_name': [
      { type: 'required', message: 'Don\'t leave this field blank' }
    ],
    'head_of_department_position': [
      { type: 'required', message: 'Don\'t leave this field blank' }
    ],
    'head_of_department_email': [
      { type: 'required', message: 'Don\'t leave this field blank' },
      { type: 'pattern', message: 'Invalid email'}
    ],
    'ministry_name': [
      { type: 'required', message: 'Don\'t leave this field blank' }
    ],
    'department_name': [
      { type: 'required', message: 'Don\'t leave this field blank' }
    ],
    'division_name': [
      { type: 'required', message: 'Don\'t leave this field blank' }
    ],
    'address_1': [
      { type: 'required', message: 'Don\'t leave this field blank' }
    ],
    'city': [
      { type: 'required', message: 'Don\'t leave this field blank' }
    ],
    'postcode': [
      { type: 'required', message: 'Don\'t leave this field blank' }
    ],
    'state': [
      { type: 'required', message: 'Don\'t leave this field blank' }
    ],
    'attachment_letter': [
      { type: 'requirement', message: 'Attachment (official letter from government agency is required)' }
    ]
  }

  investigationFormMessages = {
    'reference_letter_no': [
      { type: 'required', message: 'Don\'t leave this field blank' },
      { type: 'pattern', message: 'Invalid field' }
    ],
    'officer_name': [
      { type: 'required', message: 'Don\'t leave this field blank' }
    ],
    'officer_designation': [
      { type: 'required', message: 'Don\'t leave this field blank' }
    ],
    'officer_department': [
      { type: 'required', message: 'Don\'t leave this field blank' }
    ],
    'officer_nric': [
      { type: 'required', message: 'Don\'t leave this field blank' },
      { type: 'pattern', message: 'Invalid field' }
    ],
    'ip_no': [
      { type: 'required', message: 'Don\'t leave this field blank' },
      { type: 'pattern', message: 'Invalid field' }
    ],
    'officer_mobile_no': [
      { type: 'required', message: 'Don\'t leave this field blank' },
      { type: 'pattern', message: 'Invalid field' }
    ],
    'officer_official_email': [
      { type: 'required', message: 'Don\'t leave this field blank' },
      { type: 'pattern', message: 'Invalid email'}

    ],
    'court_case_no': [
      { type: 'required', message: 'Don\'t leave this field blank' },
      { type: 'pattern', message: 'Invalid field' }
    ],
    'official_letter_egov': [
      { type: 'required', message: 'Don\'t leave this field blank' }
    ],
    'official_letter_request': [
      { type: 'required', message: 'Don\'t leave this field blank' }
    ],
    'offence': [
      { type: 'required', message: 'Don\'t leave this field blank' }
    ]
  }

  renewFormMessages = {
    'head_of_department_name': [
        { type: 'required', message: 'Don\'t leave this field blank' },
      ],
      'head_of_department_position': [
        { type: 'required', message: 'Don\'t leave this field blank' },
      ],
      'head_of_department_email': [
        { type: 'required', message: 'Don\'t leave this field blank' },
        { type: 'pattern', message: 'Invalid Email' },

      ],
      'ministry_name': [
        { type: 'required', message: 'Don\'t leave this field blank' },

      ],
      'department_name': [
        { type: 'required', message: 'Don\'t leave this field blank' },

      ],
      'division_name': [
        { type: 'required', message: 'Don\'t leave this field blank' },

      ],
      'address_1': [
        { type: 'required', message: 'Don\'t leave this field blank' },

      ],
      'postcode': [
        { type: 'required', message: 'Don\'t leave this field blank' },
        { type: 'pattern', message: 'Invalid field' },
        { type: 'minLength', message: 'Invalid field' },
        { type: 'maxLength', message: 'Invalid field' },
      ],
      'city': [
        { type: 'required', message: 'Don\'t leave this field blank'},
      ],
      'state': [
        { type: 'required', message: 'Don\'t leave this field blank'},
      ],
      'attachment_letter': [
        { type: 'required', message: 'Don\'t leave this field blank'},
      ],  
  }

  // Modal
  modal: BsModalRef
  modalConfig = {
    keyboard: true,
    class: 'modal-dialog-centered modal-lg',
  }

  // Checker
  isQuotaLow: boolean = false
  isEnableEdit: boolean = false
  isShowForm = false
  isGotInvestigationFormValue = false

  // File attachment
  fileSize: any
  fileName: any
  fileSizeInformation = null
  fileNameInformation = null
  fileSizeInvestigGov = null
  fileNameInvestigGov = null
  fileSizeInvestigReq = null
  fileNameInvestigReq = null

  requestTabActive = false

  constructor(
    private fileService: LocalFilesService,
    private modalService: BsModalService,
    private productService: ProductsService,
    private serviceService: ServicesService,
    private userService: UsersService,
    private activatedRoute: ActivatedRoute,
    private cd: ChangeDetectorRef,
    private fb: FormBuilder,
    private loadingBar: LoadingBarService,
    private router: Router,
    private spinner: NgxSpinnerService
  ) { 
    this.activatedRoute.queryParams.subscribe(
      (path: any) => {
        // console.log(path['tab'])
        this.tabChecker(path['tab'])
      }
    )
    this.getData()
  }

  ngOnInit(): void {
    this.initForm()
    this.getMapping()
  }

  getData() {
    if (this.userService.currentUser) {
      this.user = this.userService.currentUser
    }
    else {
      this.navigatePage('home')
    }
    

    if (
      this.user['egov_package'] == 1 ||
      this.user['egov_package'] == 2
    ) {
      if (this.user['egov_quota'] <= 100) {
        this.isQuotaLow = true
        // console.log('Quota')
        // console.log(this.isQuotaLow)
        // console.log(this.user['user_package'])
      }
    }

    if (
      this.user['egov_package'] == 3 ||
      this.user['egov_package'] == 4
    ) {
      this.requestToAdd = this.serviceService.requestToAdd
      // console.log('req', this.requestToAdd)
      this.tableRequestToAddRows = this.requestToAdd
      this.tableRequestToAddTemp = this.tableRequestToAddRows.map((prop, key) => {
        return {
          ...prop,
          id_index: key+1
        }
      })
    }

    if (this.serviceService.investigationForm) {
      this.isGotInvestigationFormValue = true
    }
    
    let body = {
      'user': this.user['id']
    }
    
    this.serviceService.getSelfRequest(body).subscribe(
      (res) => {
          
      },
      () => {
        this.loadingBar.useRef('http').complete()
      },
      () => {
      }
    )
    // console.log('eGovernment')
    this.loadingBar.useRef('http').start()
    // console.log('ggdsfj')
    forkJoin([
      this.serviceService.getEgovMinistries(),
      this.serviceService.getEgovDepartments(),
      this.serviceService.getSelfRequest(body),
    ]).subscribe(
      (res) => {
        this.ministries = res[0]
        this.departments = res[1]
        this.loadingBar.useRef('http').complete()
        
        let waitRes =  new Promise(
          (resolve, reject) => {
            res[2].forEach(
              (request, index, array) => {
                let created_date_main_ =  moment(request['created_date']).format('DD/MM/YYYY hh:mm:ss')
                let modified_date_main_ =  moment(request['modified_date']).format('DD/MM/YYYY hh:mm:ss')
                let documents = request['document_request_item']
                let status_main_ = 'Approved'

                if (documents) {
                  documents.forEach(
                    (document) => {
                      // console.log(document['document_status'])
                      if (document['document_status'] == 'AP') {
                        let approved_date_ = moment(document['approved_date']).format('DD/MM/YYYY hh:mm:ss')
                        let created_date_ =  moment(document['created_date']).format('DD/MM/YYYY hh:mm:ss')
                        let modified_date_ =  moment(document['modified_date']).format('DD/MM/YYYY hh:mm:ss')
                        let image_form_name_ = document['document_name']
                        let image_form_type_ = document['image_form_type']
                        let image_version_id_ = document['image_version_id']
  
                        let req_ = {
                          'id': document['id'],
                          'reference_no': document['reference_no'],
                          'status': 'Approved',
                          'approved_date': approved_date_,
                          'created_date': created_date_,
                          'modified_date': modified_date_,
                          'image_form_type': image_form_type_,
                          'image_version_id': image_version_id_,
                          'image_form_name': image_form_name_,
                          'officer_name': request['user']['full_name'],
                          'reference_letter_no': request['reference_letter_no'],
                          'ip_no': request['ip_no'],
                          'court_case_no': request['court_case_no'],
                          'official_letter_request': request['official_letter_request'],
                          'official_letter_egov': request['official_letter_egov'],
                          'offence': request['offence'],
                          'item': document
                        }
                        
                        // status_main_ = 'Approved'
                        this.requestsApproved.push(req_)
                        // console.log('approve', this.requestsApproved)
                      }
                    }
                  )
                }

                request['document_request_item'].forEach(
                  (item) => {
                    if (item['document_status'] == 'PD') {
                      status_main_ = 'Pending'
                      // console.log('jumpa')
                    }
                    // console.log('pending')
                  }
                )

                let req_main_ = {
                  'id': request['id'],
                  'reference_no': request['reference_no'],
                  'status': status_main_,
                  'created_date': created_date_main_,
                  'modified_date': modified_date_main_,
                  'officer_name': request['user']['full_name'],
                  'position_or_grade': request['position_or_grade'],
                  'reference_letter_no': request['reference_letter_no'],
                  'ip_no': request['ip_no'],
                  'court_case_no': request['court_case_no'],
                  'official_letter_request': request['official_letter_request'],
                  'official_letter_gov': request['official_letter_gov'],
                  'offence': request['offence'],
                  'item': request
                }
                
                this.requestsPending.push(req_main_)

                setTimeout(
                  () => {
                    // this.requestsPending.push(req_main_)
                    if (index == array.length - 1) resolve();
                  }, 500
                )
              }
            )
          }
        )

        waitRes.then(
          () => {
            this.requestsPending.sort((a, b) => new Date(b.modified_at).getTime() - new Date(a.modified_at).getTime())
            this.requestsApproved.sort((a, b) => new Date(b.modified_at).getTime() - new Date(a.modified_at).getTime())
            
            this.tableInvestigationRows = this.requestsPending 
            this.tableRequestRows = this.requestsApproved
            this.tableInvestigationTemp = this.tableInvestigationRows.map((prop, key) => {
              return {
                ...prop,
                id_index: key+1
              }
            })
            // console.log('inv', this.tableInvestigationRows)
            this.tableRequestTemp = this.tableRequestRows.map((prop, key) => {
              return {
                ...prop,
                id_index: key+1
              }
            })
            // console.log('req', this.tableRequestRows)
          }
        );   
      },
      () => {
        this.loadingBar.useRef('http').complete()
      },
      () => {
        // console.log('hehe')
      }
    )
  }

  initForm() {
    this.informationForm = this.fb.group({
      request_type: new FormControl('UI', Validators.compose([
        Validators.required
      ])),
      phone_number: new FormControl(null, Validators.compose([
        Validators.required
      ])),
      position_or_grade: new FormControl(null, Validators.compose([
        Validators.required
      ])),
      head_of_department_name: new FormControl(null, Validators.compose([
        Validators.required
      ])),
      head_of_department_email: new FormControl(null, Validators.compose([
        Validators.required, Validators.pattern("[a-zA-Z0-9_.]*@gov.my$")
      ])),
      head_of_department_position: new FormControl(null, Validators.compose([
        Validators.required
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
      address_2: new FormControl(null),
      address_3: new FormControl(null),
      city: new FormControl(null, Validators.compose([
        Validators.required
      ])),
      postcode: new FormControl(null, Validators.compose([
        Validators.required
      ])),
      state: new FormControl(null, Validators.compose([
        Validators.required
      ])),
      user: new FormControl(null, Validators.compose([
        Validators.required
      ])),
      attachment_letter: new FormControl(null, Validators.compose([
        Validators.required
      ]))
    });

    this.investigationForm = this.fb.group({
      user: new FormControl(null, Validators.compose([
        Validators.required
      ])),
      reference_letter_no: new FormControl(null, Validators.compose([
        Validators.pattern("^[0-9]*$"),Validators.required
      ])),
      officer_name: new FormControl(null, Validators.compose([
        Validators.required
      ])),
      officer_designation: new FormControl(null, Validators.compose([
        Validators.required
      ])),
      officer_department: new FormControl(null, Validators.compose([
        Validators.required
      ])),
      officer_mobile_no: new FormControl(null, Validators.compose([
        Validators.minLength(5),
        Validators.maxLength(12),Validators.pattern("^[0-9]*$"),Validators.required
      ])),
      officer_nric: new FormControl(null, Validators.compose([
        Validators.minLength(12),
        Validators.maxLength(12),Validators.pattern("^[0-9]*$"),Validators.required
      ])),
      officer_official_email: new FormControl(null, Validators.compose([
        Validators.required,Validators.pattern("[a-zA-Z0-9_.]*@gov.my$")
      ])),
      ip_no: new FormControl(null, Validators.compose([
        Validators.pattern("^[0-9]*$"),Validators.required
      ])),
      court_case_no: new FormControl(null, Validators.compose([
        Validators.pattern("^[0-9]*$"),Validators.required
      ])),
      official_letter_egov: new FormControl(null, Validators.compose([
        Validators.required
      ])),
      official_letter_request: new FormControl(null, Validators.compose([
        Validators.required
      ])),
      offence: new FormControl(null, Validators.compose([
        Validators.required
      ]))
    });

    this.quotaForm = this.fb.group({
      request_type: new FormControl('QU', Validators.compose([
        Validators.required
      ])),
      user: new FormControl(null, Validators.compose([
        Validators.required
      ])),
      attachment_letter: new FormControl(null, Validators.compose([
        Validators.required
      ]))
    })

    this.renewForm = this.fb.group({
      request_type: new FormControl('RN', Validators.compose([
        Validators.required
      ])),
      // position_or_grade: new FormControl(null, Validators.compose([
      //   Validators.required
      // ])),
      head_of_department_name: new FormControl(null, Validators.compose([
        Validators.required
      ])),
      head_of_department_position: new FormControl(null, Validators.compose([
        Validators.required
      ])),
      head_of_department_email: new FormControl(null, Validators.compose([
        Validators.required,
        Validators.pattern("[a-zA-Z0-9_.]*@gov.my$")
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
      address_2: new FormControl(null),
      address_3: new FormControl(null),
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
      ])),
      user: new FormControl(null, Validators.compose([
        Validators.required
      ]))
    })
   
    this.informationForm.controls['phone_number'].patchValue(this.user['phone_number'])
    this.informationForm.controls['position_or_grade'].patchValue(this.user['position_or_grade'])
    this.informationForm.controls['head_of_department_name'].patchValue(this.user['head_of_department_name'])
    this.informationForm.controls['head_of_department_email'].patchValue(this.user['head_of_department_email'])
    this.informationForm.controls['head_of_department_position'].patchValue(this.user['head_of_department_position'])
    this.informationForm.controls['ministry_name'].patchValue(this.user['ministry_name'])
    this.informationForm.controls['department_name'].patchValue(this.user['department_name'])
    this.informationForm.controls['division_name'].patchValue(this.user['division_name'])
    this.informationForm.controls['address_1'].patchValue(this.user['address_1'])
    this.informationForm.controls['address_2'].patchValue(this.user['address_2'])
    this.informationForm.controls['address_3'].patchValue(this.user['address_3'])
    this.informationForm.controls['city'].patchValue(this.user['city'])
    this.informationForm.controls['postcode'].patchValue(this.user['postcode'])
    this.informationForm.controls['state'].patchValue(this.user['state'])
    this.informationForm.controls['user'].patchValue(this.user['id'])

    // this.renewForm.controls['head_of_department_name'].patchValue(this.user['head_of_department_name'])
    // this.renewForm.controls['head_of_department_email'].patchValue(this.user['head_of_department_email'])
    // this.renewForm.controls['head_of_department_position'].patchValue(this.user['head_of_department_position'])
    // this.renewForm.controls['ministry_name'].patchValue(this.user['ministry_name'])
    // this.renewForm.controls['department_name'].patchValue(this.user['department_name'])
    // this.renewForm.controls['division_name'].patchValue(this.user['division_name'])
    // this.renewForm.controls['address_1'].patchValue(this.user['address_1'])
    // this.renewForm.controls['address_2'].patchValue(this.user['address_2'])
    // this.renewForm.controls['address_3'].patchValue(this.user['address_3'])
    // this.renewForm.controls['city'].patchValue(this.user['city'])
    // this.renewForm.controls['postcode'].patchValue(this.user['postcode'])
    // this.renewForm.controls['state'].patchValue(this.user['state'])
    this.renewForm.controls['user'].patchValue(this.user['id'])

    this.investigationForm.controls['user'].patchValue(this.user['id'])
  
    let investigForm = this.serviceService.investigationForm
    
    if (this.isGotInvestigationFormValue) {
    
      this.investigationForm.controls['officer_name'].patchValue(investigForm['officer_name'])
      this.investigationForm.controls['officer_designation'].patchValue(investigForm['officer_designation'])
      this.investigationForm.controls['officer_department'].patchValue(investigForm['officer_department'])
      this.investigationForm.controls['officer_mobile_no'].patchValue(investigForm['officer_mobile_no'])
      this.investigationForm.controls['officer_nric'].patchValue(investigForm['officer_nric'])
      this.investigationForm.controls['officer_official_email'].patchValue(investigForm['officer_official_email'])
      this.investigationForm.controls['reference_letter_no'].patchValue(investigForm['reference_letter_no'])
      this.investigationForm.controls['ip_no'].patchValue(investigForm['ip_no'])
      this.investigationForm.controls['court_case_no'].patchValue(investigForm['court_case_no'])
      this.investigationForm.controls['official_letter_egov'].patchValue(investigForm['official_letter_egov'])
      this.investigationForm.controls['official_letter_request'].patchValue(investigForm['official_letter_request'])
      this.investigationForm.controls['offence'].patchValue(investigForm['offence'])  

      this.fileSizeInvestigGov = this.serviceService.investigationFileSizeGov
      this.fileNameInvestigGov = this.serviceService.investigationFileNameGov
      this.fileSizeInvestigReq = this.serviceService.investigationFileSizeReq
      this.fileNameInvestigReq = this.serviceService.investigationFileNameReq
    }
  }

  getMapping() {
    this.fileService.get('form-types.json').subscribe(
      (res) => {
        this.formTypes = res
        // console.log(this.formTypes)
      }
    )
    this.fileService.get('company-status.json').subscribe(
      (res) => {
        this.companyStatus = res
        // console.log(this.companyStatus)
      }
    )

    this.fileService.get('state-codes.json').subscribe(
      (res) => {
        this.stateCodes = res
        // console.log(this.stateCodes)
      }
    )
    
    this.fileService.get('company-origins.json').subscribe(
      (res) => {
        this.companyOrigins = res
        // console.log(this.companyOrigins)
      }
    )

    this.fileService.get('company-types.json').subscribe(
      (res) => {
        this.companyTypes = res
        // console.log(this.companyTypes)
      }
    )
  }

  

  enableEdit() {
    this.isEnableEdit = true
  }

  disableEdit() {
    this.isEnableEdit = false
  }

  requestQuota() {
    this.loadingBar.useRef('http').start()
    this.quotaForm.controls['user'].patchValue(this.user.id)
    this.serviceService.requestEgov(this.quotaForm.value).subscribe(
      () => {
        // Success
        this.loadingBar.useRef('http').complete()
        this.successAlert()
      },
      () => {
        // failed
        this.loadingBar.useRef('http').complete()
        this.closeModal()
        this.failedAlert()
      },
      () => {
        // Next
        this.closeModal()
      }
    )
  }

  requestUpdate() {
    this.loadingBar.useRef('http').start()
    this.serviceService.requestEgov(this.informationForm.value).subscribe(
      () => {
        // Success
        this.loadingBar.useRef('http').complete()
        this.successAlert()
        this.disableEdit()
      },
      () => {
        // failed
        this.loadingBar.useRef('http').complete()
        this.failedAlert()
        this.disableEdit()
      },
      () => {
      }
    )
  }

  requestRenew(){

    this.loadingBar.useRef('http').start()
    this.serviceService.submitRenewAcc(this.renewForm.value).subscribe(
      () => {
        // Success
        this.loadingBar.useRef('http').complete()
        this.successAlert()
      },
      () => {
        // failed
        this.loadingBar.useRef('http').complete()
        this.failedAlert()
      },
      () => {
      }
    )    
      this.closeModal();

  }

  onFileChange(event, type) {
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
        if (type == 'update') {
          this.informationForm.controls['attachment_letter'].setValue(reader.result)
          this.fileSizeInformation = this.fileSize
          this.fileNameInformation = this.fileName
        }
        else if (type == 'egovernment-letter') {
          this.investigationForm.controls['official_letter_egov'].setValue(reader.result)
          this.fileSizeInvestigGov = this.fileSize
          this.fileNameInvestigGov = this.fileName
        }
        else if (type == 'renew') {
          this.renewForm.controls['attachment_letter'].setValue(reader.result)
          this.fileSizeInvestigGov = this.fileSize
          this.fileNameInvestigGov = this.fileName
        }
        else if (type == 'request-letter') {
          this.investigationForm.controls['official_letter_request'].setValue(reader.result)
          this.fileSizeInvestigReq = this.fileSize
          this.fileNameInvestigReq = this.fileName
        }
        if (type == 'quota') {
          this.quotaForm.controls['attachment_letter'].setValue(reader.result)
        }
        
        // console.log(this.registerForm.value)
        // console.log('he', this.registerForm.valid)
        // console.log(this.isAgree)
        // !registerForm.valid || !isAgree
        // need to run CD since file load runs outside of zone
        this.saveInvestigForm()
        this.cd.markForCheck();
      };
    }
  }

  onInvestigChange() {
    this.saveInvestigForm()
  }

  saveInvestigForm() {
    this.serviceService.investigationForm = this.investigationForm.value
    this.serviceService.investigationFileSizeGov = this.fileSizeInvestigGov
    this.serviceService.investigationFileNameGov = this.fileNameInvestigGov
    this.serviceService.investigationFileSizeReq = this.fileSizeInvestigReq
    this.serviceService.investigationFileNameReq = this.fileNameInvestigReq
  }

  removeFile(type) {
     if (type == 'update') {
      this.fileSize = 0;
      this.fileName = null;
      console.log(this.renewForm);
      
      this.renewForm.value['attachment_letter'] = null;
      this.renewForm.controls['attachment_letter'].setValue(null)
      this.informationForm.controls['attachment_letter'].setValue(null)
      this.fileSizeInformation = null
      this.fileNameInformation = null
      //this.cd.markForCheck();
      //this.cd.detectChanges();
    }
    else if (type == 'egovernment-letter') {
      this.fileSizeInvestigGov = null
      this.fileNameInvestigGov = null
    }
    else if (type == 'request-letter') {
      this.fileSizeInvestigReq = null
      this.fileNameInvestigReq = null
    }
    this.fileName = null
    this.fileSize = null
  }

  addItem() {
    if (this.searchType == 'document') {
      this.navigatePage('/products/search-egov')
    }
    else if (this.searchType == 'personal-involvement') {
      this.navigatePage('/products/search-egov-pi')
    }
  }

  submitRequest() {
    this.loadingBar.useRef('http').start()

    if (this.investigationForm.get('officer_name').errors){
      alert("Please Complete The Form With Correct Details.")
      return;
    }
    if (this.investigationForm.get('officer_designation').errors){
      alert("Please Complete The Form With Correct Details.")
      return;
    }
    if (this.investigationForm.get('officer_department').errors){
      alert("Please Complete The Form With Correct Details.")
      return;
    }
    if (this.investigationForm.get('officer_mobile_no').errors){
      alert("Please Complete The Form With Correct Details.")
      return;
    }
    if (this.investigationForm.get('officer_nric').errors){
      alert("Please Complete The Form With Correct Details.")
      return;
    }
    if (this.investigationForm.get('officer_official_email').errors){
      alert("Please Complete The Form With Correct Details.")
      return;
    }
    if (this.investigationForm.get('reference_letter_no').errors){
      alert("Please Complete The Form With Correct Details.")
      return;
    }
    if (this.investigationForm.get('ip_no').errors){
      alert("Please Complete The Form With Correct Details.")
      return;
    }
    if (this.investigationForm.get('court_case_no').errors){
      alert("Please Complete The Form With Correct Details.")
      return;
    }
    if (this.investigationForm.get('official_letter_egov').errors){
      alert("Please Complete The Form With Correct Details.")
      return;
    }
    if (this.investigationForm.get('offence').errors){
      alert("Please Complete The Form With Correct Details.")
      return;
    }
    
    this.serviceService.createDocumentRequest(this.investigationForm.value).subscribe(
      (res) => {
        // console.log(res)
        this.requestInvestigation(res['id'])
        this.loadingBar.useRef('http').complete()
        this.successAlert()
      },
      () => {
        this.loadingBar.useRef('http').complete()
      }
    )
  }

  async requestInvestigation(id: string) {
    this.requestToAdd.forEach(
      (req) => {
        let body
        if (req.documentType == 'FR') {
          // console.log('FR')
          body = {
            'document_type': req['documentType'],
            'image_version_id': req['verId'],
            'image_form_type': req['documentFormType'],
            'document_name': req['documentFormName'],
            'document_request': id,
            'entity_id': req['entity'],
          }
        }
        else if (req.documentType == 'PF') {
          // console.log('PF')
          body = {
            'document_type': req['documentType'],
            'entity_id': req['entity'],
            'document_name': req['documentFormName'],
            'document_request': id
          }
        }
        // console.log('to send', body)
        setTimeout(
          () => {
            this.serviceService.addDocumentRequestItem(id, body).subscribe(
              () => {
                this.removeInvestigationRequest(req)
                this.hideForm()
                this.getData()
              }
            )
          }, 1000
        )
      }
    )
  }

  removeInvestigationRequest(row) {
    this.requestToAdd.splice(this.requestToAdd.findIndex(req => req['verId'] === row['verId']), 1)
    // console.log('ver', row['verId'])
    this.tableRequestToAddRows = this.requestToAdd
    this.tableRequestToAddTemp = this.tableRequestToAddRows.map((prop, key) => {
      return {
        ...prop,
        id_index: key+1
      }
    })
    // let removeReq = this.requestToAdd.map(req => req['verId']).indexOf(row['verId'])
    // ~removeReq && this.requestToAdd.splice(removeReq, 1)
    // console.log(removeReq)
  }

  navigatePage(path: string) {
    return this.router.navigate([path]);
  }

  showForm() {
    this.isShowForm = true
  }

  hideForm() {
    this.isShowForm = false
  }

  tabChecker(path: string) {
    if (path == 'request') {
      this.requestTabActive = true
      this.isShowForm = true  
    }
    else if (path == 'request-doc') {
      this.requestTabActive = true
      this.isShowForm = true  
    }
  }

  openModal(modalRef: TemplateRef<any>) {
    this.modal = this.modalService.show(modalRef, this.modalConfig);
  }

  openModalInvestigation(modalRef: TemplateRef<any>, row) {
    this.selectedTask = row
    this.modal = this.modalService.show(modalRef, this.modalConfig);
    this.requestItemList = this.selectedTask.item.document_request_item
    console.log(this.requestItemList)
    this.tableItemRows = this.requestItemList
    this.tableItemTemp = this.tableItemRows.map((prop, key) => {
      return {
        ...prop,
        id_index: key+1
      };
    })
  }

  closeModal() {
    this.modal.hide()
  }

  closeModalInvestigation() {
    this.modal.hide()
    // delete this.selectedTask
  }

  openAttachment(url) {
    if (url) {
      window.open(
        url, '_blank'
      )
    }
  }

  successAlert() {
    swal
      .fire({
        title: 'Success',
        text: 'Request successfully submitted',
        icon: 'success',
        // showCancelButton: true,
        buttonsStyling: false,
        confirmButtonText: 'Close',
        customClass: {
          cancelButton: 'btn btn-outline-success',
          confirmButton: 'btn btn-success ',
        },
      })
      .then((result) => {
      });
  }

  failedAlert() {
    swal
      .fire({
        title: 'Failed',
        text: 'Request failed to submit',
        icon: 'warning',
        // showCancelButton: true,
        buttonsStyling: false,
        confirmButtonText: 'Close',
        customClass: {
          cancelButton: 'btn btn-outline-warning',
          confirmButton: 'btn btn-warning ',
        },
      })
      .then((result) => {
      });
  }

  initRequest(selected) {
    if (
      selected['item']['document_type'] == 'PF'
    ) { // Product (Normal)
      // console.log('selected', selected)
      let body = {
        'ctc': false,
        'language': 'en'
      }
      if (selected['item']['entity']['type_of_entity'] == 'BS') {
        body['name'] = 'business_profile'
        body['entity_type'] = 'ROB'
        body['registration_no'] = selected['item']['entity']['registration_number']
      } else {
        body['name'] = 'company_profile'
        body['entity_type'] = 'ROC'
        body['registration_no'] = Number(selected['item']['entity']['company_number'])
      }
      this.downloadRequestProduct(body)
    }
    else if (
      selected['item']['document_type'] == 'FR'
    ) { 
      let body = {
        'entity_type': 'ROC',
        'version_id': selected['item']['image_version_id']
      }
      if (selected['item']['entity']['type_of_entity'] == 'BS') {
        body['name'] = 'business_profile'
        body['entity_type'] = 'ROB'
        body['registration_no'] = selected['item']['entity']['registration_number']
      } else {
        body['name'] = 'company_profile'
        body['entity_type'] = 'ROC'
        body['registration_no'] = Number(selected['item']['entity']['company_number'])
      }
      this.downloadRequestImg(body)
    }
  }

  downloadRequestImg(body) {
    this.spinner.show()
    this.productService.generateImage(body).subscribe(
      (res: any) => {
        this.spinner.hide()
        let url = 'data:image/tiff;base64,' + res
        window.open(url, '_blank');
        // console.log(res)
      },
      () => {
        this.spinner.hide()
      }
    )
  }

  downloadRequestProduct(body) {
    this.spinner.show()
    this.productService.generateDocument(body).subscribe(
      (res: any) => {
        this.spinner.hide()
        let url = res.pdflink
        window.open(url, '_blank');
        // window.location.href =url;
      },
      () => {
        this.spinner.hide()
      }
    )
  }

}
