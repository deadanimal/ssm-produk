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
import { StatisticsService } from 'src/app/shared/services/statistics/statistics.service';

export enum SelectionType {
  single = 'single',
  multi = 'multi',
  multiClick = 'multiClick',
  cell = 'cell',
  checkbox = 'checkbox',
}

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.scss']
})
export class StatisticsComponent implements OnInit {

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
    private fb: FormBuilder,
    private loadingBar: LoadingBarService,
    private router: Router,
    private productsService: ProductsService,
    private statService: StatisticsService
  ) {

  }

  ngOnInit() {
    this.initData();
    this.initForm()
  }

  initForm() {
    this.updateForm = this.fb.group({
      id: new FormControl(),
      value: new FormControl()
    })
  }

  initData() {
    this.statService.getAll().subscribe(
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
    this.updateForm.controls['value'].setValue(row.value)
    console.log(row)
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

  update() {
    this.loadingBar.start()
    this.statService.patch(this.selectedRow['id'], this.updateForm.value).subscribe(
      () => {
        this.loadingBar.complete()
      },
      () => {
        this.loadingBar.complete()
      },
      () => {
        this.closeModal()
        this.initData()
      }
    )
  }  

}
