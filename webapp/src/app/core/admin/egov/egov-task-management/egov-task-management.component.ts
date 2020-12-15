import {
  Component,
  OnInit,
  OnDestroy,
  NgZone,
  TemplateRef,
} from '@angular/core';
import { MocksService } from 'src/app/shared/services/mocks/mocks.service';

import * as moment from 'moment';
import { BsModalRef, BsModalService } from 'ngx-bootstrap';

import swal from 'sweetalert2';
import {
  FormGroup,
  FormBuilder,
  Validators,
  FormControl,
} from '@angular/forms';
import { ServicesService } from 'src/app/shared/services/services/services.service';
import { forkJoin } from 'rxjs';
import { QuotasService } from 'src/app/shared/services/quotas/quotas.service';
import { LoadingBarService } from '@ngx-loading-bar/core';
import { UsersService } from 'src/app/shared/services/users/users.service';
import { User } from 'src/app/shared/services/users/users.model';
import { count } from 'console';

export enum SelectionType {
  single = 'single',
  multi = 'multi',
  multiClick = 'multiClick',
  cell = 'cell',
  checkbox = 'checkbox',
}

@Component({
  selector: 'app-egov-task-management',
  templateUrl: './egov-task-management.component.html',
  styleUrls: ['./egov-task-management.component.scss']
})
export class EgovTaskManagementComponent implements OnInit {

  // Data
  currentUser: User = null
  investigationRequests: any[] = []
  quotaRequests: any[] []
  egovRequests: any[] []
  egovInvestigations: any[]
  tasks: any[] = []


  // Table
  tableEntries: number = 10;
  tableSelected: any[] = [];
  tableTemp = [];
  tableActiveRow: any;
  tableRows: any[] = [];

  tableItemEntries: number = 10;
  tableItemSelected: any[] = [];
  tableItemTemp = [];
  tableItemActiveRow: any;
  tableItemRows: any[] = [];


  SelectionType = SelectionType;
  requestList: any;
  requestItemList: any

  // Modal
  modal: BsModalRef;
  modalConfig = {
    keyboard: true,
    class: 'modal-dialog-centered modal-xl',
   
  };

  // Form
  registerForm: FormGroup;
  

  selectedTask: any = null

  // Registration
  registrationForm: FormGroup
  registrationFormMessages = {
    package: [
      { type: 'required', message: 'Name is required' }
    ],
    quota: [
      { type: 'required', message: 'Quota is required' }
    ],
    expired_date: [
      { type: 'required', message: 'Expiry date is required'}
    ]
  };
  isRemarksOthers: boolean = false
  eGovRegRemarks = null

  // Quota
  quotaForm: FormGroup
  quotaFormMessages = {
    quota: [
      { type: 'required', message: 'Quota is required'}
    ]
  }

  // Update
  updateForm: FormGroup
  updateFormMessages = {

  }

  // Renew
  renewForm: FormGroup
  renewFormMessages = {
    
  }
  
  constructor(
    private mockService: MocksService,
    private modalService: BsModalService,
    private fb: FormBuilder,
    private zone: NgZone,
    private userService: UsersService,
    private serviceService: ServicesService,
    private quotaService: QuotasService,
    private loadingBar: LoadingBarService
  ) {
    this.getData()
  }

  ngOnInit() {
    // this.registerForm = this.formBuilder.group({
    //   name: new FormControl('', Validators.compose([Validators.required])),
    //   email: new FormControl(
    //     '',
    //     Validators.compose([Validators.required, Validators.email])
    //   ),
    // });

    // this.initData();
  
    this.initForm()
  }

  ngOnDestroy() {
    // this.zone.runOutsideAngular(() => {
    //   if (this.chart) {
    //     this.chart.dispose()
    //   }
    // })
  }

  initForm() {
    this.registrationForm = this.fb.group({
      user_id: new FormControl(null),
      request_status: new FormControl('AP', Validators.compose([
        Validators.required
      ])),
      package: new FormControl(null, Validators.compose([
        Validators.required
      ])), 
      quota: new FormControl(1000, Validators.compose([
        Validators.required
      ])), 
      expired_date: new FormControl(null, Validators.compose([
        Validators.required
      ])), 
      remarks: new FormControl(null),
      approver: new FormControl(null)
    })

    this.quotaForm = this.fb.group({
      request_type: new FormControl('quota'),
      quota: new FormControl(1000, Validators.compose([
        Validators.required
      ])),
      remarks: new FormControl(null),
      approver: new FormControl(null)
    })

    this.updateForm = this.fb.group({
      request_type: new FormControl('update'),
      remarks: new FormControl(null),
      approver: new FormControl(null)
    })

    this.renewForm = this.fb.group({
      request_type: new FormControl('renew'),
      request_status: new FormControl(null),
      remarks: new FormControl(null),
      approver: new FormControl(null),
      head_of_department_name: new FormControl(null, Validators.compose([
        Validators.required
      ])),
      head_of_department_position: new FormControl(null, Validators.compose([
        Validators.required
      ])),
      head_of_department_email: new FormControl(null, Validators.compose([
        Validators.required
      ])),
      attachment_letter: new FormControl(null, Validators.compose([
        Validators.required
      ]))
    })

  
  }

  getData() {
    this.loadingBar.start()
    forkJoin([
      this.serviceService.getEgovRequest(),
      this.serviceService.getEgovInvestigation()
    ]).subscribe(
      (res) => {
        this.loadingBar.complete()
        this.tasks = []
        this.egovRequests = res[0]
        this.egovInvestigations = res[1]
        
        // console.log(res[0])
        // console.log(res[1])

        this.egovInvestigations.forEach(
          (request) => {
            let status_overall_ = 'Approved'
            let type_ = 'Investigation Document Request'
            let processed = 0;
            request['document_request_item'].forEach(
              (item) => {
                if (item['document_status'] == 'AP' || item['document_status'] == 'RJ') {
                  processed = 1;
                }
                // console.log('pending')
              }
            )
            if (processed == 1){
                status_overall_ = 'Processed'
            }
            else{
                status_overall_ = 'Pending'
            }

            let user_name_ = null
            let user_email_ = null
            let approver_name_ = null

            if (request['user']) {
              user_name_ = request['user']['full_name']
              user_email_ = request['user']['username']
            }
            if (request['approver']) {
              approver_name_ = request['approver']['full_name']
            }
            let add_ = {
              task_type: type_,
              reference_no: request['reference_no'],
              created_at: moment(request['created_date']).format('DD/MM/YYYY'),
              email_address: user_email_,
              name: user_name_,
              modified_at: moment(request['modified_at']).format('DD/MM/YYYY'),
              approver: approver_name_,
              status: status_overall_,
              remarks: '',
              item: request
            }
            // console.log('added')
            this.tasks.push(add_)
          }
        )

        this.egovRequests.forEach(
          (item) => {
            let status_ = ''
            let type_ = ''

            if (item['request_status'] == 'PD') {
              status_ = 'Pending'
            }
            else if (item['request_status'] == 'RJ') {
              status_ = 'Rejected'
            }
            else if (item['request_status'] == 'AP') {
              status_ = 'Approved'
            }

            if (item['request_type'] == 'RG') {
              type_ = 'New Registration'
            }
            else if (item['request_type'] == 'QU') {
              type_ = 'Quota Request'
            }
            else if (item['request_type'] == 'RN') {
              type_ = 'Renew Account'
            }
            else if (item['request_type'] == 'UI') {
              type_ = 'Update Information'
            }

            let user_name_ = null
            let user_email_ = null
            let approver_name_ = null
            
            if (item['user']) {
              user_name_ = item['user']['full_name']
              user_email_ = item['user']['username']
            }
            if (item['approver']) {
              approver_name_ = item['approver']['full_name']
            }
            let add_ = {
              task_type: type_,
              reference_no: item['reference_no'],
              created_at: moment(item['created_date']).format('DD/MM/YYYY'),
              email_address: user_email_,
              name: user_name_,
              modified_at: moment(item['modified_at']).format('DD/MM/YYYY'),
              approver: approver_name_,
              status: status_,
              remarks: item['remarks'],
              item: item
            }
            this.tasks.push(add_)
          }
       
        )
      },
      (fail) => {
        this.loadingBar.complete()
      },
      () => {
        this.currentUser = this.userService.currentUser
        this.tasks.sort((a, b) => new Date(b.modified_at).getTime() - new Date(a.modified_at).getTime())
        this.tableRows = this.tasks
        this.tableTemp = this.tableRows.map((prop, key) => {
        return {
          ...prop,
          id_index: key+1
        };
      });
      let tt = this.tableTemp;
      this.tableTemp = [];
      this.tableTemp = [...tt]; 
      
      console.log('Task management: ', this.tableTemp)
      }
    )

    
  }

  onRemarksChange($event) {   

    if (this.eGovRegRemarks == 'Others') {
      //console.log("inside");
      
      this.isRemarksOthers = true
    }
    else {
      this.isRemarksOthers = false
    }
    console.log(this.isRemarksOthers);
    
  }

  approveRegistration() {
    let current_user_id_ = this.selectedTask['item']['user']['id']
    console.log(this.registrationForm.value['expired_date'])
    let expiry_date = this.registrationForm.value['expired_date']+ 'T08:00:00.000000Z'
    this.registrationForm.controls['approver'].patchValue(this.currentUser.id)
    console.log(expiry_date)
    this.registrationForm.controls['user_id'].patchValue(current_user_id_)
    this.registrationForm.controls['expired_date'].patchValue(expiry_date)
    this.registrationForm.controls['request_status'].patchValue('AP')

    if (!this.isRemarksOthers) {
      this.registrationForm.controls['remarks'].patchValue(this.eGovRegRemarks)
    }

    this.loadingBar.start()
    this.serviceService.approveEgovRegistration(this.selectedTask['item']['id'], this.registrationForm.value).subscribe(
      () => {
        this.loadingBar.complete()
        this.successfullAlert('Successfully approved a registration')
      },
      () => {
        this.loadingBar.complete()
        this.failedAlert('Please try again later')
      },
      () => {
        this.closeModal()
        this.getData()
      }
    )
  }

  rejectRegistration() {
    let current_user_id_ = this.selectedTask['item']['user']['id']
    this.registrationForm.controls['approver'].patchValue(this.currentUser.id)
    this.registrationForm.controls['user_id'].patchValue(current_user_id_)
    this.registrationForm.controls['request_status'].patchValue('RJ')

    if (!this.isRemarksOthers) {
      this.registrationForm.controls['remarks'].patchValue(this.eGovRegRemarks)
    }

    this.loadingBar.start()
    this.serviceService.rejectEgovRegistration(this.selectedTask['item']['id'], this.registrationForm.value).subscribe(
      () => {
        this.loadingBar.complete()
        this.successfullAlert('Successfully rejected a registration')
      },
      () => {
        this.loadingBar.complete()
        this.failedAlert('Please try again later')
      },
      () => {
        this.getData()
      }
    )
  }

  approveQuota() {
    this.quotaForm.controls['approver'].patchValue(this.currentUser.id)
    this.quotaForm.controls['request_type'].patchValue('QU')

    if (!this.isRemarksOthers) {
      this.quotaForm.controls['remarks'].patchValue(this.eGovRegRemarks)
    }

    this.loadingBar.start()
    this.serviceService.approveEgovRequest(this.selectedTask['item']['id'], this.quotaForm.value).subscribe(
      () => {
        this.loadingBar.complete()
        this.successfullAlert('Successfully approved a quota request')
      },
      () => {
        this.loadingBar.complete()
        this.failedAlert('Please try again later')
      },
      () => {
        this.closeModal()
        this.getData()
      }
    )
  }

  rejectQuota() {
    this.quotaForm.controls['approver'].patchValue(this.currentUser.id)
    this.quotaForm.controls['request_type'].patchValue('QU')

    if (!this.isRemarksOthers) {
      this.quotaForm.controls['remarks'].patchValue(this.eGovRegRemarks)
    }

    this.loadingBar.start()
    this.serviceService.rejectEgovRequest(this.selectedTask['item']['id'], this.quotaForm.value).subscribe(
      () => {
        this.loadingBar.complete()
        this.successfullAlert('Successfully rejected a quota request')
      },
      () => {
        this.loadingBar.complete()
        this.failedAlert('Please try again later')
      },
      () => {
        this.getData()
      }
    )
  }

  approveUpdate() {
    this.updateForm.controls['approver'].patchValue(this.currentUser.id)
    this.updateForm.controls['request_type'].patchValue('UI')
    
    if (!this.isRemarksOthers) {
      this.updateForm.controls['remarks'].patchValue(this.eGovRegRemarks)
    }

    this.loadingBar.start()
    this.serviceService.approveEgovRequest(this.selectedTask['item']['id'], this.updateForm.value).subscribe(
      () => {
        this.loadingBar.complete()
        this.successfullAlert('Successfully approved an update request')
      },
      () => {
        this.loadingBar.complete()
        this.failedAlert('Please try again later')
      },
      () => {
        this.closeModal()
        this.getData()
      }
    )
  }

  rejectUpdate() {
    this.updateForm.controls['approver'].patchValue(this.currentUser.id)
    this.updateForm.controls['request_type'].patchValue('UI')

    if (!this.isRemarksOthers) {
      this.updateForm.controls['remarks'].patchValue(this.eGovRegRemarks)
    }

    this.loadingBar.start()
    this.serviceService.rejectEgovRequest(this.selectedTask['item']['id'], this.updateForm.value).subscribe(
      () => {
        this.loadingBar.complete()
        this.successfullAlert('Successfully rejected an update request')
      },
      () => {
        this.loadingBar.complete()
        this.failedAlert('Please try again later')
      },
      () => {
        this.closeModal()
        this.getData()
      }
    )
  }

  approveRenew() {
    
    this.renewForm.controls['approver'].patchValue(this.currentUser.id)
    this.renewForm.controls['request_status'].patchValue('AP')

    if (!this.isRemarksOthers) {
      this.renewForm.controls['remarks'].patchValue(this.eGovRegRemarks)
    }
   // console.log(this.selectedTask);
    
    this.loadingBar.start()
    this.serviceService.approveEgovRequest(this.selectedTask.item.id, this.renewForm.value).subscribe(
      () => {
        this.loadingBar.complete()
        this.successfullAlert('Successfully approved an update request')
      },
      () => {
        this.loadingBar.complete()
        this.failedAlert('Please try again later')
      },
      () => {
        this.closeModal()
        this.getData()
      }
    )
  }

  rejectRenew() {
    this.renewForm.controls['approver'].patchValue(this.currentUser.id)
    this.renewForm.controls['request_status'].patchValue('RJ')

    if (!this.isRemarksOthers) {
      this.renewForm.controls['remarks'].patchValue(this.eGovRegRemarks)
    }

    this.loadingBar.start()
    this.serviceService.rejectEgovRequest(this.selectedTask.item.id, this.renewForm.value).subscribe(
      () => {
        this.loadingBar.complete()
        this.successfullAlert('Successfully rejected an update request')
      },
      () => {
        this.loadingBar.complete()
        this.failedAlert('Please try again later')
      },
      () => {
        this.getData()
      }
    )
  }

  approveInvestigationAll() {
    this.tableItemRows.forEach(
      (req) => {
        if (req.document_status == "PD"){
          this.approveInvestigation(req.document_request, req,'all')
        }
      }
    )
    this.modal.hide()
  }

  rejectInvestigationAll() {
    this.tableItemRows.forEach(
      (req) => {
        if (req.document_status == "PD"){
            this.rejectInvestigation(req.document_request, req,'all')
        }
      }
    )
    this.modal.hide()
  }
  

  approveInvestigation(id: string, item,flag) {
    this.loadingBar.start()
    let body = {
      'item': item.id,
      'approver': this.currentUser.id
    }
    let succ = 0;
    this.serviceService.approveDocReqItem(id, body).subscribe(
      () => {this.loadingBar.complete()
        if(flag == "all"){
          this.successfullAlert('Successfully approved investigation request')
        }
        succ = 1;
      },
      () => {this.loadingBar.complete()
        this.failedAlert('Please try again later')
      },
      () => {
        if (succ == 1){
            item.document_status = "AP"
            this.updateForInvest()
        }
        this.getData()
      }
    )
  }

  updateForInvest(){
            let touch_count = 0;
            this.tableItemTemp.forEach((x)=>{
              if (x.document_status != "PD"){
                touch_count = touch_count + 1;
              }  
            });
            if (this.tableItemTemp.length == touch_count){
              this.selectedTask.status = "Processed";
            }
  }

  rejectInvestigation(id: string, item,flag) {
    this.loadingBar.start()
    let body = {
      'item': item.id,
      'approver': this.currentUser.id
    }
    let succ = 0;

    this.serviceService.rejectDocReqItem(id, body).subscribe(
      () => {this.loadingBar.complete()
        if (flag == "all"){
          this.successfullAlert('Successfully rejected investigation request')
        }
        succ = 1;
      },
      () => {this.loadingBar.complete()
        this.failedAlert('Please try again later')
      },
      () => {
        if (succ == 1){
          item.document_status = "RJ"
          this.updateForInvest();
        }
        this.getData()
      }
    )
  }

  openAttachment() {
    
    if (this.selectedTask.item.official_letter_egov) {
      let url = this.selectedTask.item.official_letter_egov
      window.open(
        url, '_blank'
      )
    }else if(this.selectedTask.item.attachment_letter){
      let url = this.selectedTask.item.attachment_letter
      window.open(
        url, '_blank'
      )
    }
  }

  successfullAlert(message) {
    swal.fire({
      title: 'Success',
      text: message,
      type: 'success',
      buttonsStyling: false,
      confirmButtonClass: 'btn btn-success',
      confirmButtonText: 'Close',
      showCancelButton: false,
      // cancelButtonClass: 'btn btn-danger',
      // cancelButtonText: 'Cancel'
    });
  }

  failedAlert(message) {
    swal.fire({
      title: 'Error',
      text: message,
      type: 'warning',
      buttonsStyling: false,
      confirmButtonClass: 'btn btn-warning',
      confirmButtonText: 'Close',
      showCancelButton: false,
      // cancelButtonClass: 'btn btn-danger',
      // cancelButtonText: 'Cancel'
    });
  }

  openModal(modalRef: TemplateRef<any>, row) {
    var close = 0;
    console.log(row);
    
    if (row.remarks == null || row.remarks == "" || row.remarks == "null"){
      this.eGovRegRemarks = "null";
      this.registrationForm.controls['remarks'].patchValue("")
      this.isRemarksOthers = false;
      this.registrationForm.controls['package'].patchValue("null");

    }else{
    if (row.remarks != "Attachment incomplete" && row.remarks != "Head of department details"){
      
      this.isRemarksOthers = true;
      this.eGovRegRemarks = "Others";
      this.registrationForm.controls['remarks'].patchValue(row.remarks);
      close = 1;
      this.registrationForm.controls['remarks'].disable();

    }else{
      this.eGovRegRemarks = "null";
      this.registrationForm.controls['remarks'].patchValue("")
      this.isRemarksOthers = false;
    }  
   } 
    
    this.selectedTask = row
    this.currentUser = this.userService.currentUser
    
    this.modal = this.modalService.show(modalRef, this.modalConfig);

    if (this.selectedTask.task_type == 'Investigation Document Request') {

      this.requestItemList = this.selectedTask.item.document_request_item
      
      this.tableItemRows = this.requestItemList
      this.tableItemTemp = this.tableItemRows.map((prop, key) => {
        return {
          ...prop,
          id_index: key+1
        };
      })
 
    }
    close == 1 ? document.getElementById("remarksdd").hidden = true : "";
    close == 1 ? document.getElementById("remarklbl").hidden = true : "";
  }

  closeModal() {
    this.eGovRegRemarks = "null";
    this.registrationForm.controls['remarks'].patchValue("")
    this.isRemarksOthers = false;
    if (this.modal == undefined){

    } else{
       this.modal.hide();
    }   
   
  }

  confirm() {
    swal.fire({
      title: 'Success',
      text: 'You have successfully export report!',
      type: 'success',
      buttonsStyling: false,
      confirmButtonClass: 'btn btn-success',
      confirmButtonText: 'Success',
      showCancelButton: false,
      // cancelButtonClass: 'btn btn-danger',
      // cancelButtonText: 'Cancel'
    });
  }

  register() {
    swal
      .fire({
        title: 'Success',
        text: 'A new user has been created!',
        type: 'success',
        buttonsStyling: false,
        confirmButtonClass: 'btn btn-success',
        confirmButtonText: 'Close',
      })
      .then((result) => {
        if (result.value) {
          this.modal.hide();
          this.registerForm.reset();
        }
      });
  }

  entriesChange($event) {
    this.tableEntries = $event.target.value;
  }

  filterTable($event) {
    let val = $event.target.value.toLowerCase();
    this.tableTemp = this.tableRows.filter(function(d) {
      return d.title.toLowerCase().indexOf(val) !== -1 || !val;
    });
  }

  onSelect({ selected }) {
    this.tableSelected.splice(0, this.tableSelected.length);
    this.tableSelected.push(...selected);
  }

  onActivate(event) {
    this.tableActiveRow = event.row;
  } 

  

  

  

  getData_1() {
    console.log('getData')
    this.loadingBar.start()
    forkJoin([
      this.serviceService.getEgovInvestigation(),
      this.serviceService.getEgovRequest(),
      this.quotaService.getEgov()
    ]).subscribe(
      (res) => {
        this.loadingBar.complete()
        console.log('eg', res)
        this.investigationRequests = res[0]
        this.egovRequests = res[1]
        this.quotaRequests = res[2]

        this.investigationRequests.forEach(
          (item) => {
            let status_ = 'Approved'
            item['document_request_item'].forEach(
              (req) => {
                if (!req['approved']) {
                  status_ = 'Pending'
                }
              }
            )
            let add_ = {
              task_type: 'Investigation Document',
              reference_no: '',
              created_at: moment(item['created_date']).format('DD/MM/YYYY'),
              email_address: item['user']['email'],
              name: item['user']['full_name'],
              modified_at: moment(item['modified_at']).format('DD/MM/YYYY'),
              approver: '',
              status: status_,
              remarks: '',
              item: item
            }
            this.tasks.push(add_)
          }
        )

        this.egovRequests.forEach(
          (item) => {
            
            let status_ = ''
            if (item['egov_request'] == 'PD') {
              status_ = 'Pending'
            }
            else {
              status_ = 'Approved'
            }

            let user_name_ = null
            let user_email_ = null
            if (item['user']) {
              user_name_ = item['user']['full_name']
              user_email_ = item['user']['email']
            }
            let add_ = {
              task_type: 'New Registration',
              reference_no: '',
              created_at: moment(item['created_date']).format('DD/MM/YYYY'),
              email_address: user_email_,
              name: user_name_,
              modified_at: moment(item['modified_at']).format('DD/MM/YYYY'),
              approver: '',
              status: status_,
              remarks: '',
              item: item
            }
            this.tasks.push(add_)
          }
        )

        this.quotaRequests.forEach(
          (item) => {
            let status_ = 'Approved'
            item['document_request_item'].forEach(
              (req) => {
                if (!req['approved']) {
                  status_ = 'Pending'
                }
              }
            )
            let add_ = {
              task_type: 'Add Quota',
              reference_no: '',
              created_at: moment(item['created_date']).format('DD/MM/YYYY'),
              email_address: item['user']['email'],
              name: item['user']['full_name'],
              modified_at: moment(item['modified_at']).format('DD/MM/YYYY'),
              approver: '',
              status: status_,
              remarks: '',
              item: item
            }
            this.tasks.push(add_)
          }
        )
      },
      (fail) => {
        this.loadingBar.complete()
        console.log(fail)
      },
      () => {
         console.log('aft')
         this.tasks.sort((a, b) => new Date(b.modified_at).getTime() - new Date(a.modified_at).getTime())
         this.tableRows = this.tasks
         this.tableTemp = this.tableRows.map((prop, key) => {
          return {
            ...prop,
            id_index: key+1
          };
        });
        console.log(this.tableTemp)
      }
    )
  }

}
