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
  investigationRequests: any[] = []
  quotaRequests: any[] []
  egovRequests: any[] []
  tasks: any[] = []


  // Table
  tableEntries: number = 10;
  tableSelected: any[] = [];
  tableTemp = [];
  tableActiveRow: any;
  tableRows: any[] = [];
  SelectionType = SelectionType;
  requestList: any;

  // Modal
  modal: BsModalRef;
  modalConfig = {
    keyboard: true,
    class: 'modal-dialog-centered',
  };

  // Form
  registerForm: FormGroup;
  registerFormMessages = {
    name: [{ type: 'required', message: 'Name is required' }],
    email: [
      { type: 'required', message: 'Email is required' },
      { type: 'email', message: 'A valid email is required' },
    ],
  };

  constructor(
    private mockService: MocksService,
    private modalService: BsModalService,
    private formBuilder: FormBuilder,
    private zone: NgZone,
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
  }

  ngOnDestroy() {
    // this.zone.runOutsideAngular(() => {
    //   if (this.chart) {
    //     this.chart.dispose()
    //   }
    // })
  }

  getCharts() {
    // this.zone.runOutsideAngular(() => {
    //   this.getChart()
    // })
  }

  openModal(modalRef: TemplateRef<any>) {
    this.modal = this.modalService.show(modalRef, this.modalConfig);
  }

  closeModal() {
    this.modal.hide();
    this.registerForm.reset();
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

  getData() {
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
