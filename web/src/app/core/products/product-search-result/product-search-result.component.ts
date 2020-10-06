import { Component, OnInit, TemplateRef } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { Router } from '@angular/router';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ProductCartsService } from 'src/app/shared/services/product-carts/product-carts.service';

import { CartsService } from 'src/app/shared/services/carts/carts.service';
import { ProductsService } from 'src/app/shared/services/products/products.service';
import { Product } from 'src/app/shared/services/products/products.model';
import { MocksService } from 'src/app/shared/services/mocks/mocks.service';
import { LoadingBarService } from '@ngx-loading-bar/core';

class Entity {
  name: string;
  registration_no: string;
}

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
  entity: any;
  products: Product[] = [];
  lastDigit = ''
  registration_no: any
  formTypes: any[] = []
  imageList: any[] = []

  // Checker
  isProceed: boolean = false;

  // Options
  ctcOpts = [
    { name: 'non-CTC', value: 'non-ctc' },
    { name: 'CTC', value: 'ctc' },
    { name: 'Both', value: 'both' },
  ];

  // Modal
  modalSample: BsModalRef;
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
  finComparisonForm: FormGroup
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
  // documentForm: FormGroup

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
  
  constructor(
    private toastr: ToastrService,
    private productService: ProductsService,
    private mockService: MocksService,
    private modalService: BsModalService,
    private router: Router,
    private fb: FormBuilder,
    private cartService: CartsService,
    private loadingBar: LoadingBarService
  ) {
    this.entity = this.router.getCurrentNavigation().extras as any
    this.getLastDigit()
    this.getData()
    // console.log(this.entity)
  }

  ngOnInit(): void {
    // console.log(this.entity)
    this.initForm()

    if (!this.entity.id) {
      this.navigatePage('/products/search')
    }
  }

  getData() {
    this.mockService.get('form-types.json').subscribe(
      (res) => {
        this.formTypes = res
        // console.log(this.formTypes)
      }
    )

    this.productService.getAll().subscribe(
      () => {
        this.products = this.productService.products
      },
      () => {},
      () => {}
    )
    // Ada API untuk call middleware untuk check product apa available untuk dirinya
    let imageBody = {
      'name': 'list',
      'registration_no': this.registration_no,
      'entity_type': 'ROC'
    }
    console.log(imageBody)
    this.productService.generateImage(imageBody).subscribe(
      (res) => {
        console.log('Image list', res)
        this.imageList = res
      },
      () => {},
      () => {
        this.imageList.forEach(
          (img) => {
            this.formTypes.forEach(
              (form) => {
                if (img.formType == form.code) {
                  img['formName'] = form.desc_en
                  img['isCtc'] = false
                  img['price'] = 1000
                  this.updateTable()
                }
              }
            )
          }
        )
      }
    )

    let checkBody = {
      'registration_no': this.registration_no,
      'entity_type': 'ROC'
    }

    this.productService.check(checkBody).subscribe(
      () => {},
      () => {},
      () => {}
    )

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
      image_form_type: new FormControl('NA'),
      image_version_id: new FormControl('NA')
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
      slug: new FormControl('certificate_of_conversion'), // Certificate of Conversion
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
      year1: new FormControl(''),
      year2: new  FormControl('')
    })

    this.finComparisonForm = this.fb.group({
      slug: new FormControl('financial_comparison'), // Financial Comparison
      language: new FormControl('EN'),
      isCtc: new FormControl(false),
      year: new FormControl(2),
      fee: new FormControl(2000)
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
  }

  updateTable() {
    this.tableRows = this.imageList
    this.tableTemp = this.tableRows.map((prop, key) => {
      return {
        ...prop,
        id_index: key+1
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
    console.log('clicked', selected.value)
    this.products.forEach(
      (product) => {
        if (selected.value['language'] == 'BT') {
          if (
            selected.value['slug'] == product['slug'] &&
            selected.value['isCtc'] == product['ctc'] &&
            product['language'] == 'MS'
          ) {
            this.cartForm.controls['product'].setValue(product['id'])
            this.addItem()
          }
          else if (
            selected.value['slug'] == product['slug'] &&
            selected.value['isCtc'] == product ['ctc'] &&
            product['language'] == 'EN'
          ) {
            this.cartForm.controls['product'].setValue(product['id'])
            this.addItem()
          }
        }
        else {
          if (
            selected.value['slug'] == product['slug'] &&
            selected.value['isCtc'] == product['ctc'] &&
            selected.value['language'] == product['language']
          ) {
            this.cartForm.controls['product'].setValue(product['id'])
            this.addItem()
          }
        }
      }
    )
  }

  addCartFin() {
    if (this.finComparisonForm.value['year'] = 2) {
      this.cartForm.controls['product'].setValue('f9bf60ed-ee4e-4767-9463-be469fd52139')
      this.addItem()
    }
    else if (this.finComparisonForm.value['year'] = 3) {
      this.cartForm.controls['product'].setValue('12fd6c17-0ca0-47cf-bb0f-37aab5e9524e')
      this.addItem()
    }
    else if (this.finComparisonForm.value['year'] = 5) {
      this.cartForm.controls['product'].setValue('225aa393-4b45-4d99-868a-62ae5f40b218')
      this.addItem()
    }
    else if (this.finComparisonForm.value['year'] = 10) {
      this.cartForm.controls['product'].setValue('a7298fdf-2372-4677-b5c4-6a8e57f3369b')
      this.addItem()
    }
  }

  addItem() {
    let title = 'Success'
    let message = 'Item is added to the cart'
    this.loadingBar.useRef('http').start()

    this.cartService.addItem(this.cartService.cartCurrent.id, this.cartForm.value).subscribe(
      () => {
        this.loadingBar.useRef('http').complete()
      },
      () => {
        this.loadingBar.useRef('http').complete()
      },
      () => {
        this.toastr.success(message, title)
        this.productService.cart = true
      }
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
      this.finComparisonForm.controls['year'].setValue(2)
      this.finComparisonForm.controls['fee'].setValue(2000)
    }
    else if (selected == 3) {
      this.finComparisonForm.controls['year'].setValue(3)
      this.finComparisonForm.controls['fee'].setValue(3000)
    }
    else if (selected == 5) {
      this.finComparisonForm.controls['year'].setValue(5)
      this.finComparisonForm.controls['fee'].setValue(5000)
    }
    else if (selected == 10) {
      this.finComparisonForm.controls['year'].setValue(10)
      this.finComparisonForm.controls['fee'].setValue(10000)
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




// addCartOld(product: string) {
//   let title = 'Success';
//   let message = 'Item is added to the cart';
//   let product_id;
//   this.loadingBar.useRef('http').start()

//   if (product == 'Company Profile') {
//     if (this.companyProfileForm.value['language'] == 'MS' && this.companyProfileForm.value['isCtc'] == false) {
//       this.cartForm.controls['product'].setValue('abd86a30-3d41-4c68-94e3-280b0362e288')
//     }
//     else if (this.companyProfileForm.value['language'] == 'EN' && this.companyProfileForm.value['isCtc'] == false) {
//       this.cartForm.controls['product'].setValue('74a97598-c817-4c06-971f-3197c4c12165')
//     }
//     else if (this.companyProfileForm.value['language'] == 'MS' && this.companyProfileForm.value['isCtc'] == true) {
//       this.cartForm.controls['product'].setValue('f636d9f7-29f6-4d85-bf21-417c7496193d')
//     }
//     else if (this.companyProfileForm.value['language'] == 'EN' && this.companyProfileForm.value['isCtc'] == true) {
//       this.cartForm.controls['product'].setValue('5b381e56-dc2f-4476-986e-ecb247d48499')
//     }
//   }
//   else if (product == 'Business Profile') {
//     if (this.businessProfileForm.value['language'] == 'MS' && this.businessProfileForm.value['isCtc'] == false) {
//       this.cartForm.controls['product'].setValue('1eca2caf-a8c7-4327-a37f-394f4dd9c78e')
//     }
//     else if (this.businessProfileForm.value['language'] == 'EN' && this.businessProfileForm.value['isCtc'] == false) {
//       this.cartForm.controls['product'].setValue('539aaa55-a0f6-4af4-b476-acc03bae8f62')
//     }
//     else if (this.businessProfileForm.value['language'] == 'MS' && this.businessProfileForm.value['isCtc'] == true) {
//       this.cartForm.controls['product'].setValue('f1dc2664-f55d-4012-a4fe-556da76eb32c')
//     }
//     else if (this.businessProfileForm.value['language'] == 'EN' && this.businessProfileForm.value['isCtc'] == true) {
//       this.cartForm.controls['product'].setValue('8df319e5-0bed-435d-81d4-03856870195d')
//     }
//   }
//   else if (product == 'Financial Historical') {
//     if (this.finHistoricalForm.value['language'] == 'MS' && this.finHistoricalForm.value['isCtc'] == false) {
//       this.cartForm.controls['product'].setValue('aeb73efa-b89e-4e15-b1a7-3ba2409f7ec1')
//     }
//     else if (this.finHistoricalForm.value['language'] == 'EN' && this.finHistoricalForm.value['isCtc'] == false) {
//       this.cartForm.controls['product'].setValue('6420ad7f-8639-451e-99c7-76a02ac2763c')
//     }
//     else if (this.finHistoricalForm.value['language'] == 'MS' && this.finHistoricalForm.value['isCtc'] == true) {
//       this.cartForm.controls['product'].setValue('e5adc490-47d0-4a81-b1ad-88cdf4a26662')
//     }
//     else if (this.finHistoricalForm.value['language'] == 'EN' && this.finHistoricalForm.value['isCtc'] == true) {
//       this.cartForm.controls['product'].setValue('28217e60-cde1-4a8a-807f-fe68d5622f64')
//     }
//   }
//   else if (product == 'Financial Comparison') {
//     if (this.finComparisonForm.value['year'] == 2) {
//       this.cartForm.controls['product'].setValue('f9bf60ed-ee4e-4767-9463-be469fd52139')
//     }
//     else if (this.finComparisonForm.value['year'] == 3) {
//       this.cartForm.controls['product'].setValue('12fd6c17-0ca0-47cf-bb0f-37aab5e9524e')
//     }
//     else if (this.finComparisonForm.value['year'] == 5) {
//       this.cartForm.controls['product'].setValue('225aa393-4b45-4d99-868a-62ae5f40b218')
//     }
//     else if (this.finComparisonForm.value['year'] == 10) {
//       this.cartForm.controls['product'].setValue('a7298fdf-2372-4677-b5c4-6a8e57f3369b')
//     }
//   }
//   else if (product == 'Certificate of Incorporation') {
//     if (this.certIncorpForm.value['language'] == 'MS' && this.certIncorpForm.value['isCtc'] == false) {
//       this.cartForm.controls['product'].setValue('436f3d72-dc34-45e7-8775-21b258411db1')
//     }
//     else if (this.certIncorpForm.value['language'] == 'EN' && this.certIncorpForm.value['isCtc'] == false) {
//       this.cartForm.controls['product'].setValue('4b922d05-a626-48ac-a8d2-8f450bf8697e')
//     }
//     else if (this.certIncorpForm.value['language'] == 'MS' && this.certIncorpForm.value['isCtc'] == true) {
//       this.cartForm.controls['product'].setValue('5561f5ec-6ca0-492d-827b-2b36114c4606')
//     }
//     else if (this.certIncorpForm.value['language'] == 'EN' && this.certIncorpForm.value['isCtc'] == true) {
//       this.cartForm.controls['product'].setValue('63638688-830d-4750-bd17-5157f8dc4a96')
//     }
//   }

//   this.cartService.addItem('2210c8ea-ae65-480f-af82-5ee1c49b7e06', this.cartForm.value).subscribe(
//     () => {
//       this.loadingBar.useRef('http').complete()
//     },
//     () => {
//       this.loadingBar.useRef('http').complete()
//     },
//     () => {
//       this.toastr.success(message, title);
//       this.productService.cart = true;
//     }
//   )

// }

// addCartDocument(row) {
//   console.log('werwer', row)
//   let title = 'Success';
//   let message = 'Item is added to the cart';
//   console.log(row.formType)
//   console.log(row.verId)
//   this.cartForm.controls['image_form_type'].setValue(row.formType)
//   this.cartForm.controls['image_version_id'].setValue(row.verId)

//   console.log(this.cartForm.value)
//   this.loadingBar.useRef('http').start()
//   if (row['isCtc']) {
//     this.cartForm.controls['product'].setValue('46efd15d-0cd4-41aa-a6d6-790d6aecbf0b')
//   }
//   else {
//     this.cartForm.controls['product'].setValue('04e740bb-6553-49fe-b3fb-dabc445fa89b')
//   }

//   this.cartService.addItem('2210c8ea-ae65-480f-af82-5ee1c49b7e06', this.cartForm.value).subscribe(
//     () => {
//       this.loadingBar.useRef('http').complete()
//     },
//     () => {
//       this.loadingBar.useRef('http').complete()
//     },
//     () => {
//       this.toastr.success(message, title);
//       this.productService.cart = true;
//       this.cartForm.controls['image_form_type'].setValue(null)
//       this.cartForm.controls['image_version_id'].setValue(null)
//     }
//   )
// }
