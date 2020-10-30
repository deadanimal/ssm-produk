import { Component, OnInit, TemplateRef } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  Validators,
  FormControl,
} from '@angular/forms';
import swal from 'sweetalert2';
import { Router } from '@angular/router';
import { BsModalRef, BsModalService } from 'ngx-bootstrap';
import { LoadingBarService } from '@ngx-loading-bar/core';
import { CbidTicketsService } from 'src/app/shared/services/cbid-tickets/cbid-tickets.service';

import { ServicesService } from '../../../../shared/services/services/services.service';

import * as moment from 'moment';

export enum SelectionType {
  single = 'single',
  multi = 'multi',
  multiClick = 'multiClick',
  cell = 'cell',
  checkbox = 'checkbox',
}

@Component({
  selector: 'app-application-requests',
  templateUrl: './application-requests.component.html',
  styleUrls: ['./application-requests.component.scss'],
})
export class ApplicationRequestsComponent implements OnInit {
  // Chart
  chart: any;

  // Modal
  modal: BsModalRef;
  modalConfig = {
    keyboard: true,
    class: 'modal-dialog-centered modal-lg',
  };

  // Table
  tableEntries: number = 5;
  tableSelected: any[] = [];
  tableTemp = [];
  tableActiveRow: any;
  tableRows: any[] = [];
  SelectionType = SelectionType;
  requestList: any;

  // Form
  searchForm: FormGroup;
  searchField: FormGroup;
  addAppReqForm: FormGroup;
  editAppReqForm: FormGroup;

  updateForm: FormGroup

  isCompleted: boolean = false;
  isRejected: boolean = false;
  completedDate: string = ''
  remarks: string = ''
  selectedRow;

  constructor(
    private modalService: BsModalService,
    private formBuilder: FormBuilder,
    private loadingBar: LoadingBarService,
    private router: Router,
    private ticketService: CbidTicketsService,
    private servicesService: ServicesService,
  ) {

  }

  ngOnInit() {
    this.initData();
  }

  initData() {

    this.updateForm = this.formBuilder.group({
      id: new FormControl(),
      in_progress: new FormControl(false),
      completed: new FormControl(false),
      in_progress_date: new FormControl(),
      completed_date: new FormControl(),
      remarks: new FormControl()
    })
    this.loadingBar.start()
    this.servicesService.getAll().subscribe(
      (res) => {
        this.tableRows = res;
        this.tableRows.forEach(
          (row) => {
            this.loadingBar.complete()
            let unix_ = moment(row['created_date']).format('x')
            let year = (moment(row['created_date']).year()).toString()
            let month = (moment(row['created_date']).month() + 1).toString()
            let day = (moment(row['created_date']).date()).toString()
            row['reference_id'] = 'CBID' + year + month + day + unix_.slice(6,12)
            row['receipt_no'] = 'SSMB' + year + month + day + unix_.slice(6,12)
            if(row.in_progress) {
              row.in_progress_date = moment(row.in_progress_date).format('DD/MM/YYYY')
            }

            if(row.completed) {
              row.completed_date = moment(row.completed_date).format('DD/MM/YYYY')
            }

            if(row.created_date) {
              row.created_date = moment(row.created_date).format('DD/MM/YYYY')
            }

            if(row.modified_date) {
              row.modified_date = moment(row.modified_date).format('DD/MM/YYYY')
            }
          },
          () => {
            this.loadingBar.complete()
          }
        )        
      },
      (err) => {

      },
      () => {
        this.tableTemp = this.tableRows.map((prop, key) => {
          return {
            ...prop,
            id_index: key+1
          };
        });        
        // console.log(this.tableTemp)
      }
    )
  }

  entriesChange($event) {
    this.tableEntries = $event.target.value;
  }

  filterTable($event) {
    let val = $event.target.value.toLowerCase();
    this.tableTemp = this.tableRows.filter(function(d) {
      return d.title.toLowerCase().indexOf(val) ! == -1 || !val;
    });
  }

  onSelect({ selected }) {
    this.tableSelected.splice(0, this.tableSelected.length);
    this.tableSelected.push(...selected);
  }

  onActivate(event) {
    this.tableActiveRow = event.row;
  }
  
  openModal(modalRef: TemplateRef<any>, row) {

    this.selectedRow = row
    this.updateForm.controls['id'].setValue(row.id)
    this.updateForm.controls['in_progress'].setValue(row.in_progress)
    this.updateForm.controls['completed'].setValue(row.completed)
    this.updateForm.controls['remarks'].setValue(row.remarks)
    // console.log(row)
    this.modal = this.modalService.show(
      modalRef, this.modalConfig
    );
    // this.modal = this.modalService.show(modalRef, this.modalConfig);
  } 

  closeModal() {
    this.modal.hide();
    this.isCompleted = false
    this.completedDate = ''
    this.remarks = ''
  }  

  updateApplication() {
    this.loadingBar.start()

    // let application_ = this.selectedRow;

    // let temp_completed_date = moment(this.completedDate).format('YYYY-MM-DD')
    // temp_completed_date = temp_completed_date + 'T08:00:00.000000Z'
    // this.updateForm.controls['completed_date'].setValue(temp_completed_date)

    // let id_ = application_['id']
    
    // let change_ = {
    //   'completed': this.isCompleted,
    // }

    // if (this.completedDate != '') {
    //   change_['completed_date'] = temp_completed_date
    // }
    // change_['remarks'] = this.remarks;
    // console.log(change_)

    let id_ = this.updateForm.value['id']

    if (
      this.updateForm.value['in_progress'] &&
      this.updateForm.value['in_progress_date'] &&
      !this.updateForm.value['completed'] &&
      !this.updateForm.value['completed_date']
    ) {
      // console.log('In progress')
      // console.log('At progress', this.selectedRow['in_progress_date'])
      // console.log(this.updateForm.value['in_progress_date'])
      console.log('1')
      let newProgressDate = moment(this.updateForm.value['in_progress_date']).format('YYYY-MM-DD') + 'T08:00:00.000000Z'
      this.updateForm.controls['in_progress_date'].setValue(newProgressDate)
      this.selectedRow['in_progress_date'] = this.updateForm.value['in_progress_date']
      console.log(this.updateForm.value)
    }
    if (
      this.updateForm.value['completed'] &&
      this.updateForm.value['completed_date']
    ) {
      // console.log('Completed')
      // console.log('At completed', this.selectedRow['in_progress_date'])
      // console.log(this.updateForm.value['in_progress_date'])
      // console.log('2')
      // this.selectedRow['in_progress_date']
      // console.log(this.updateForm.value['in_progress_date'])
      let newCompletedDate = moment(this.updateForm.value['completed_date']).format('YYYY-MM-DD') + 'T08:00:00.000000Z'
      let newProgressDate = moment(this.selectedRow['in_progress_date'], 'DD/MM/YYYY').format('YYYY-MM-DD') + 'T08:00:00.000000Z'
      console.log('pd', newProgressDate)
      console.log('this is a test')

      if (newProgressDate == 'Invalid dateT08:00:00.000000Z') {
        console.log('oi')
        newProgressDate = moment(this.updateForm.value['in_progress_date']).format('YYYY-MM-DD') + 'T08:00:00.000000Z'
        this.updateForm.controls['in_progress_date'].setValue(newProgressDate)
      }
      else {
        this.updateForm.controls['in_progress_date'].setValue(newProgressDate)
      }

      if (!this.updateForm.value['in_progress']) {
        this.updateForm.controls['in_progress_date'].setValue(newCompletedDate)
        this.updateForm.controls['in_progress'].setValue(true)
      }

      this.updateForm.controls['completed_date'].setValue(newCompletedDate)
      this.selectedRow['in_progress_date'] = this.updateForm.value['in_progress_date']
      console.log(this.updateForm.value)
    }
    else if (
      this.updateForm.value['in_progress'] &&
      !this.updateForm.value['in_progress_date'] &&
      this.updateForm.value['completed'] &&
      !this.updateForm.value['completed_date']
    ) {
      let newProgressDate = moment(this.selectedRow['in_progress_date'], 'DD/MM/YYYY').format('YYYY-MM-DD') + 'T08:00:00.000000Z'
      let newCompletedDate = moment(this.selectedRow['completed_date'], 'DD/MM/YYYY').format('YYYY-MM-DD') + 'T08:00:00.000000Z'
      this.updateForm.controls['in_progress_date'].setValue(newProgressDate)
      this.updateForm.controls['completed_date'].setValue(newCompletedDate)
    }

    console.log(this.updateForm.value)

    this.servicesService.patch(id_, this.updateForm.value).subscribe(
      (respond)=> {
        // console.log(respond)
        this.loadingBar.complete()
        this.successAlert()
      },
      (error) => {
        this.loadingBar.complete()
        this.errorAlert()
        this.closeModal()
      },
      () => {
        this.closeModal()
        this.initData();
        this.updateForm.reset()
      }
    )

    


  }

  errorAlert() {
    swal.fire({
      title: 'Error',
      text: 'Please Try Again!',
      type: 'error',
      buttonsStyling: false,
      confirmButtonClass: 'btn btn-danger',
      confirmButtonText: 'Close',
    });
  }

  successAlert() {
    swal.fire({
      title: 'Success',
      text: 'Successfully Update',
      type: 'success',
      buttonsStyling: false,
      confirmButtonClass: 'btn btn-success',
      confirmButtonText: 'Close',
    });
  }

}
