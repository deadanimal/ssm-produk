import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';

import * as moment from 'moment';
import { forkJoin } from 'rxjs';
import { ServicesService } from 'src/app/shared/services/services/services.service';

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
  departmentForm: FormGroup
  ministryForm: FormGroup

  constructor(
    private serviceService: ServicesService,
    private fb: FormBuilder
  ) { 
    this.getData()
  }

  ngOnInit() {
  }

  initForm() {
    this.departmentForm = this.fb.group({
      name: new FormControl(),
      ministry: new FormControl()
    })

    this.ministryForm = this.fb.group({
      name: new FormControl()
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
        return d.title.toLowerCase().indexOf(val) !== -1 || !val;
      });
    }
    else if (type == 'ministry') {
      let val = $event.target.value.toLowerCase();
      this.tableMinistryTemp = this.tableMinistryRows.filter(function(d) {
        return d.title.toLowerCase().indexOf(val) !== -1 || !val;
      });
    }
  }

  updateDepartment() {
    this.serviceService.patchDepartment(this.selectedRow['id'], this.departmentForm.value).subscribe(
      () => {
        this.getData()
      }
    )
  }

}
