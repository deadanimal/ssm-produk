import { Component, ElementRef, OnInit, TemplateRef, ViewChild } from '@angular/core';
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
import jsPDF from 'jspdf';
import { LocalFilesService } from 'src/app/shared/services/local-files/local-files.service';

import * as moment from 'moment';
import { BusinessCode } from 'src/app/shared/models/business-code.model';
import { CompanyStatus } from 'src/app/shared/models/company-status.model';
import { StateCode } from 'src/app/shared/models/state-code.model';

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

  // Modal
  modal: BsModalRef;
  modalTransactionDetail: BsModalRef;
  modalConfig = {
    keyboard: true,
    // class: 'modal-dialog-centered',
  };

  showpiv = false;
  showdoc = true;

  // array
  user_obj: any;

  // get data from auth service
  egovPackage: string;
  userType: String;
  userID: String;
  userEmail: String;
  userFullname: string;
  userNric: String;
  UserHOD: string;
  showIcondiv = false;
  userdetails: any;
  userPackage: string;
  userQuota: any;
  formStatus = true;
  showSubmitButton = false;
  showRequestQuotaButton = false;
  showRequestInvestigationList = true;
  showRequestInvestigationAdd = false;
  InvestigationList: any;
  listNp = '0';
  runningNo = '2020061001';
  id = 'b4d3fc09-2523-40f9-81bf-333960bbd611';
  intervalLogin: any;
  infodata: any;

  /// form
  requestInvestigationDocForm: FormGroup;
  updateUserInfoForm: FormGroup;
  addressForm: FormGroup

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

  // Data
  transactions: any[] = []
  orders: any[] = []

  accountTabActive: boolean = false
  transactionTabActive: boolean = false
  orderTabActive: boolean = false

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

  selectedCriteria: any
  // Checker
  isReceipt = false

  //
  @ViewChild('receipt') receipt: ElementRef;

  constructor(
    private authService: AuthService,
    private cartService: CartsService,
    private productService: ProductsService,
    private transactionService: TransactionsService,
    private fileService: LocalFilesService,
    private userService: UsersService,
    private activatedRoute: ActivatedRoute,
    private fb: FormBuilder,
    private modalService: BsModalService,
    private router: Router,
    private spinner: NgxSpinnerService,
  ) {
    this.activatedRoute.queryParams.subscribe(
      (p: any) => {
        console.log(p['tab'])
        this.tabChecker(p['tab'])
      }
    )
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
    // this.user_obj = this.authService.decodedToken();

    this.requestInvestigationDocForm = this.fb.group({
      id: new FormControl(''),
      reference_letter_number: new FormControl(''),
      ip_no: new FormControl(''),
      court_case_number: new FormControl(''),
      offense: new FormControl('qwee'),
      officer: new FormControl(this.userID),
    });

    this.updateUserInfoForm = this.fb.group({
      id: new FormControl(''),
      full_name: new FormControl(''),
      email: new FormControl(''),
      egov_package: new FormControl(''),
      nric_number: new FormControl(''),
      phone_number: new FormControl('')
    });

    this.addressForm = this.fb.group({
      address1: new FormControl('Address 1', Validators.required),
      address2: new FormControl('Address 2', Validators.required),
      address3: new FormControl('Address 3', Validators.required),
      postcode: new FormControl('41200', Validators.required),
      city: new FormControl('Petaling Jaya', Validators.required),
      state: new FormControl('Selangor', Validators.required),
      country: new FormControl('Malaysia', Validators.required)
    })

    this.getData();
  }


  // SB start

  getData() {
    this.transactionService.getLatest().subscribe(
      () => {
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

        for (let cart of carts) {
          for (let huhu of cart['cart_item']) {
            orders.push(huhu)      
          }
        }
      
        this.orders = orders;
        console.log(this.orders)
        this.tableOrderRows = this.orders
        this.tableOrderRows.forEach(
          (item) => {
            item.created_date = moment(item.created_date).format('DD/MM/YYYY hh:mm:ss')
          }
        )        
      },
      () => {},
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
        console.log(this.tableOrderTemp)        
      }
    )
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

  downloadOutput(row) { 
    if (row.product.id == 'abd86a30-3d41-4c68-94e3-280b0362e288') {
      let body = {
        'name': 'company_profile',
        'language': 'ms',
        'ctc': 'False',
        'registration_no': row.entity.company_number,
        'entity_type': 'ROC'
      }
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
    else if (row.product.id == '74a97598-c817-4c06-971f-3197c4c12165') {
      let body = {
        'name': 'company_profile',
        'language': 'en',
        'ctc': 'False',
        'registration_no': row.entity.company_number,
        'entity_type': 'ROC'
      }
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
    else if (row.product.id == 'f636d9f7-29f6-4d85-bf21-417c7496193d') {
      let body = {
        'name': 'company_profile',
        'language': 'ms',
        'ctc': 'True',
        'registration_no': row.entity.company_number,
        'entity_type': 'ROC'
      }
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
    else if (row.product.id == '5b381e56-dc2f-4476-986e-ecb247d48499') {
      let body = {
        'name': 'company_profile',
        'language': 'en',
        'ctc': 'True',
        'registration_no': row.entity.company_number,
        'entity_type': 'ROC'
      }
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
    else if (row.product.id == '1eca2caf-a8c7-4327-a37f-394f4dd9c78e') {
      let body = {
        'name': 'business_profile',
        'language': 'ms',
        'ctc': 'False',
        'registration_no': row.entity.registration_number,
        'entity_type': 'ROB'
      }
      this.spinner.show()
      this.productService.generateDocument(body).subscribe(
        (res: any) => {
          this.spinner.hide()
          let url = res.pdflink
          window.open(url, '_blank');
          // console.log(res)
        },
        () => {
          this.spinner.hide()
        }
      )
    }
    else if (row.product.id == '539aaa55-a0f6-4af4-b476-acc03bae8f62') {
      let body = {
        'name': 'business_profile',
        'language': 'en',
        'ctc': 'False',
        'registration_no': row.entity.registration_number,
        'entity_type': 'ROB'
      }
      this.spinner.show()
      this.productService.generateDocument(body).subscribe(
        (res: any) => {
          this.spinner.hide()
          let url = res.pdflink
          window.open(url, '_blank');
          // console.log(res)
        },
        () => {
          this.spinner.hide()
        }
      )
    }
    else if (row.product.id == 'f1dc2664-f55d-4012-a4fe-556da76eb32c') {
      let body = {
        'name': 'business_profile',
        'language': 'ms',
        'ctc': 'True',
        'registration_no': row.entity.registration_number,
        'entity_type': 'ROB'
      }
      this.spinner.show()
      this.productService.generateDocument(body).subscribe(
        (res: any) => {
          this.spinner.hide()
          let url = res.pdflink
          window.open(url, '_blank');
          // console.log(res)
        },
        () => {
          this.spinner.hide()
        }
      )
    }
    else if (row.product.id == '8df319e5-0bed-435d-81d4-03856870195d') {
      let body = {
        'name': 'business_profile',
        'language': 'en',
        'ctc': 'True',
        'registration_no': row.entity.registration_number,
        'entity_type': 'ROB'
      }
      this.spinner.show()
      this.productService.generateDocument(body).subscribe(
        (res: any) => {
          this.spinner.hide()
          let url = res.pdflink
          window.open(url, '_blank');
          // console.log(res)
        },
        () => {
          this.spinner.hide()
        }
      )
    }
    else if (row.product.id == '63638688-830d-4750-bd17-5157f8dc4a96') {
      let body = {
        'name': 'private_incorp_cert',
        'language': 'en',
        'ctc': 'True',
        'registration_no': row.entity.company_number,
        'entity_type': 'ROC'
      }
      this.spinner.show()
      this.productService.generateDocument(body).subscribe(
        (res: any) => {
          this.spinner.hide()
          let url = res.pdflink
          window.open(url, '_blank');
          // console.log(res)
        },
        () => {
          this.spinner.hide()
        }
      )
    }
    else if (row.product.id == '4b922d05-a626-48ac-a8d2-8f450bf8697e') {
      let body = {
        'name': 'private_incorp_cert',
        'language': 'en',
        'ctc': 'False',
        'registration_no': row.entity.company_number,
        'entity_type': 'ROC'
      }
      this.spinner.show()
      this.productService.generateDocument(body).subscribe(
        (res: any) => {
          this.spinner.hide()
          let url = res.pdflink
          window.open(url, '_blank');
          // console.log(res)
        },
        () => {
          this.spinner.hide()
        }
      )
    }
    else if (row.product.id == '436f3d72-dc34-45e7-8775-21b258411db1') {
      let body = {
        'name': 'private_incorp_cert',
        'language': 'ms',
        'ctc': 'False',
        'registration_no': row.entity.company_number,
        'entity_type': 'ROC'
      }
      this.spinner.show()
      this.productService.generateDocument(body).subscribe(
        (res: any) => {
          this.spinner.hide()
          let url = res.pdflink
          window.open(url, '_blank');
          // console.log(res)
        },
        () => {
          this.spinner.hide()
        }
      )
    }
    else if (row.product.id == '5561f5ec-6ca0-492d-827b-2b36114c4606') {
      let body = {
        'name': 'private_incorp_cert',
        'language': 'ms',
        'ctc': 'True',
        'registration_no': row.entity.company_number,
        'entity_type': 'ROC'
      }
      this.spinner.show()
      this.productService.generateDocument(body).subscribe(
        (res: any) => {
          this.spinner.hide()
          let url = res.pdflink
          window.open(url, '_blank');
          // console.log(res)
        },
        () => {
          this.spinner.hide()
        }
      )
    }
    else if (row.product.id == 'aeb73efa-b89e-4e15-b1a7-3ba2409f7ec1') {
      let body = {
        'name': 'financial_history',
        'language': 'ms',
        'ctc': 'False',
        'registration_no': row.entity.company_number,
        'entity_type': 'ROC',
        'year1': 2016,
	      'year2': 2017
      }
      this.spinner.show()
      this.productService.generateDocument(body).subscribe(
        (res: any) => {
          this.spinner.hide()
          let url = res.pdflink
          window.open(url, '_blank');
          // console.log(res)
        },
        () => {
          this.spinner.hide()
        }
      )
    }
    else if (row.product.id == '6420ad7f-8639-451e-99c7-76a02ac2763c') {
      let body = {
        'name': 'financial_history',
        'language': 'en',
        'ctc': 'False',
        'registration_no': row.entity.company_number,
        'entity_type': 'ROC',
        'year1': 2016,
	      'year2': 2017
      }
      this.spinner.show()
      this.productService.generateDocument(body).subscribe(
        (res: any) => {
          this.spinner.hide()
          let url = res.pdflink
          window.open(url, '_blank');
          // console.log(res)
        },
        () => {
          this.spinner.hide()
        }
      )
    }
    else if (
      row.product.id == '46efd15d-0cd4-41aa-a6d6-790d6aecbf0b' ||
      row.product.id == '04e740bb-6553-49fe-b3fb-dabc445fa89b'
    ) {
      let body = {
        'name': 'image',
        'registration_no': Number(row.entity.company_number),
        'entity_type': 'ROC',
        'version_id': row.image_version_id
      }
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
    else if (row.product_search_criteria) {
      let body = row.product_search_criteria
      body['name']='list'
      body['package']='A'

      this.spinner.show()
      this.productService.generateList(body).subscribe(
        (res: any) => {
          this.spinner.hide()
          let url = res.pdflink
          window.open(url, '_blank');
          // console.log(res)
        },
        () => {
          this.spinner.hide()
        }
      )
    }
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
    else {
      this.accountTabActive = true
      this.transactionTabActive = false;
      this.orderTabActive = false;      
    }
  }

  navigatePage(path: string) {
    return this.router.navigate([path]);
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
      selected['image_version_id'] == 'NA'
    ) { // Product (Normal)
      console.log('selected', selected)
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
      selected['image_version_id'] != 'NA'
    ) { // Product (Image)
      console.log('selected', selected)
      let body = {
        'name': 'image',
        'registration_no': Number(selected.entity.company_number),
        'entity_type': 'ROC',
        'version_id': selected.image_version_id
      }
      this.downloadRequestImg(body)
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
    console.log(body, type)
    this.productService.generateList(body).subscribe(
      (res: any) => {
        this.spinner.hide()
        if (type == 'custom-data') {
          console.log(res)
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
      (err) => {
        // console.log('tak masuk')
        // console.log(err)
        // this.spinner.hide()

        // if (type == 'custom-data') {
        //   const blob = new Blob([err['error']['text']], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
        //   const url = window.URL.createObjectURL(blob);
        //   console.log(url)
        //   window.open(url, '_blank');
        // }
      }
    )
  }

  downloadRecipt(row) {
    this.fileService.get('form-types.json').subscribe(
      (res) => {
        this.formTypes = res
        // console.log(this.formTypes)
      }
    )

    this.transaction = row
    this.cartService.getOne(this.transaction['cart']).subscribe(
      (res) => {
        // console.log('res ', res)
        this.cart = res
        this.cart['created_date'] = moment(this.cart['created_date']).format('DD/MM/YYYY hh:mm:ss')
      },
      () => {},
      () => {
        let cnt = 0
        this.cart['cart_item'].forEach(
          (itemz) => {
            cnt++
            itemz['index'] = cnt
            itemz.created_date = moment(itemz['created_date']).format('DD/MM/YYYY hh:mm:ss')
            if (itemz['image_form_type']) {
              this.formTypes.forEach(
                (code) => {
                  if (code.code == itemz['image_form_type']) {
                    itemz['image_form_type'] = code.desc_en
                  } 
                }
              )
            }
          }
        )
        // console.log('item: ', this.cart)
        // console.log('cart_item: ', this.cart['cart_item'])
        this.isReceipt = true
        // console.log('asdas', this.ca
        this.items = this.cart['cart_item']
        // console.log(this.cart['cart_item'])
      }
    )

    const doc = new jsPDF();
    const specialElementHandlers = {
      '#editor': function (element, renderer) {
        return true;
      }
    };

    const content = this.receipt.nativeElement;

    doc.fromHTML(content.innerHTML, 15, 15, {
      'width': 190,
      'elementHandlers': specialElementHandlers
    });

    doc.save('receipt' + '.pdf');
  }



  // SB end






  successAlert(task) {
    swal
      .fire({
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
      })
      .then((result) => {
        // console.log('confirm');
        this.closeModal();
        window.location.reload();
        // this.navigatePage('/profile');
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

  openTransactionDetail(modalRef: TemplateRef<any>) {
    this.modalTransactionDetail = this.modalService.show(
      modalRef,
      this.modalConfig
    );
  }

  closeTransactionDetail() {
    this.modalTransactionDetail.hide();
  }

  downloadReceipt() {}

  successDownload() {
    swal
      .fire({
        title: 'Success',
        text: 'Successfully downloaded',
        icon: 'success',
        buttonsStyling: false,
        confirmButtonText: 'Ok',
        customClass: {
          confirmButton: 'btn btn-outline-success ',
        },
      })
      .then((result) => {
        if (result.value) {
          window.open(
            'https://pipeline-project.sgp1.digitaloceanspaces.com/ssm/product/1599179232-96afbd34518b47af99a1fe4f488185d8.pdf',
            '_blank'
          );
        }
      });
    console.log('confirm');
  }

  failedDownload() {
    swal.fire({
      title: 'Receipt failed to generate',
      text: 'Please contact SSM Enquiry',
      icon: 'warning',
      showCancelButton: true,
      buttonsStyling: false,
      confirmButtonText: 'Confirm',
      customClass: {
        cancelButton: 'btn btn-outline-primary ',
        confirmButton: 'btn btn-primary ',
      },
    });
    console.log('confirm');
  }

  
}
