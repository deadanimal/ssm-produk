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
import * as xlsx from 'xlsx';
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

  // Tax and Discount
  tax: number;
  discount: number;
  taxtype: any;
  discounttype: any;
  ctcfee: number;
  fee: number;

  // Chart
  chart: any;

  // Modal
  title: string = "Update Product"
  ssmfee: string;
  isSave: boolean = false
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
  selectedTask: any = null;
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
  // Aduh
  getData() {
    this.loadingBar.start()
    this.productService.getAll().subscribe(
      (res) => {
        this.loadingBar.complete()
        this.tableRows = res;
        this.tableRows.forEach(
          (row) => {
            if (row.created_date) {
              row.created_date = moment(row.created_date).format('DD/MM/YYYY')
            }

            if (row.modified_date) {
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
            id_index: key + 1
          };
        });
        console.log(this.tableTemp)
      }
    )
  }

  initForm() {
    this.updateForm = this.fb.group({
      name: new FormControl(),
      description: new FormControl(),
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
      channel: new FormControl(),
      output_type: new FormControl(),
      created_date: new FormControl(),
      modified_date: new FormControl(),
      fee: new FormControl(),
      language: new FormControl()
    })
  }

  entriesChange($event) {
    this.tableEntries = $event.target.value;
  }

  filterTable($event, type) {
    let val = $event.target.value.toLowerCase();
    if (type == 'product') {
      console.log(val)
      this.tableTemp = this.tableRows.filter(function (d) {
        return d.name.toLowerCase().indexOf(val) !== -1 || !val;
      });
    }
    else if (type == 'roc') {
      if (val == 'rob') {
        let valNew = true
        this.tableTemp = []
        this.tableRows.forEach(
          (item) => {
            if (
              !item['roc']

            ) {
              this.tableTemp.push(item)
            }
          }
        )
      }
      else if (val == 'roc') {
        let valNew = true
        this.tableTemp = []
        this.tableRows.forEach(
          (item) => {
            if (
              !item['rob'] &&
              item['roc']
            ) {
              this.tableTemp.push(item)
            }
          }
        )
      }
      else {
        this.tableTemp = this.tableRows
      }
    }
  }

  filterTableAll($event) {
    let val = $event.target.value.toLowerCase();
    this.tableTemp = this.tableRows.filter(function (d) {
      return d.title.toLowerCase().indexOf(val)! == -1 || !val;
    });
  }

  onSelect({ selected }) {
    this.tableSelected.splice(0, this.tableSelected.length);
    this.tableSelected.push(...selected);
  }

  openModal(modalRef: TemplateRef<any>, row) {

    this.selectedRow = row
    let truectc = true
    let num = this.selectedRow['fee'] / 100
    this.ssmfee = num.toFixed(2)
    this.updateForm.controls['name'].setValue(this.selectedRow['name'])
    this.modal = this.modalService.show(
      modalRef, this.modalConfig
    );
    // this.modal = this.modalService.show(modalRef, this.modalConfig);
  }

  openAddModal(modalRef: TemplateRef<any>) {
    this.title = "Add New Product"
    this.isSave = true

    this.modal = this.modalService.show(
      modalRef, this.modalConfig
    );
  }

  closeModal() {
    this.modal.hide();
  }

  save() {

    this.loadingBar.start()
    this.productService.create(this.updateForm.value).subscribe(
      () => {
        this.loadingBar.complete()
      },
      () => {
        this.loadingBar.complete()
        this.closeModal()
      },
      () => {
        this.loadingBar.complete()
        this.getData()
      }
    )
  }

  update() {
    this.loadingBar.start()
    this.productService.patch(this.selectedRow.id, this.updateForm.value).subscribe(
      () => {
        this.loadingBar.complete()
      },
      () => {
        this.loadingBar.complete()
        this.closeModal()
      },
      () => {
        this.loadingBar.complete()
        this.getData()
      }
    )
  }

  exportExcel() {
    let fileName = 'Product_List.xlsx'
    let element = document.getElementById('productTable');
    const ws: xlsx.WorkSheet = xlsx.utils.table_to_sheet(element);

    /* generate workbook and add the worksheet */
    const wb: xlsx.WorkBook = xlsx.utils.book_new();
    xlsx.utils.book_append_sheet(wb, ws, 'Sheet1');

    /* save to file */
    xlsx.writeFile(wb, fileName);
  }

  setCtc(e){
    let val = parseFloat(e)
    this.ctcfee = val
  }

  // setTax(e,a,t){
  //   let val = parseInt(e)
  //   this.fee = parseInt(a)
  //   console.log(this.fee)
  //   console.log(val)
  //   console.log(t)
  //   if(t == 'val'){
  //     this.taxtype = 'val'
  //     let totalfee = this.fee + val
  //     this.tax = val
  //     console.log(totalfee)
  //   }else if(t == '%'){
  //     this.taxtype = '%'
  //     let taxfee = (this.fee + this.ctcfee) * (val/100)
  //     this.tax = taxfee
  //     let totalfee = this.fee + taxfee
  //     console.log('totalfee: ',totalfee,' taxfee: ',taxfee)
  //   }
  // }


  // setDiscount(e,a,t){
  //   let val = parseInt(e)
  //   this.fee = parseInt(a)
  //   console.log(this.fee)
  //   console.log(val)
  //   console.log(t)
  //   if(t == 'val'){
  //     this.discounttype = 'val'
  //     this.discount = val
  //     let totalfee = this.fee - val
  //     console.log(totalfee)
  //   }else if(t == '%'){
  //     this.discounttype = '%'
  //     let discountfee = (this.fee + this.ctcfee) * (val/100)
  //     this.discount = discountfee
  //     let totalfee = this.fee - discountfee
  //     console.log('fee ',this.fee,'totalfee: ',totalfee,' discountfee: ',discountfee)
  //   }
  //   // this.setTotal(this.fee,this.discount, this.tax, this.discounttype, this.taxtype)
  // }

  setTotal(ssmfee, taxfee, discountfee, taxtype, discounttype){
    let total: number;
    console.log('ssmfee: ',ssmfee, ' taxfee: ',taxfee, ' discountfee: ', discountfee)
    discountfee = parseFloat(discountfee) 
    taxfee = parseFloat(taxfee)
    ssmfee = parseFloat(ssmfee)
    this.discount = discountfee
    this.tax = taxfee
    this.fee = ssmfee

    if(discounttype == 'val' && taxtype == 'val'){
      total = this.fee + this.tax - this.discount + this.ctcfee
      total = Math.round((total + Number.EPSILON) * 100) / 100
      console.log('val val')
      console.log('total: ',total,' fee: ',this.fee,' totaltax: ',this.tax,' totaldiscount: ',this.discount,' ctcfee: ',this.ctcfee)
    }
    else if(discounttype == 'val' && taxtype == '%'){
      this.tax = (this.fee + this.ctcfee) * (this.tax/100)
     // this.tax = Math.round((this.tax + Number.EPSILON) * 100) / 100
      total = this.fee + this.tax - this.discount + this.ctcfee
      total = Math.round((total + Number.EPSILON) * 100) / 100
      console.log('val %')
      console.log('total: ',total,' fee: ',this.fee,' totaltax: ',this.tax,' totaldiscount: ',this.discount,' ctcfee: ',this.ctcfee)
    }
    else if(discounttype == '%' && taxtype == 'val'){
      this.discount = (this.fee + this.ctcfee) * (this.discount/100)
     // this.discount = Math.round((this.discount + Number.EPSILON) * 100) / 100
      total = this.fee + this.tax - this.discount + this.ctcfee
      total = Math.round((total + Number.EPSILON) * 100) / 100
      console.log('% val')
      console.log('total: ',total,' fee: ',this.fee,' totaltax: ',this.tax,' totaldiscount: ',this.discount,' ctcfee: ',this.ctcfee)
    }
    else if(discounttype == '%' && taxtype == '%'){
      this.tax = (this.fee + this.ctcfee) * (this.tax/100)
     // this.tax = Math.round((this.tax + Number.EPSILON) * 100) / 100
      this.discount = (this.fee + this.ctcfee) * (this.discount/100)
     //this.discount = Math.round((this.discount + Number.EPSILON) * 100) / 100
      total = this.fee + this.tax - this.discount + this.ctcfee
      total = Math.round((total + Number.EPSILON) * 100) / 100
      console.log('% %')
      console.log('total: ',total,' fee: ',this.fee,' totaltax: ',this.tax,' totaldiscount: ',this.discount,' ctcfee: ',this.ctcfee)
    }
    
    console.log('discount: ',this.discount,'tax: ' ,this.tax)
  }


}
