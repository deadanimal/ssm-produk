import { Component, OnInit, TemplateRef } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';

import * as moment from 'moment';
import { LoadingBarService } from '@ngx-loading-bar/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap';
import { forkJoin } from 'rxjs';
import { ServicesService } from 'src/app/shared/services/services/services.service';
import swal from 'sweetalert2';

export enum SelectionType {
  single = 'single',
  multi = 'multi',
  multiClick = 'multiClick',
  cell = 'cell',
  checkbox = 'checkbox',
}

@Component({
  selector: 'app-egov-dropdown',
  templateUrl: './egov-dropdown.component.html',
  styleUrls: ['./egov-dropdown.component.scss']
})
export class EgovDropdownComponent implements OnInit {

  // Data
  ministries: any[]
  departments: any[]
  selectedRow

  // Table
  tableDepartmentEntries: number = 20
  tableDepartmentSelected: any[] = []
  tableDepartmentTemp = []
  tableDepartmentActiveRow: any
  tableDepartmentRows: any[] = []

  tableMinistryEntries: number = 20
  tableMinistrySelected: any[] = []
  tableMinistryTemp = []
  tableMinistryActiveRow: any
  tableMinistryRows: any[] = []

  SelectionType = SelectionType

  // Form
  departmentUpdateForm: FormGroup
  ministryUpdateForm: FormGroup
  departmentAddForm: FormGroup
  ministryAddForm: FormGroup

  // Modal
  modal: BsModalRef;
  modalConfig = {
    keyboard: true,
    class: 'modal-dialog-centered modal-lg',
  };

  constructor(
    private loadingBar: LoadingBarService,
    private serviceService: ServicesService,
    private fb: FormBuilder,
    private modalService: BsModalService
  ) { 
    this.getData()
    this.initForm()
  }

  ngOnInit() {
  }

  initForm() {
    this.departmentUpdateForm = this.fb.group({
      id: new FormControl(),
      name: new FormControl(),
      ministry: new FormControl(),
      active: new FormControl()
    })

    this.ministryUpdateForm = this.fb.group({
      id: new FormControl(),
      name: new FormControl(),
      active: new FormControl()
    })

    this.departmentAddForm = this.fb.group({
      name: new FormControl(),
      ministry: new FormControl(),
      active: new FormControl()
    })

    this.ministryAddForm = this.fb.group({
      id: new FormControl(),
      name: new FormControl(),
      active: new FormControl()
    })
  }

  getData() {
    forkJoin([
      this.serviceService.getEgovMinistries(),
      this.serviceService.getEgovDepartments()
    ]).subscribe(
      (res) => {
        this.ministries = res[0]
        this.departments = res[1]

        this.ministries.forEach(
          (ministry) => {
            ministry['created_date'] = moment(ministry['created_date']).format('DD/MM/YYYY')
            ministry['modified_date'] = moment(ministry['modified_date']).format('DD/MM/YYYY')
          }
        )

        this.departments.forEach(
          (department) => {
            department['created_date'] = moment(department['created_date']).format('DD/MM/YYYY')
            department['modified_date'] = moment(department['modified_date']).format('DD/MM/YYYY')
          }
        )
      },
      () => {},
      () => {
        this.tableMinistryRows = this.ministries
        this.tableMinistryTemp = this.tableMinistryRows.map((prop, key) => {
          return {
            ...prop,
            id_index: key+1
          };
        })

        this.tableDepartmentRows = this.departments
        this.tableDepartmentTemp = this.tableDepartmentRows.map((prop, key) => {
          return {
            ...prop,
            id_index: key+1
          };
        })
      }
    )
  }


  entriesChange($event, type) {
    if (type == 'department') {
      this.tableDepartmentEntries = $event.target.value;
    }
    else if (type == 'ministry') {
      this.tableMinistryEntries = $event.target.value;
    }
  }

  filterTable($event, type) {
    if (type == 'department') {
      let val = $event.target.value.toLowerCase();
      this.tableDepartmentTemp = this.tableDepartmentRows.filter(function(d) {
        return d.name.toLowerCase().indexOf(val) !== -1 || !val;
      });
    }
    else if (type == 'ministry') {
      let val = $event.target.value.toLowerCase();
      this.tableMinistryTemp = this.tableMinistryRows.filter(function(d) {
        return d.name.toLowerCase().indexOf(val) !== -1 || !val;
      });
    }
  }

  openModal(modalRef: TemplateRef<any>, row, type) {
    console.log(row)
    this.selectedRow = row
    if (type == 'department') {
      this.departmentUpdateForm.controls['id'].setValue(row.id)
      this.departmentUpdateForm.controls['name'].setValue(row.name)
      this.departmentUpdateForm.controls['ministry'].setValue(row.ministry.id)
      this.departmentUpdateForm.controls['active'].setValue(row.active)
    }
    else if (type == 'ministry') {
      this.ministryUpdateForm.controls['id'].setValue(row.id)
      this.ministryUpdateForm.controls['name'].setValue(row.name),
      this.ministryUpdateForm.controls['active'].setValue(row.active)
    }
    // console.log(row)
    this.modal = this.modalService.show(
      modalRef, this.modalConfig
    );
    // this.modal = this.modalService.show(modalRef, this.modalConfig);
  } 

  openModalAdd(modalRef: TemplateRef<any>) {
    this.modal = this.modalService.show(
      modalRef, this.modalConfig
    );
    // this.modal = this.modalService.show(modalRef, this.modalConfig);
  } 

  closeModal() {
    this.modal.hide()
  }

  updateDep() {
    this.loadingBar.start()
    console.log(this.selectedRow['id'])
    console.log(this.departmentUpdateForm.value)
    // console.log('jiji')
    this.serviceService.patchDepartment(this.selectedRow['id'], this.departmentUpdateForm.value).subscribe(
      () => {},
      () => {
        this.loadingBar.complete()
        this.closeModal()
      },
      () => {
        this.loadingBar.complete()
        let message = 'Department Updated' 
        this.successAlert(message)
        this.getData()
        this.closeModal()
      }
    )
  }

  updateMin() {
    this.loadingBar.start()
    console.log(this.selectedRow['id'])
    console.log(this.ministryUpdateForm.value)
    // console.log('jiji')
    this.serviceService.patchMinistry(this.selectedRow['id'], this.ministryUpdateForm.value).subscribe(
      () => {},
      () => {
        this.loadingBar.complete()
        this.closeModal()
      },
      () => {
        this.loadingBar.complete()
        let message = 'Ministry Updated' 
        this.successAlert(message);
        this.getData()
        this.closeModal()
      }
    )
  }

  addDep() {
    this.loadingBar.start()
    this.serviceService.createDepartment(this.departmentAddForm.value).subscribe(
      () => {},
      () => {
        this.loadingBar.complete()
        this.closeModal()
      },
      () => {
        this.loadingBar.complete()
        let message = 'Department Added' 
        this.successAlert(message)
        this.departmentAddForm.reset()
        this.getData()
        this.closeModal()
      }
    )
  }

  addMin() {
    this.loadingBar.start()
    this.serviceService.createMinistry(this.ministryAddForm.value).subscribe(
      () => {},
      () => {
        this.loadingBar.complete()
        let message = 'Ministry Added' 
        this.successAlert(message);
        this.ministryAddForm.reset()
        this.getData();
        this.closeModal()
      },
      () => {
        this.loadingBar.complete()
        this.getData()
        this.closeModal()
      },

    )
    
  }

  successAlert(task) {
    swal.fire({
      title: 'Success',
      text: task,
      type: 'success',
      // showCancelButton: true,
      buttonsStyling: false,
      confirmButtonText: 'Close',
      customClass: {
        cancelButton: 'btn btn-outline-success',
        confirmButton: 'btn btn-success ',
      },
    })
    .then(() => {
      // this.initForm()
      
    })
    // this.navigatePage('/enquiry');
  }

  errorAlert(task) {
    swal.fire({
      title: 'Error',
      text: task,
      type: 'warning',
      buttonsStyling: false,
      confirmButtonText: 'Close',
      customClass: {
        confirmButton: 'btn btn-warning ',
      },
    })
    .then(() => {
      // this.initForm()
    })
  }

}
