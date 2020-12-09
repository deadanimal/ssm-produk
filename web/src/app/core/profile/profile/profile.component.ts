import { ChangeDetectorRef, Component, ElementRef, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import swal from 'sweetalert2';
import {
  FormGroup,
  FormBuilder,
  Validators,
  FormControl,
} from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

// user service
import { UsersService } from 'src/app/shared/services/users/users.service';

// auth service
import { AuthService } from 'src/app/shared/services/auth/auth.service';

import { TransactionsService } from 'src/app/shared/services/transactions/transactions.service';

import { CartsService } from 'src/app/shared/services/carts/carts.service';
import { ProductsService } from 'src/app/shared/services/products/products.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { CartExtended, CartItemExtended } from 'src/app/shared/services/carts/carts.model';

import { LocalFilesService } from 'src/app/shared/services/local-files/local-files.service';

import * as moment from 'moment';
import { BusinessCode } from 'src/app/shared/models/business-code.model';
import { CompanyStatus } from 'src/app/shared/models/company-status.model';
import { StateCode } from 'src/app/shared/models/state-code.model';
import { User } from 'src/app/shared/services/users/users.model';
import { LoadingBarService } from '@ngx-loading-bar/core';
import { ServicesService } from 'src/app/shared/services/services/services.service';

export enum SelectionType {
  single = 'single',
  multi = 'multi',
  multiClick = 'multiClick',
  cell = 'cell',
  checkbox = 'checkbox',
}

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {

  // Data
  transactions: any[] = []
  orders: any[] = []
  user: User
  selectedCriteria: any

  // Modal
  modal: BsModalRef
  modalTransactionDetail: BsModalRef
  modalConfig = {
    keyboard: true,
    class: 'modal-dialog-centered modal-lg',
  }

  /// Form
  addressForm: FormGroup

  // eGov Form
  requestForm: FormGroup
  requestQuotaForm: FormGroup

  // Table
  tableEntries: number = 10
  tableSelected: any[] = []
  tableTemp = []
  tableActiveRow: any
  tableRows: any[] = []
  SelectionType = SelectionType

  tableOrderEntries: number = 10
  tableOrderSelected: any[] = []
  tableOrderTemp = []
  tableOrderActiveRow: any
  tableOrderRows: any[] = []

  // Tabs
  accountTabActive: boolean = false
  transactionTabActive: boolean = false
  orderTabActive: boolean = false
  requestTabActive: boolean = false

  // Receipt
  transaction: any
  cart: CartExtended
  items: CartItemExtended[] = []
  formTypes: any[] = []
  businessCodes: BusinessCode[] = []
  companyStatus: CompanyStatus[] = []
  stateCodes: StateCode[] = []
  companyOrigins: any[] = []
  companyTypes: any[] = []
  sectors: any[] = []
  divisions: any[] = []

  // Checker
  isReceipt = false

  constructor(
    private authService: AuthService,
    private cartService: CartsService,
    private productService: ProductsService,
    private transactionService: TransactionsService,
    private userService: UsersService,
    private activatedRoute: ActivatedRoute,
    private fb: FormBuilder,
    private fileService: LocalFilesService,
    private loadingBar: LoadingBarService,
    private modalService: BsModalService,
    private router: Router,
    private spinner: NgxSpinnerService,
    private serviceService: ServicesService,
    private cd: ChangeDetectorRef
  ) {
    this.activatedRoute.queryParams.subscribe(
      (path: any) => {
        // console.log(path['tab'])
        this.tabChecker(path['tab'])
      }
    )
    this.getUser()
  }

  ngOnInit(): void {
    this.getData()
    this.getMapping()
    this.initForm()
  }


  // SB start

  getUser() {
    this.user = this.userService.currentUser
    // console.log(this.user)
  }

  getData() {
    this.loadingBar.useRef('http').start()
    this.transactionService.getLatest().subscribe(
      () => {
        this.loadingBar.useRef('http').complete()
        this.transactions = this.transactionService.transactionLatest
        this.tableRows = this.transactions
        this.tableRows.forEach(
          (item) => {
            item.payment_gateway_update_date = moment(item.payment_gateway_update_date).format('DD/MM/YYYY hh:mm:ss')
          }
        )

        let carts = []

        for (let transaction of this.transactionService.transactionLatest) {
          carts.push(transaction.cart)
        }

        let orders = []
  // Aduh
        for (let cart of carts) {
          let cart_modified_date = cart['created_date']
          for (let cart_item of cart['cart_item']) {
            if (cart_item['product']) {
              cart_item['created_date'] = cart_modified_date
              console.log(cart_item)
              orders.push(cart_item)
            } 
          }
        }
      
        this.orders = orders;
        // console.log(this.orders)
        this.tableOrderRows = this.orders
        this.tableOrderRows.forEach(
          (item) => {
            item.created_date = moment(item.created_date).format('DD/MM/YYYY hh:mm:ss')
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

        this.tableOrderTemp = this.tableOrderRows.map((prop, key) => {
          return {
            ...prop,
            id_index: key+1
          }
        })
        // console.log(this.tableOrderTemp)        
      }
    )
  }

  getMapping() {
    this.fileService.get('form-types.json').subscribe(
      (res) => {
        this.formTypes = res
        // console.log(this.formTypes)
      }
    )
    this.fileService.get('company-status.json').subscribe(
      (res) => {
        this.companyStatus = res
        // console.log(this.companyStatus)
      }
    )

    this.fileService.get('state-codes.json').subscribe(
      (res) => {
        this.stateCodes = res
        // console.log(this.stateCodes)
      }
    )
    
    this.fileService.get('company-origins.json').subscribe(
      (res) => {
        this.companyOrigins = res
        // console.log(this.companyOrigins)
      }
    )

    this.fileService.get('company-types.json').subscribe(
      (res) => {
        this.companyTypes = res
        // console.log(this.companyTypes)
      }
    )
  }

  initForm() {
    this.addressForm = this.fb.group({
      address1: new FormControl({value: 'C-3A-12', disabled: true}, Validators.required),
      address2: new FormControl({value: 'Metropolitan Square (Center Wing)', disabled: true}, Validators.required),
      address3: new FormControl({value: 'Jalan PJU 8/1', disabled: true}, Validators.required),
      postcode: new FormControl({value: '42800', disabled: true}, Validators.required),
      city: new FormControl({value: 'Petaling Jaya', disabled: true}, Validators.required),
      state: new FormControl({value: 'Selangor', disabled: true}, Validators.required),
      country: new FormControl({value: 'Malaysia', disabled: true}, Validators.required)
    })
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


  filterTableTransactions($event, type) {
    let val = $event.target.value.toLowerCase();
    if (type == 'invoice') {
      // console.log(val)
      this.tableTemp = this.tableRows.filter(function(d, key) {
        // console.log(d.invoice_no.toLowerCase().indexOf(val) !== -1 || !val)
        return d.invoice_no.toLowerCase().indexOf(val) !== -1 || !val;
      });
    }
    else if (type == 'date') {
      // console.log(val)
      let newVal = val
      if (val) {
        newVal = moment(val, 'YYYY-MM-DD').format('DD/MM/YYYY')
      }
      this.tableTemp = this.tableRows.filter((d: any, key) => {
        // console.log(d)
        return d.payment_gateway_update_date.toLowerCase().indexOf(newVal) !== -1 || !newVal;
      });
    }
  }

  onSelect({ selected }) {
    this.tableSelected.splice(0, this.tableSelected.length);
    this.tableSelected.push(...selected);
  }

  onActivate(event) {
    this.tableActiveRow = event.row;
  }

  tabChecker(path: string) {
    if (path == 'account') {
      this.accountTabActive = true;
      this.transactionTabActive = false;
      this.orderTabActive = false;      
    } 
    else if (path == 'transaction') {
      this.accountTabActive = false;
      this.transactionTabActive = true;
      this.orderTabActive = false;     
    }
    else if (path == 'order') {
      this.accountTabActive = false;
      this.transactionTabActive = false;
      this.orderTabActive = true;     
    }
    else  {
      this.accountTabActive = true;
      this.transactionTabActive = false;
      this.orderTabActive = false;    
    }
  }
  
  initRequest(selected) {
    let lang
    if (selected['product']) {
      if (selected['product']['language'] == 'MS') {
        lang = 'ms'
      }
      else {
        lang = 'en'
      }
    }
    if (selected['cart_item_type'] == 'PS') { // Product Search Criteria
      let body = selected['product_search_criteria']
      body['name'] = 'excel'
      body['package'] = 'A'
      body['bizCode'] = selected['product_search_criteria']['business_code']
      body['compLocation'] = selected['product_search_criteria']['company_location']
      body['compOrigin'] = selected['product_search_criteria']['company_origin']
      body['compStatus'] = selected['product_search_criteria']['company_status']
      body['compType'] = selected['product_search_criteria']['company_type']
      body['incorpDtFrom'] = selected['product_search_criteria']['incorp_date_from']
      body['incorpDtTo'] = selected['product_search_criteria']['incorp_date_to']
      this.downloadRequestList(body, 'custom-data')
    }
    else if (
      selected['cart_item_type'] == 'PR' &&
      !selected['image_version_id'] &&
      !selected['year1']
    ) { // Product (Normal)
      // console.log('selected', selected)
      let body = {
        'name': selected['product']['slug'],
        'registration_no': Number(selected.entity.company_number),
        // 'entity_type': 'ROC', 
        'ctc': selected['product']['ctc'],
        'language': lang
      }
      let aa_ = selected['product']['slug'].split('_')[0]
      if (aa_ == 'business') {
        body['entity_type'] = 'ROB'
        body['registration_no'] = selected.entity.registration_number
      } else {
        body['entity_type'] = 'ROC'
        body['registration_no'] = Number(selected.entity.company_number)
      }
      this.downloadRequestProduct(body)
    }
    else if (
      selected['cart_item_type'] == 'PR' &&
      selected['image_version_id'] &&
      !selected['year1']
    ) { // Product (Image)
      // console.log('selected', selected)
      let body = {
        'name': 'image',
        'registration_no': Number(selected.entity.company_number),
        'entity_type': 'ROC',
        'version_id': selected.image_version_id
      }
      this.downloadRequestImg(body)
    }
    else if (
      selected['cart_item_type'] == 'PR' &&
      !selected['image_version_id'] &&
      selected['year1']
    ) { // Product (Financial Historical)
      // console.log('selected', selected)
      let body = {
        'name': selected['product']['slug'],
        'registration_no': Number(selected.entity.company_number),
        // 'entity_type': 'ROC', 
        'ctc': selected['product']['ctc'],
        'language': lang,
        'entity_type': 'ROC',
        'year1': selected['year1'],
        'year2': selected['year2']
      }
      this.downloadRequestProduct(body)
    }
    else if (selected['cart_item_type'] == 'SE') { // Service

    }
    else if (selected['cart_item_type'] == 'QU') { // Quota

    }
  }

  downloadRequestImg(body) {
    this.spinner.show()
    this.productService.generateImage(body).subscribe(
      (res: any) => {
        this.spinner.hide()
        let url = 'data:image/tiff;base64,' + res
        window.open(url, '_blank');
        // console.log(res)
      },
      () => {
        this.spinner.hide()
      }
    )
  }

  downloadRequestProduct(body) {
    this.spinner.show()
    this.productService.generateDocument(body).subscribe(
      (res: any) => {
        this.spinner.hide()
        let url = res.pdflink
        window.open(url, '_blank');
        // window.location.href =url;
      },
      () => {
        this.spinner.hide()
      }
    )
  }

  downloadRequestList(body, type) {
    this.spinner.show()
    // console.log(body, type)
    this.productService.generateList(body).subscribe(
      (res: any) => {
        this.spinner.hide()
        if (type == 'custom-data') {
          // console.log(res)
          const blob = new Blob([res], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
          // const url = window.URL.createObjectURL(blob);
          // console.log(url)
          // window.open(url, '_blank');
          let link = document.createElement('a');
          link.href = window.URL.createObjectURL(blob);
          let fileName = 'Customized-Data.xlsx';
          link.download = fileName;
          link.click();
        }
        else if (type == 'document-form') {
          let url = 'data:image/tiff;base64,' + res
          window.open(url, '_blank');
        }
        else if (type == 'SE') {
          let url = res.pdflink
          window.open(url, '_blank');
        }
        else if (type == 'QU') {
          let url = res.pdflink
          window.open(url, '_blank');
        }
      },
      () => {}
    )
  }

  navigatePage(path: string) {
    return this.router.navigate([path]);
  }

  downloadReceipt(row) {
    if (row.receipt) {
      window.open(
        row.receipt,
        '_blank'
      )
    }
  }

  successAlert() {
    swal
      .fire({
        title: 'Success',
        text: 'Request successfully submitted',
        icon: 'success',
        // showCancelButton: true,
        buttonsStyling: false,
        confirmButtonText: 'Close',
        customClass: {
          cancelButton: 'btn btn-outline-success',
          confirmButton: 'btn btn-success ',
        },
      })
      .then((result) => {
      });
  }

  failedAlert() {
    swal
      .fire({
        title: 'Failed',
        text: 'Request failed to submit',
        icon: 'warning',
        // showCancelButton: true,
        buttonsStyling: false,
        confirmButtonText: 'Close',
        customClass: {
          cancelButton: 'btn btn-outline-warning',
          confirmButton: 'btn btn-warning ',
        },
      })
      .then((result) => {
      });
  }

  
  openModal(modalRef: TemplateRef<any>, row) {
    let tempIncorpFrom = moment(row['product_search_criteria']['incorp_date_from']).format('DD/MM/YYYY')
    let tempIncorpTo = moment(row['product_search_criteria']['incorp_date_to']).format('DD/MM/YYYY')
    let tempCompanyStatus
    let tempCompanyType
    let tempBusinessCode = row['product_search_criteria']['business_code']
    let tempCompanyOrigin
    let tempCompanyLocation

    // console.log(row['product_search_criteria'])

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
          // console.log(tempCompanyOrigin)
        }
      }
    )

    this.stateCodes.forEach(
      (state) => {
        if (state.code == row['product_search_criteria']['company_location']) {
          tempCompanyLocation = state.desc
          // console.log('found')
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
    // console.log(this.selectedCriteria)
    this.modal = this.modalService.show(modalRef, this.modalConfig);
  }

  closeModal() {
    this.modal.hide();
    delete this.selectedCriteria
  }
  
}
