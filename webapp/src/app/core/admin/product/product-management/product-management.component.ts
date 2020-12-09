import { Component, OnInit, TemplateRef } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  Validators,
  FormControl,
} from '@angular/forms';

import { Router } from '@angular/router';
import { BsModalRef, BsModalService } from 'ngx-bootstrap';
import { LoadingBarService } from '@ngx-loading-bar/core';

import { ProductsService } from '../../../../shared/services/products/products.service';

import * as moment from 'moment';
import swal from 'sweetalert2';

export enum SelectionType {
  single = 'single',
  multi = 'multi',
  multiClick = 'multiClick',
  cell = 'cell',
  checkbox = 'checkbox',
}

@Component({
  selector: 'app-product-management',
  templateUrl: './product-management.component.html',
  styleUrls: ['./product-management.component.scss']
})
export class ProductManagementComponent implements OnInit {

  // Chart
  chart: any;

  // Modal
  modal: BsModalRef;
  modalConfig = {
    keyboard: true,
    class: 'modal-dialog-centered modal-lg',
  };

  // Table
  tableEntries: number = 10
  tableSelected: any[] = []
  tableTemp = []
  tableActiveRow: any
  tableRows: any[] = []
  SelectionType = SelectionType
  requestList: any

  // 
  isCompleted: boolean = false
  isRejected: boolean = false
  completedDate: string = ''
  remarks: string = ''
  selectedRow

  // Form
  updateForm: FormGroup

  constructor(
    private modalService: BsModalService,
    private fb: FormBuilder,
    private loadingBar: LoadingBarService,
    private router: Router,
    private productService: ProductsService,
  ) {

  }

  ngOnInit() {
    this.getData()
    this.initForm()
  }

  getData() {
    this.loadingBar.start()
    this.productService.getAll().subscribe(
      (res) => {
        this.loadingBar.complete()
        this.tableRows = res;
        this.tableRows.forEach(
          (row) => {
            if(row.created_date) {
              row.created_date = moment(row.created_date).format('DD/MM/YYYY')
            }

            if(row.modified_date) {
              row.modified_date = moment(row.modified_date).format('DD/MM/YYYY')
            }
          }
        )        
      },
      (err) => {
        this.loadingBar.complete()
      },
      () => {
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

  initForm() {
    this.updateForm = this.fb.group({
      name: new FormControl(),
      fee: new FormControl(),
      active: new FormControl(),
      roc: new FormControl(),
      ctc: new FormControl(),
      tax: new FormControl(),
      tax_start_date: new FormControl(),
      tax_end_date: new FormControl(),
      discount: new FormControl(),
      discount_start_date: new FormControl(),
      discount_end_date: new FormControl(),
      coa_code: new FormControl(),
      coa_description: new FormControl(),
      webservice: new FormControl(),
      channel: new FormControl()
    })
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
  
  openModal(modalRef: TemplateRef<any>, row) {

    this.selectedRow = row
    this.updateForm.controls['name'].setValue(this.selectedRow['name'])
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
    delete this.selectedRow
  }  

  update() {
    this.loadingBar.start()
    this.productService.patch(this.selectedRow.id, this.updateForm).subscribe(
      () => {
        this.loadingBar.complete()
      },
      () => {
        this.loadingBar.complete()
      },
      () => {}
    )
  }  

}
