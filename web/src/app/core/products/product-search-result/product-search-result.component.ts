import { Component, OnInit, TemplateRef } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { Router } from '@angular/router';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

import { CartsService } from 'src/app/shared/services/carts/carts.service';
import { ProductsService } from 'src/app/shared/services/products/products.service';
import { Product } from 'src/app/shared/services/products/products.model';
import { LocalFilesService } from 'src/app/shared/services/local-files/local-files.service';
import { LoadingBarService } from '@ngx-loading-bar/core';
import { UsersService } from 'src/app/shared/services/users/users.service';
import { CartItemExtended } from 'src/app/shared/services/carts/carts.model';
import { CookieService } from 'src/app/shared/handler/cookie/cookie.service';
import { User } from 'src/app/shared/services/users/users.model';

import * as moment from 'moment';
import { forkJoin } from 'rxjs';
import { ComponentsModule } from 'src/app/components/components.module';

export enum SelectionType {
  single = 'single',
  multi = 'multi',
  multiClick = 'multiClick',
  cell = 'cell',
  checkbox = 'checkbox',
}

@Component({
  selector: 'app-product-search-result',
  templateUrl: './product-search-result.component.html',
  styleUrls: ['./product-search-result.component.scss']
})
export class ProductSearchResultComponent implements OnInit {

  // Data
  entity: any
  products: Product[] = []
  lastDigit = ''
  registration_no: any
  formTypes: any[] = []
  imageList: any[] = []
  availabilityList: any
  branches: any[] = null
  isEmpty: boolean = true

  // Checker
  isProceed: boolean = false
  isAgres: boolean = false
  finComparisonYear = 2

  // Options
  ctcOpts = [
    { name: 'non-CTC', value: 'non-ctc' },
    { name: 'CTC', value: 'ctc' },
    { name: 'Both', value: 'both' },
  ]

  // Modal
  modalSample: BsModalRef
  modalConfig = {
    keyboard: true,
    class: 'modal-dialog-centered modal-md',
  };

  // Form
  searchForm: FormGroup
  cartForm: FormGroup

  companyProfileForm: FormGroup
  companyChargesForm: FormGroup
  acgsForm: FormGroup
  certIncorpForm: FormGroup
  certChangeNameForm: FormGroup
  certConversionForm: FormGroup
  finComparison2Form: FormGroup
  finComparison3Form: FormGroup
  finComparison5Form: FormGroup
  finComparison10Form: FormGroup
  finHistoricalForm: FormGroup
  partiDirOfficerForm: FormGroup
  partiShareCapForm: FormGroup
  partiShareholderForm: FormGroup
  partiCompSecForm: FormGroup
  partiRegAddrForm: FormGroup
  businessProfileForm: FormGroup
  businessCertForm: FormGroup
  businessTerminateForm: FormGroup
  auditProfileForm: FormGroup
  documentForm: FormGroup

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
    emptyMessage: 'Empty search',

    // Footer total message
    totalMessage: '',

    // Footer selected message
    selectedMessage: 'selected'
  }

  // Data
  currentUser: User
  cartItems: CartItemExtended[] = []
  isAuthenticated = false
  dataRefresher: any;

  // Table Branch
  tableBranchEntries: number = 10
  tableBranchSelected: any[] = []
  tableBranchTemp = []
  tableBranchActiveRow: any
  tableBranchRows: any[] = []
  tableBranchMessages = {
    // Message to show when array is presented
    // but contains no values
    emptyMessage: 'Empty search',

    // Footer total message
    totalMessage: '',

    // Footer selected message
    selectedMessage: 'selected'
  }

  constructor(
    private toastr: ToastrService,
    private productService: ProductsService,
    private userService: UsersService,
    private cookieService: CookieService,
    private fileService: LocalFilesService,
    private modalService: BsModalService,
    private router: Router,
    private fb: FormBuilder,
    private cartService: CartsService,
    private loadingBar: LoadingBarService
  ) {

    this.router.routeReuseStrategy.shouldReuseRoute = function () {
      return false
    }
    this.checkUser()
    // this.refreshData();

    // console.log('chec', )
    let checkerValid = this.router.getCurrentNavigation()
    if (checkerValid == null || checkerValid == undefined) {
      this.navigatePage('/products/search')
    }
    else {
      this.entity = this.router.getCurrentNavigation().extras['entity'] as any
      this.availabilityList = this.router.getCurrentNavigation().extras['availability'] as any

      if (!this.entity) {
        this.navigatePage('/products/search')
      }
      else {
        this.getLastDigit()
        this.getData()
      }
    }
  }

  ngOnInit(): void {
    // console.log(this.entity)
    this.initForm()
    this.checkUser();
  }

  refreshData() {
    this.dataRefresher =
      setInterval(() => {
        console.log('refresh data')
        this.checkUser2();
        //Passing the false flag would prevent page reset to 1 and hinder user interaction
      }, 3000);
  }

  getData() {
    let imageBody = {
      'name': 'list',
      'registration_no': this.registration_no,
      'entity_type': 'ROC'
    }

    let branchBody = {
      'registration_no': this.entity.registration_number
    }

    // let availabilityBody = {
    //   'registration_no': this.registration_no,
    //   'entity_type': 'ROC'
    // }

    this.loadingBar.useRef('http').start()

    this.productService.getAll().subscribe(
      (res) => {
        this.loadingBar.useRef('http').complete()
        this.products = res
      },
      () => {
        this.loadingBar.useRef('http').complete()
      },
      () => {

      }
    )

    this.productService.generateImage(imageBody).subscribe(
      (res) => {
        this.loadingBar.useRef('http').complete()
        this.imageList = res
      },
      () => {
        this.loadingBar.useRef('http').complete()
      },
      () => {
        this.imageList.sort((a, b) => new Date(b.dateFiler).getTime() - new Date(a.dateFiler).getTime())
        this.imageList.forEach(
          (img) => {
            this.formTypes.forEach(
              (form) => {
                if (img.formType == form.code) {
                  img['formName'] = form.desc_en
                  img['isCtc'] = false
                  img['price'] = 1000
                  img['humanDate'] = moment(img.dateFiler).format('DD-MM-YYYY')
                  this.updateTable()
                }
              }
            )
          }
        )
      }
    )
    //   // Aduh
    if (this.entity['type_of_entity'] == 'BS') {
      this.productService.getBranches(branchBody).subscribe(
        (res) => {
          this.branches = res
          console.log(res)
        },
        () => {
          this.branches = null
        },
        () => {
          this.updateTableBranch()
        }
      )
    }

    this.fileService.get('form-types.json').subscribe(
      (res) => {
        this.formTypes = res
        // console.log(this.formTypes)
      }
    )

  }

  updateTableBranch() {
    this.branches.forEach(
      (branch) => {
        if (branch['addressId'] == '0') {
          branch['branchType'] = 'Main'
          branch['language'] = 'EN'
          branch['price'] = 1000
        }
        else {
          branch['branchType'] = 'Branch'
          branch['language'] = 'EN'
          branch['price'] = 1000
        }
      }
    )

    this.tableBranchRows = this.branches
    this.tableBranchTemp = this.tableBranchRows.map((prop, key) => {
      return {
        ...prop,
        id_index: key + 1
      }
    })

  }

  initForm() {
    this.cartForm = this.fb.group({
      item_type: new FormControl('product'),
      entity: new FormControl(this.entity.id, Validators.compose([
        Validators.required
      ])),
      product: new FormControl('', Validators.compose([
        Validators.required
      ])),
      year1: new FormControl(''),
      year2: new FormControl(''),
      image_form_type: new FormControl(false),
      image_version_id: new FormControl(false)
    })

    this.companyProfileForm = this.fb.group({ // Company Profile
      slug: new FormControl('company_profile'),
      language: new FormControl('MS'),
      isCtc: new FormControl(false),
      fee: new FormControl(1000)
    })

    this.companyChargesForm = this.fb.group({
      slug: new FormControl('company_charges'), // Company Charges
      language: new FormControl('MS'),
      isCtc: new FormControl(false),
      fee: new FormControl(2000)
    })

    this.acgsForm = this.fb.group({ // Attestation of Company Good Standing (ACGS)
      slug: new FormControl('acgs'),
      language: new FormControl('MS'),
      isCtc: new FormControl(false),
      fee: new FormControl(10000)
    })

    this.certIncorpForm = this.fb.group({
      slug: new FormControl('certificate_of_incorporation_registration'), // Certificate of Incorporation / Registration
      language: new FormControl('MS'),
      isCtc: new FormControl(false),
      fee: new FormControl(2000)
    })

    this.certChangeNameForm = this.fb.group({
      slug: new FormControl('certificate_of_change_of_name'), // Certificate of Conversion
      language: new FormControl('MS'),
      isCtc: new FormControl(false),
      fee: new FormControl(2000)
    })

    this.certConversionForm = this.fb.group({
      slug: new FormControl('certificate_of_conversion'), // Certificate of Conversion
      language: new FormControl('MS'),
      isCtc: new FormControl(false),
      fee: new FormControl(2000)
    })

    this.finHistoricalForm = this.fb.group({
      slug: new FormControl('financial_historical'), // Financial Historical
      language: new FormControl('MS'),
      isCtc: new FormControl(false),
      fee: new FormControl(2000),
      year1: new FormControl('2020'),
      year2: new FormControl('2019')
    })

    this.finComparison2Form = this.fb.group({
      slug: new FormControl('financial_comparison_2'), // Financial Comparison 2
      language: new FormControl('EN'),
      isCtc: new FormControl(false),
      fee: new FormControl(2000)
    })

    this.finComparison3Form = this.fb.group({
      slug: new FormControl('financial_comparison_3'), // Financial Comparison 3
      language: new FormControl('EN'),
      isCtc: new FormControl(false),
      fee: new FormControl(3000)
    })

    this.finComparison5Form = this.fb.group({
      slug: new FormControl('financial_comparison_5'), // Financial Comparison 5
      language: new FormControl('EN'),
      isCtc: new FormControl(false),
      fee: new FormControl(5000)
    })

    this.finComparison10Form = this.fb.group({
      slug: new FormControl('financial_comparison_10'), // Financial Comparison 10
      language: new FormControl('EN'),
      isCtc: new FormControl(false),
      fee: new FormControl(10000)
    })

    this.partiDirOfficerForm = this.fb.group({
      slug: new FormControl('particulars_of_directors_officers'), // Particulars of Directors / Officers
      language: new FormControl('MS'),
      isCtc: new FormControl(false),
      fee: new FormControl(2000)
    })

    this.partiShareCapForm = this.fb.group({
      slug: new FormControl('particulars_of_share_capital'), // Particulars of Share Capital
      language: new FormControl('MS'),
      isCtc: new FormControl(false),
      fee: new FormControl(2000)
    })

    this.partiShareholderForm = this.fb.group({
      slug: new FormControl('particulars_of_shareholders'), // Particulars of Shareholders
      language: new FormControl('MS'),
      isCtc: new FormControl(false),
      fee: new FormControl(2000)
    })

    this.partiCompSecForm = this.fb.group({
      slug: new FormControl('particulars_of_company_secretary'), // Particulars of Company Secretary
      language: new FormControl('MS'),
      isCtc: new FormControl(false),
      fee: new FormControl(2000)
    })

    this.partiRegAddrForm = this.fb.group({
      slug: new FormControl('particulars_of_registered_address'), // Particulars of Registered Address
      language: new FormControl('MS'),
      isCtc: new FormControl(false),
      fee: new FormControl(2000)
    })

    this.businessProfileForm = this.fb.group({
      slug: new FormControl('business_profile'), // Business Profile
      language: new FormControl('MS'),
      isCtc: new FormControl(false),
      fee: new FormControl(1000)
    })

    this.businessCertForm = this.fb.group({
      slug: new FormControl('business_certificate'), // Business Certificate
      language: new FormControl('MS'),
      isCtc: new FormControl(false),
      fee: new FormControl(1000)
    })

    this.businessTerminateForm = this.fb.group({
      slug: new FormControl('business_termination_letter'), // Business Termination Letter (BTL)
      language: new FormControl('MS'),
      isCtc: new FormControl(false),
      fee: new FormControl(1000)
    })

    this.auditProfileForm = this.fb.group({
      slug: new FormControl('audit_firm_profile'), // Audit Firm Profile
      language: new FormControl('MS'),
      isCtc: new FormControl(false),
      fee: new FormControl(1000)
    })

    this.documentForm = this.fb.group({
      slug: new FormControl('document_form'), // Audit Firm Profile
      language: new FormControl('NA'),
      isCtc: new FormControl(false),
      fee: new FormControl(1000)
    })
  }

  updateTable() {
    this.tableRows = this.imageList
    this.tableTemp = this.tableRows.map((prop, key) => {
      return {
        ...prop,
        id_index: key + 1
      }
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

  onSelect({ selected }) {
    this.tableSelected.splice(0, this.tableSelected.length);
    this.tableSelected.push(...selected);
  }

  onActivate(event) {
    this.tableActiveRow = event.row;
  }

  getLastDigit() {
    if (this.entity.type_of_entity == 'CP') {
      this.lastDigit = this.entity.company_number.substr(this.entity.company_number.length - 1)
      this.registration_no = Number(this.entity.company_number)
    }
    else if (this.entity.type_of_entity == 'BS') {
      this.lastDigit = this.entity.registration_number.substr(this.entity.registration_number.length - 1)
      this.registration_no = Number(this.entity.registration_number)
    }
    else if (this.entity.type_of_entity == 'AD') {
      this.lastDigit = this.entity.audit_firm_number.substr(this.entity.audit_firm_number.length - 1)
      this.registration_no = Number(this.entity.audit_firm_number)
    }
  }

  proceed() {
    this.isProceed = true;
  }

  addCart(selected) {
    console.log('clicked = ', selected.value)
    console.log('this.products = ', this.products)
    let product_found = false
    let product_found_both = 0

    this.products.forEach(
      (product) => {
        if (selected.value['language'] == 'BT' && product_found_both != 2) {
          if (
            selected.value['slug'] == product['slug'] &&
            selected.value['isCtc'] == product['ctc'] &&
            product['language'] == 'MS' &&
            product_found_both != 2
          ) {
            this.cartForm.controls['product'].setValue(product['id'])
            product_found_both = product_found_both + 1
            this.addItem()
          }
          else if (
            selected.value['slug'] == product['slug'] &&
            selected.value['isCtc'] == product['ctc'] &&
            product['language'] == 'EN' &&
            product_found_both != 2
          ) {
            this.cartForm.controls['product'].setValue(product['id'])
            product_found_both = product_found_both + 1
            this.addItem()
          }
        }
        else {
          if (
            selected.value['slug'] == product['slug'] &&
            selected.value['isCtc'] == product['ctc'] &&
            selected.value['language'] == product['language'] &&
            !product_found
          ) {
            console.log('qqqqqqqqqqq')
            this.cartForm.controls['product'].setValue(product['id'])
            product_found = true
            this.addItem()
          }
        }
      }
    )
  }

  addCartFinHistorical() {
    this.cartForm.controls['year1'].setValue(this.finHistoricalForm.value['year1'])
    this.cartForm.controls['year2'].setValue(this.finHistoricalForm.value['year2'])
    console.log(this.cartForm.value)
    this.addCart(this.finHistoricalForm)
  }

  addCartFin() {
    if (this.finComparisonYear == 2) {
      this.addCart(this.finComparison2Form)
    }
    else if (this.finComparisonYear == 3) {
      this.addCart(this.finComparison3Form)
    }
    else if (this.finComparisonYear == 5) {
      this.addCart(this.finComparison5Form)
    }
    else if (this.finComparisonYear == 10) {
      this.addCart(this.finComparison10Form)
    }
  }

  addCartDocument(row) {
    this.cartForm.controls['image_form_type'].setValue(row.formType)
    this.cartForm.controls['image_version_id'].setValue(row.verId)
    this.documentForm.controls['isCtc'].setValue(row.isCtc)
    this.addCart(this.documentForm)

    console.log(this.cartForm.value['image_form_type'])
  }

  addItem() {
    let title = 'Success'
    let message = 'Item is added to the cart'
    this.loadingBar.useRef('http').start()

    let cartItemData
    let formdata

    cartItemData = this.cartItems
    formdata = this.cartForm.value

    console.log('formdata = ', formdata);
    console.log('formdata.product = ', formdata.product)
    console.log('formdata.entity = ', formdata.entity)
    console.log('cartItemData = ', cartItemData)
    console.log('length = ', cartItemData.length)

    let result = 'yes'

    if (cartItemData.length != 0) {
      cartItemData.forEach(function (loopVal) {

        console.log('condition = ', loopVal.entity.id, '==', formdata.entity, '&&', loopVal.product.id, '==', formdata.product)

        if (loopVal.entity.id == formdata.entity && loopVal.product.id == formdata.product) {
          // console.log('no')
          result = 'no'
        }
      });
    }

    console.log(result)

    if (result == 'yes') {
      cartItemData.length = cartItemData.length + 1
      console.log('yeayy')
      this.cartService.addItem(this.cartService.cartCurrent.id, formdata).subscribe(
        () => {
          this.loadingBar.useRef('http').complete()
          this.refreshCart()
        },
        () => {
          this.loadingBar.useRef('http').complete()
        },
        () => {
          this.toastr.success(message, title)
          this.cartForm.controls['year1'].setValue(null)
          this.cartForm.controls['year2'].setValue(null)
          this.productService.cart = true
        }
      )
    }
    this.refreshData()
  }

  refreshCart() {
    console.log('Refresh')
    this.cartService.getOne(this.cartService.cartCurrent.id).subscribe(
      () => { },
      () => { },
      () => { }
    )
  }

  checker(selected) {
    this.products.forEach(
      (product) => {
        if (selected.value['language'] == 'BT') {
          console.log(selected.value['slug'])
          console.log(product['slug'])
          if (
            selected.value['slug'] == product['slug'] &&
            selected.value['isCtc'] == product['ctc']
          ) {
            selected.controls['fee'].setValue(product['fee'] * 2)
          }
        }
        else {
          console.log(selected.value['slug'])
          console.log(product['slug'])
          if (
            selected.value['slug'] == product['slug'] &&
            selected.value['isCtc'] == product['ctc'] &&
            selected.value['language'] == product['language']
          ) {
            selected.controls['fee'].setValue(product['fee'])
          }
        }
      }
    )
  }

  checkUser() {
    let obtainedUserId = this.cookieService.getCookie('userId')

    if (obtainedUserId) {
      this.loadingBar.useRef('http').start()
      this.userService.getOne(obtainedUserId).subscribe(
        (res: any) => {
          this.loadingBar.useRef('http').complete()
          let title = 'Success'
          let message = 'Logging in...'
          this.currentUser = this.userService.currentUser
          this.isAuthenticated = true
          // this.toastr.success(message, title)
        },
        () => {
          this.loadingBar.useRef('http').complete()
        },
        () => {
          this.checkCart()
          this.cookieService.saveCookie('userId', this.currentUser.id)
        }
      )
    }
  }

  checkCart() {
    this.cartService.checkCart(this.userService.currentUser.id).subscribe(
      () => {
        this.cartService.cartCurrent = this.cartService.cart
        this.cartItems = this.cartService.cart.cart_item
        console.log('qweqweasdasd = ', this.cartItems)
      },
      () => { },
      () => {
        if (this.cartItems.length > 0) {
          this.isEmpty = false
        }
        else {
          this.isEmpty = true
        }
        this.cartItems.forEach(
          (item) => {
            if (item['image_form_type']) {
              this.formTypes.forEach(
                (code) => {
                  if (code.code == item['image_form_type']) {
                    item['image_form_type'] = code.desc_en
                  }
                }
              )
            }
          }
        )
      }
    )
  }

  checkUser2() {
    let obtainedUserId = this.cookieService.getCookie('userId')

    if (obtainedUserId) {
      // this.loadingBar.useRef('http').start()
      this.userService.getOne(obtainedUserId).subscribe(
        (res: any) => {
          // this.loadingBar.useRef('http').complete()
          // let title = 'Success'
          // let message = 'Logging in...'
          this.currentUser = this.userService.currentUser
          this.isAuthenticated = true
          // this.toastr.success(message, title)
        },
        () => {
          // this.loadingBar.useRef('http').complete()
        },
        () => {
          this.checkCart2()
          this.cookieService.saveCookie('userId', this.currentUser.id)
        }
      )
    }
  }

  checkCart2() {
    this.cartService.checkCart(this.userService.currentUser.id).subscribe(
      () => {
        this.cartService.cartCurrent = this.cartService.cart
        this.cartItems = this.cartService.cart.cart_item
        // console.log('qweqweasdasd = ', this.cartItems)
      },
      () => { },
      () => {
        if (this.cartItems.length > 0) {
          this.isEmpty = false
        }
        else {
          this.isEmpty = true
        }
        this.cartItems.forEach(
          (item) => {
            if (item['image_form_type']) {
              this.formTypes.forEach(
                (code) => {
                  if (code.code == item['image_form_type']) {
                    item['image_form_type'] = code.desc_en
                  }
                }
              )
            }
          }
        )
      }
    )
  }

  checkCtcImg(row) {
    if (row['isCtc']) {
      row['price'] = 2000
    }
    else {
      row['price'] = 1000
    }
  }

  checkerFin(selected) {
    if (selected == 2) {
      this.finComparisonYear = 2
    }
    else if (selected == 3) {
      this.finComparisonYear = 3
    }
    else if (selected == 5) {
      this.finComparisonYear = 5
    }
    else if (selected == 10) {
      this.finComparisonYear = 10
    }
  }

  openModalSample(modalRef: TemplateRef<any>) {
    this.modalSample = this.modalService.show(modalRef, this.modalConfig);
  }

  closeModalSample() {
    this.modalSample.hide();
  }

  navigatePage(path: string) {
    // console.log('Path: ', path)
    return this.router.navigate([path])
  }

}
