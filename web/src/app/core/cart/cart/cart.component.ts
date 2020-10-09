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

import { CartsService } from 'src/app/shared/services/carts/carts.service';
import { LocalFilesService } from 'src/app/shared/services/local-files/local-files.service';
import { BusinessCode } from 'src/app/shared/models/business-code.model';
import { CompanyStatus } from 'src/app/shared/models/company-status.model';
import { StateCode } from 'src/app/shared/models/state-code.model';

import * as moment from 'moment';

export enum SelectionType {
  single = 'single',
  multi = 'multi',
  multiClick = 'multiClick',
  cell = 'cell',
  checkbox = 'checkbox',
}

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {

  // Modal
  modal: BsModalRef;
  modalConfig = {
    keyboard: true,
    class: 'modal-dialog-centered',
  }

  // Table
  tableEntries: number = 10
  tableSelected: any[] = []
  tableTemp = []
  tableActiveRow: any
  tableRows: any[] = []
  SelectionType = SelectionType
  tableMessages = {
    // Message to show when array is presented
    // but contains no values
    emptyMessage: 'Empty cart',
  
    // Footer total message
    totalMessage: '',
  
    // Footer selected message
    selectedMessage: 'selected'
  }

  // Form
  searchForm: FormGroup
  searchField: FormGroup
  addAppReqForm: FormGroup
  editAppReqForm: FormGroup

  // Data
  items: any[] = []
  toRemove: any[] = []
  tableCheckbox: boolean = true
  formTypes: any[] = []
  businessCodes: BusinessCode[] = []
  companyStatus: CompanyStatus[] = []
  stateCodes: StateCode[] = []
  companyOrigins: any[] = []
  companyTypes: any[] = []
  sectors: any[] = []
  divisions: any[] = []

  // Icons
  iconEmpty = 'assets/img/default/shopping-bag.svg'

  // declare variable
  sum: number = 0
  total: number = 0
  totaldocument: number = 0

  // Checker
  isEmpty: boolean = false

  selectedCriteria: any

  constructor(
    private fb: FormBuilder,
    private loadingBar: LoadingBarService,
    private cartService: CartsService,
    private modalService: BsModalService,
    private formBuilder: FormBuilder,
    private fileService: LocalFilesService,
    private router: Router
  ) {
    this.fileService.get('form-types.json').subscribe(
      (res) => {
        this.formTypes = res
        console.log(this.formTypes)
      }
    )
    this.fileService.get('company-status.json').subscribe(
      (res) => {
        this.companyStatus = res
        console.log(this.companyStatus)
      }
    )

    this.fileService.get('state-codes.json').subscribe(
      (res) => {
        this.stateCodes = res
        console.log(this.stateCodes)
      }
    )
    
    this.fileService.get('company-origins.json').subscribe(
      (res) => {
        this.companyOrigins = res
        console.log(this.companyOrigins)
      }
    )

    this.fileService.get('company-types.json').subscribe(
      (res) => {
        this.companyTypes = res
        console.log(this.companyTypes)
      }
    )
  }

  ngOnInit(): void {
    this.getData()
  }

  getData() {
    this.loadingBar.useRef('http').start()
    this.cartService.getOne(this.cartService.cartCurrent.id).subscribe(
      () => {
        this.loadingBar.useRef('http').complete()
        this.items = this.cartService.cart.cart_item
        this.tableRows = this.cartService.cart.cart_item
        console.log(this.tableRows)
        this.total = 0
        this.tableRows.forEach(
          (item) => {
            item['isTick'] = true
            if (item.product) {
              this.total += item.product.fee
            }
            else if(item.service_request) {
              this.total += item.service_request.service.fee
            }
            else if(item.quota) {
              this.total += 2000
            }
            else if(item.product_search_criteria) {
              this.total += item.product_search_criteria.total_price
            }

            if (item['image_form_type']) {
              console.log(item['image_form_type'])
              this.formTypes.forEach(
                (code) => {
                  if (code.code == item['image_form_type']) {
                    item['image_form_type'] = code.desc_en
                    console.log('meaning:', code.desc_en)
                    console.log(item['image_form_type'])
                  } 
                }
              )
            }
          }
        )
      },
      () => {
        this.loadingBar.useRef('http').complete()
      },
      () => {
        this.tableTemp = this.tableRows.map((prop, key) => {
          return {
            ...prop,
            id_index: key+1
          }
        })
        this.totaldocument = this.tableRows.length
        this.updatePrice()
      }
    )
  }

  updatePrice() {
    let body = {
      'total_price_before_tax': this.total
    }
    this.cartService.updatePrice(this.cartService.cartCurrent.id, body).subscribe()
  }

  removeItem(id: string) {
    this.loadingBar.useRef('http').start()
    let body = {
      "cart_item_id": id
    }
    this.cartService.removeItem(this.cartService.cartCurrent.id, body).subscribe(
      () => {
        this.loadingBar.useRef('http').complete()
      },
      () => {
        this.loadingBar.useRef('http').complete()
      },
      () => {
        this.getData()
      }
    )
  }

  checkRow(selected) {
    this.tableRows.forEach(
      (item) => {
        if (item['id'] == selected['id']) {
          item['isTick'] = !item['isTick']
          this.tableCheckbox = false
        }
      }
    )
  }

  selectAllRow() {
    this.tableTemp.forEach(
      (item) => {
        item['isTick'] = this.tableCheckbox
      }
    )
  }

  emptyCart() {
    this.tableRows.forEach(
      (item) => {
        this.removeItem(item.id)
      }
    )
  }

  removeSelected() {
    this.tableRows.forEach(
      (item) => {
        if (item['isTick']) {
          this.removeItem(item.id)
        }
      }
    )
  }

  proceed() {
    let filterCheckout = new Promise(
      (resolve, reject) => {
        this.tableRows.forEach(
          (item, index, array) => {
            if (!item['isTick']) {
              this.removeItem(item.id)
            }
            console.log('index', index)
            console.log('array length', array.length-1)
            
            setInterval(
              () => {
                if (index == array.length - 1) resolve();
              }, 1000
            )
          }
        )
      }
    )
      
    filterCheckout.then(
      () => {
        console.log('cendol', this.tableRows.length)
        
        if (this.tableRows.length != 0) {
          this.navigatePage('/cart/checkout')
        }
        else {
          this.navigatePage('/products/search')
        }
      }
    );
    
  }

  successAlert(task) {
    swal.fire({
      title: 'Success',
      text: task,
      icon: 'success',
      // showCancelButton: true,
      buttonsStyling: false,
      confirmButtonText: 'Close',
      customClass: {
        cancelButton: 'btn btn-outline-success',
        confirmButton: 'btn btn-success ',
      },
    });
    console.log('confirm');
  }

  makePayment() {
    // this.loadingBar.
    // this.loadingBar.complete();
  }

  remove() {
    console.log('Item removed');
  }

  navigatePage(path: string) {
    // console.log('Path: ', path)
    this.router.navigate([path]);
  }

  openModal(modalRef: TemplateRef<any>, row) {
    let tempIncorpFrom = moment(row['product_search_criteria']['incorp_date_from']).format('DD/MM/YYYY')
    let tempIncorpTo = moment(row['product_search_criteria']['incorp_date_to']).format('DD/MM/YYYY')
    let tempCompanyStatus
    let tempCompanyType
    let tempBusinessCode = row['product_search_criteria']['business_code']
    let tempCompanyOrigin
    let tempCompanyLocation

    console.log(row['product_search_criteria'])

    this.companyStatus.forEach(
      (status) => {
        if (status.code == row['product_search_criteria']['company_status']) {
          tempCompanyStatus = status.desc
        }
      }
    )

    this.companyTypes.forEach(
      (type) => {
        if (type.code == row['product_search_criteria']['company_type']) {
          tempCompanyType = type.desc
        }
      }
    )

    this.companyOrigins.forEach(
      (origin) => {
        if (origin.code == row['product_search_criteria']['company_origin']) {
          tempCompanyOrigin = origin.desc
          console.log(tempCompanyOrigin)
        }
      }
    )

    this.stateCodes.forEach(
      (state) => {
        if (state.code == row['product_search_criteria']['company_location']) {
          tempCompanyLocation = state.desc
          console.log('found')
        }
      }
    )
    this.selectedCriteria = {
      'IncorpFrom': tempIncorpFrom,
      'IncorpTo': tempIncorpTo,
      'CompanyStatus': tempCompanyStatus,
      'CompanyType': tempCompanyType,
      'BusinessCode': tempBusinessCode,
      'CompanyOrigin': tempCompanyOrigin,
      'CompanyLocation': tempCompanyLocation

    }
    console.log(this.selectedCriteria)
    this.modal = this.modalService.show(modalRef, this.modalConfig);
  }

  closeModal() {
    this.modal.hide();
    delete this.selectedCriteria
  }

  entriesChange($event) {
    this.tableEntries = $event.target.value;
  }

  filterTable($event) {
    let val = $event.target.value;
    this.tableTemp = this.tableRows.filter(function (d) {
      for (var key in d) {
        if (d[key].toLowerCase().indexOf(val) !== -1) {
          return true;
        }
      }
      return false;
    });
  }

  onSelect({ selected }) {
    this.tableSelected.splice(0, this.tableSelected.length);
    this.tableSelected.push(...selected);
  }

  onActivate(event) {
    this.tableActiveRow = event.row;
  }

  viewCriteria() {

  }

}
