import { Component, OnInit, TemplateRef } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {
  FormGroup,
  FormBuilder,
  Validators,
  FormControl,
} from '@angular/forms';
import swal from 'sweetalert2';
import { Router, ActivatedRoute } from '@angular/router';
import { BsModalRef, BsModalService } from 'ngx-bootstrap';
import { LoadingBarService } from '@ngx-loading-bar/core';
import { CbidTicketsService } from 'src/app/shared/services/cbid-tickets/cbid-tickets.service';

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
  tableEntries: number = 10;
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

  isCompleted: boolean = false
  completedDate: string = ''
  remarks: string = ''
  selectedRow
  

  constructor(
    private modalService: BsModalService,
    private formBuilder: FormBuilder,
    private loadingBar: LoadingBarService,
    private router: Router,
    private ticketService: CbidTicketsService
  ) {
    // this.projectData.getAll().subscribe((res) => {
    //   this.listProject = res;
    //   this.tableRows = [...res];
    //   console.log('data = ', this.listProject);
    //   console.log('Svc: ', this.tableRows);
    // });
    this.getData()
  }

  ngOnInit() {
    this.addAppReqForm = this.formBuilder.group({
      id: new FormControl(''),
      name: new FormControl(''),
      start_date: new FormControl(''),
      expected_completion_date: new FormControl(''),
      project_timeframe: new FormControl(''),
      department: new FormControl(''),
      owner_project: new FormControl(''),
      source_of_fund: new FormControl(''),
      project_cost: new FormControl(''),
      pic: new FormControl(''),
      created_date: new FormControl(''),
      modified_date: new FormControl(''),
    });

    this.editAppReqForm = this.formBuilder.group({
      id: new FormControl(''),
      name: new FormControl(''),
      start_date: new FormControl(''),
      expected_completion_date: new FormControl(''),
      project_timeframe: new FormControl(''),
      department: new FormControl(''),
      owner_project: new FormControl(''),
      source_of_fund: new FormControl(''),
      project_cost: new FormControl(''),
      pic: new FormControl(''),
      created_date: new FormControl(''),
      modified_date: new FormControl(''),
    });
    this.updateForm = this.formBuilder.group({
      status: new FormControl('CP'),
      completed_date: new FormControl('', Validators.required),
      remarks: new FormControl('')
    })
  }

  getData() {
    // let filterField = 'staff=' + this.authService.userID
    // console.log(filterField)
    // console.log('boom')
    this.loadingBar.start()
    this.ticketService.getAllExtended().subscribe(
      () => {
        this.loadingBar.complete()
        this.requestList = this.ticketService.ticketsExtended
        this.tableRows = this.requestList
        this.tableRows.forEach(
          (row) => {
            if(row.pending_date) {
              row.pending_date = moment(row.pending_date).format('DD/MM/YYYY')
            }

            if(row.completed_date) {
              row.completed_date = moment(row.completed_date).format('DD/MM/YYYY')
            }

            if(row.created_date) {
              row.created_date = moment(row.created_date).format('DD/MM/YYYY')
            }

            if(row.modified_date) {
              row.modified_date = moment(row.modified_date).format('DD/MM/YYYY')
            }
          }
        )
        // console.log(this.tableRows)
      },
      () => {
        this.loadingBar.complete()
      },
      () => {
        this.tableTemp = this.tableRows.map((prop, key) => {
          return {
            ...prop,
            id_index: key+1
          };
        });
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
    // if (row) {
    //   console.log(row);
    //   this.editAppReqForm.patchValue(row);
    // }
    this.selectedRow = row
    if (row) {
      if (row.status == 'PG') {
        this.isCompleted = false
      }
    }
    this.modal = this.modalService.show(
      modalRef, this.modalConfig
    );
    // this.modal = this.modalService.show(modalRef, this.modalConfig);
  }

  updateApplication() {
    this.loadingBar.start()
    let temp_completed_date = moment(this.completedDate).format('YYYY-MM-DD')
    this.updateForm.controls['completed_date'].setValue(temp_completed_date)
    this.updateForm.controls['remarks'].setValue(this.remarks)

    this.ticketService.patch(this.selectedRow.id, this.updateForm.value).subscribe(
      () => {
        this.loadingBar.complete()
        this.successAlert()
      },
      () => {
        this.loadingBar.complete()
        this.errorAlert()
      },
      () => {
        this.closeModal()
      }
    )
  }

  closeModal() {
    this.modal.hide();
    this.isCompleted = false
    this.completedDate = ''
    this.remarks = ''
  }

  navigatePage(path: String, id) {
    // let qq = 'db17a36a-1da6-4919-9746-dfed8802ec9d';
    console.log(id);
    console.log(path + '/' + id);
    if (path == '/admin//utility/Actions') {
      return this.router.navigate([path]);
    } else if (path == '/admin/project-details') {
      return this.router.navigate([path, id]);
    }
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
