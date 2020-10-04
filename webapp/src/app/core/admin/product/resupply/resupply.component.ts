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


import { ProductsService } from '../../../../shared/services/products/products.service';

import * as moment from 'moment';

export enum SelectionType {
  single = 'single',
  multi = 'multi',
  multiClick = 'multiClick',
  cell = 'cell',
  checkbox = 'checkbox',
}

@Component({
  selector: 'app-resupply',
  templateUrl: './resupply.component.html',
  styleUrls: ['./resupply.component.scss']
})
export class ResupplyComponent implements OnInit {

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
    private productsService: ProductsService,
  ) {

  }

  ngOnInit() {
    this.initData();
  }

  initData() {
    this.productsService.getAllProducts().subscribe(
      (res) => {
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

  onActivate(event) {
    this.tableActiveRow = event.row;
  }
  openModal(modalRef: TemplateRef<any>, row) {

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

  closeModal() {
    this.modal.hide();
    this.isCompleted = false
    this.completedDate = ''
    this.remarks = ''
  }  

  updateApplication() {
    this.loadingBar.start()

    let application_ = this.selectedRow;

    let temp_completed_date = moment(this.completedDate).format('YYYY-MM-DD')
    temp_completed_date = temp_completed_date + 'T08:00:00.000000Z'
    this.updateForm.controls['completed_date'].setValue(temp_completed_date)

    let id_ = application_['id']
    
    let change_ = {
      'completed': this.isCompleted,
    }

    if (this.completedDate != '') {
      change_['completed_date'] = temp_completed_date
    }
    change_['remarks'] = this.remarks;
    console.log(change_)

    // this.servicesService.markAsCompleteServiceRequest(id_, change_).subscribe(
    //   (respond)=> {
    //     console.log(respond)
    //   },
    //   (error) => {
    //     this.closeModal()
    //   },
    //   () => {
    //     this.closeModal()
    //     this.initData();
    //   }
    // )

    


  }  

}
