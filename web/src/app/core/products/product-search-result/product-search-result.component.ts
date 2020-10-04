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
    console.log(this.entity)

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

    this.companyProfileForm = this.fb.group({
      name: new FormControl('Company Profile'),
      language: new FormControl('MS'),
      isCtc: new FormControl(false),
      price: new FormControl(10.00)
    })

    this.companyChargesForm = this.fb.group({
      name: new FormControl('Company Charges'),
      language: new FormControl('MS'),
      isCtc: new FormControl(false),
      price: new FormControl(10.00)
    })

    this.acgsForm = this.fb.group({
      name: new FormControl('ACGS'),
      language: new FormControl('MS'),
      isCtc: new FormControl(false),
      price: new FormControl(10.00)
    })

    this.certIncorpForm = this.fb.group({
      name: new FormControl('Cert Incorp'),
      language: new FormControl('MS'),
      isCtc: new FormControl(false),
      price: new FormControl(10.00)
    })

    this.certChangeNameForm = this.fb.group({
      name: new FormControl('Cert Change Name'),
      language: new FormControl('MS'),
      isCtc: new FormControl(false),
      price: new FormControl(10.00)
    })

    this.certConversionForm = this.fb.group({
      name: new FormControl('Cert Conversion'),
      language: new FormControl('MS'),
      isCtc: new FormControl(false),
      price: new FormControl(10.00)
    })

    this.finHistoricalForm = this.fb.group({
      name: new FormControl('Fin Historical'),
      language: new FormControl('MS'),
      isCtc: new FormControl(false),
      price: new FormControl(20.00)
    })

    this.finComparisonForm = this.fb.group({
      name: new FormControl('Fin Comparison'),
      year: new FormControl(2),
      price: new FormControl(20.00)
    })

    this.partiDirOfficerForm = this.fb.group({
      name: new FormControl('Cert Incorp'),
      language: new FormControl('MS'),
      isCtc: new FormControl(false),
      price: new FormControl(10.00)
    })

    this.partiShareCapForm = this.fb.group({
      name: new FormControl('Cert Incorp'),
      language: new FormControl('MS'),
      isCtc: new FormControl(false),
      price: new FormControl(10.00)
    })

    this.partiShareholderForm = this.fb.group({
      name: new FormControl('Cert Incorp'),
      language: new FormControl('MS'),
      isCtc: new FormControl(false),
      price: new FormControl(10.00)
    })

    this.partiCompSecForm = this.fb.group({
      name: new FormControl('Cert Incorp'),
      language: new FormControl('MS'),
      isCtc: new FormControl(false),
      price: new FormControl(10.00)
    })

    this.partiRegAddrForm = this.fb.group({
      name: new FormControl('Cert Incorp'),
      language: new FormControl('MS'),
      isCtc: new FormControl(false),
      price: new FormControl(10.00)
    })

    this.businessProfileForm = this.fb.group({
      name: new FormControl('Business Profile'),
      language: new FormControl('MS'),
      isCtc: new FormControl(false),
      price: new FormControl(10.00)
    })

    this.businessCertForm = this.fb.group({
      name: new FormControl('Business Profile'),
      language: new FormControl('MS'),
      isCtc: new FormControl(false),
      price: new FormControl(10.00)
    })

    this.businessTerminateForm = this.fb.group({
      name: new FormControl('Business Profile'),
      language: new FormControl('MS'),
      isCtc: new FormControl(false),
      price: new FormControl(10.00)
    })

    this.auditProfileForm = this.fb.group({
      name: new FormControl('Business Profile'),
      language: new FormControl('MS'),
      isCtc: new FormControl(false),
      price: new FormControl(10.00)
    })

    if (!this.entity.id) {
      this.navigatePage('/products/search')
    }
  }

  getData() {
    console.log('1')

    this.mockService.get('form-types.json').subscribe(
      (res) => {
        this.formTypes = res
        console.log(this.formTypes)
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

  checkCtcImg(row) {
    if (row['isCtc']) {
      row['price'] = 2000
    }
    else {
      row['price'] = 1000
    }
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

  addCart(product: string) {
    let title = 'Success';
    let message = 'Item is added to the cart';
    let product_id;
    this.loadingBar.useRef('http').start()
    // if (product.slug == 'company_profile') {
    //   if(product.ctc) {
    //     if(product.language == 'en') {
    //         product_id = 'A'
    //     } else {
    //       product_id = 'B'
    //     }
    //   } else {
    //     if(product.language == 'en') {
    //       product_id = 'C'
    //     } else {
    //       product_id = 'D'
    //     }
    //   }
    // }

    if (product == 'Company Profile') {
      if (this.companyProfileForm.value['language'] == 'MS' && this.companyProfileForm.value['isCtc'] == false) {
        this.cartForm.controls['product'].setValue('abd86a30-3d41-4c68-94e3-280b0362e288')
      }
      else if (this.companyProfileForm.value['language'] == 'EN' && this.companyProfileForm.value['isCtc'] == false) {
        this.cartForm.controls['product'].setValue('74a97598-c817-4c06-971f-3197c4c12165')
      }
      else if (this.companyProfileForm.value['language'] == 'MS' && this.companyProfileForm.value['isCtc'] == true) {
        this.cartForm.controls['product'].setValue('f636d9f7-29f6-4d85-bf21-417c7496193d')
      }
      else if (this.companyProfileForm.value['language'] == 'EN' && this.companyProfileForm.value['isCtc'] == true) {
        this.cartForm.controls['product'].setValue('5b381e56-dc2f-4476-986e-ecb247d48499')
      }
    }
    else if (product == 'Business Profile') {
      if (this.businessProfileForm.value['language'] == 'MS' && this.businessProfileForm.value['isCtc'] == false) {
        this.cartForm.controls['product'].setValue('1eca2caf-a8c7-4327-a37f-394f4dd9c78e')
      }
      else if (this.businessProfileForm.value['language'] == 'EN' && this.businessProfileForm.value['isCtc'] == false) {
        this.cartForm.controls['product'].setValue('539aaa55-a0f6-4af4-b476-acc03bae8f62')
      }
      else if (this.businessProfileForm.value['language'] == 'MS' && this.businessProfileForm.value['isCtc'] == true) {
        this.cartForm.controls['product'].setValue('f1dc2664-f55d-4012-a4fe-556da76eb32c')
      }
      else if (this.businessProfileForm.value['language'] == 'EN' && this.businessProfileForm.value['isCtc'] == true) {
        this.cartForm.controls['product'].setValue('8df319e5-0bed-435d-81d4-03856870195d')
      }
    }
    else if (product == 'Financial Historical') {
      if (this.finHistoricalForm.value['language'] == 'MS' && this.finHistoricalForm.value['isCtc'] == false) {
        this.cartForm.controls['product'].setValue('aeb73efa-b89e-4e15-b1a7-3ba2409f7ec1')
      }
      else if (this.finHistoricalForm.value['language'] == 'EN' && this.finHistoricalForm.value['isCtc'] == false) {
        this.cartForm.controls['product'].setValue('6420ad7f-8639-451e-99c7-76a02ac2763c')
      }
      else if (this.finHistoricalForm.value['language'] == 'MS' && this.finHistoricalForm.value['isCtc'] == true) {
        this.cartForm.controls['product'].setValue('e5adc490-47d0-4a81-b1ad-88cdf4a26662')
      }
      else if (this.finHistoricalForm.value['language'] == 'EN' && this.finHistoricalForm.value['isCtc'] == true) {
        this.cartForm.controls['product'].setValue('28217e60-cde1-4a8a-807f-fe68d5622f64')
      }
    }
    else if (product == 'Financial Comparison') {
      if (this.finComparisonForm.value['year'] == 2) {
        this.cartForm.controls['product'].setValue('f9bf60ed-ee4e-4767-9463-be469fd52139')
      }
      else if (this.finComparisonForm.value['year'] == 3) {
        this.cartForm.controls['product'].setValue('12fd6c17-0ca0-47cf-bb0f-37aab5e9524e')
      }
      else if (this.finComparisonForm.value['year'] == 5) {
        this.cartForm.controls['product'].setValue('225aa393-4b45-4d99-868a-62ae5f40b218')
      }
      else if (this.finComparisonForm.value['year'] == 10) {
        this.cartForm.controls['product'].setValue('a7298fdf-2372-4677-b5c4-6a8e57f3369b')
      }
    }

    this.cartService.addItem('2210c8ea-ae65-480f-af82-5ee1c49b7e06', this.cartForm.value).subscribe(
      () => {
        this.loadingBar.useRef('http').complete()
      },
      () => {
        this.loadingBar.useRef('http').complete()
      },
      () => {
        this.toastr.success(message, title);
        this.productService.cart = true;
      }
    )

  }

  addCartDocument(row) {
    console.log('werwer', row)
    let title = 'Success';
    let message = 'Item is added to the cart';
    console.log(row.formType)
    console.log(row.verId)
    this.cartForm.controls['image_form_type'].setValue(row.formType)
    this.cartForm.controls['image_version_id'].setValue(row.verId)

    console.log(this.cartForm.value)
    this.loadingBar.useRef('http').start()
    if (row['isCtc']) {
      this.cartForm.controls['product'].setValue('46efd15d-0cd4-41aa-a6d6-790d6aecbf0b')
    }
    else {
      this.cartForm.controls['product'].setValue('04e740bb-6553-49fe-b3fb-dabc445fa89b')
    }

    this.cartService.addItem('2210c8ea-ae65-480f-af82-5ee1c49b7e06', this.cartForm.value).subscribe(
      () => {
        this.loadingBar.useRef('http').complete()
      },
      () => {
        this.loadingBar.useRef('http').complete()
      },
      () => {
        this.toastr.success(message, title);
        this.productService.cart = true;
        this.cartForm.controls['image_form_type'].setValue(null)
        this.cartForm.controls['image_version_id'].setValue(null)
      }
    )
  }

  checkCtc(product: string) {
    if (product == 'Company Profile') {
      if (this.companyProfileForm.value['isCtc']) {
        let newPrice = this.companyProfileForm.value['price'] + 10
        this.companyProfileForm.controls['price'].setValue(newPrice)
      }
      else {
        let newPrice = this.companyProfileForm.value['price'] - 10
        this.companyProfileForm.controls['price'].setValue(newPrice)
      }
    }
    else if (product == 'Company Charges') {
      if (this.companyChargesForm.value['isCtc']) {
        let newPrice = this.companyChargesForm.value['price'] + 10
        this.companyChargesForm.controls['price'].setValue(newPrice)
      }
      else {
        let newPrice = this.companyChargesForm.value['price'] - 10
        this.companyChargesForm.controls['price'].setValue(newPrice)
      }
    }
    else if (product == 'ACGS') {
      if (this.acgsForm.value['isCtc']) {
        let newPrice = this.acgsForm.value['price'] + 10
        this.acgsForm.controls['price'].setValue(newPrice)
      }
      else {
        let newPrice = this.acgsForm.value['price'] - 10
        this.acgsForm.controls['price'].setValue(newPrice)
      }
    }
    else if (product == 'Cert Incorp') {
      if (this.certIncorpForm.value['isCtc']) {
        let newPrice = this.certIncorpForm.value['price'] + 10
        this.certIncorpForm.controls['price'].setValue(newPrice)
      }
      else {
        let newPrice = this.certIncorpForm.value['price'] - 10
        this.certIncorpForm.controls['price'].setValue(newPrice)
      }
    }
    else if (product == 'Cert Change Name') {
      if (this.certChangeNameForm.value['isCtc']) {
        let newPrice = this.certChangeNameForm.value['price'] + 10
        this.certChangeNameForm.controls['price'].setValue(newPrice)
      }
      else {
        let newPrice = this.certChangeNameForm.value['price'] - 10
        this.certChangeNameForm.controls['price'].setValue(newPrice)
      }
    }
    else if (product == 'Cert Conversion') {
      if (this.certConversionForm.value['isCtc']) {
        let newPrice = this.certConversionForm.value['price'] + 10
        this.certConversionForm.controls['price'].setValue(newPrice)
      }
      else {
        let newPrice = this.certConversionForm.value['price'] - 10
        this.certConversionForm.controls['price'].setValue(newPrice)
      }
    }
    else if (product == 'Financial Historical') {
      if (this.finHistoricalForm.value['isCtc']) {
        let newPrice = this.finHistoricalForm.value['price'] + 10
        this.finHistoricalForm.controls['price'].setValue(newPrice)
      }
      else {
        let newPrice = this.finHistoricalForm.value['price'] - 10
        this.finHistoricalForm.controls['price'].setValue(newPrice)
      }
    }
    else if (product == 'Business Profile') {
      if (this.businessProfileForm.value['isCtc']) {
        let newPrice = this.businessProfileForm.value['price'] + 5
        this.businessProfileForm.controls['price'].setValue(newPrice)
      }
      else {
        let newPrice = this.businessProfileForm.value['price'] - 5
        this.businessProfileForm.controls['price'].setValue(newPrice)
      }
    }
  }

  checker(product: string) {
    if (product == 'Company Profile') {
      if (this.companyProfileForm.value['isCtc']) {
        if (this.companyProfileForm.value['language'] == 'BT') {
          this.companyProfileForm.controls['price'].setValue(40)
        }
        else {
          this.companyProfileForm.controls['price'].setValue(20)
        }
      }
      else {
        if (this.companyProfileForm.value['language'] == 'BT') {
          this.companyProfileForm.controls['price'].setValue(20)
        }
        else {
          this.companyProfileForm.controls['price'].setValue(10)
        }
      }
    }
    else if (product == 'Company Charges') {
      if (this.companyChargesForm.value['isCtc']) {
        if (this.companyChargesForm.value['language'] == 'BT') {
          this.companyChargesForm.controls['price'].setValue(40)
        }
        else {
          this.companyChargesForm.controls['price'].setValue(20)
        }
      }
      else {
        if (this.companyChargesForm.value['language'] == 'BT') {
          this.companyChargesForm.controls['price'].setValue(20)
        }
        else {
          this.companyChargesForm.controls['price'].setValue(10)
        }
      }
    }
    else if (product == 'ACGS') {
      if (this.acgsForm.value['isCtc']) {
        if (this.acgsForm.value['language'] == 'BT') {
          this.acgsForm.controls['price'].setValue(40)
        }
        else {
          this.acgsForm.controls['price'].setValue(20)
        }
      }
      else {
        if (this.acgsForm.value['language'] == 'BT') {
          this.acgsForm.controls['price'].setValue(20)
        }
        else {
          this.acgsForm.controls['price'].setValue(10)
        }
      }
    }
    else if (product == 'Cert Incorp') {
      if (this.certIncorpForm.value['isCtc']) {
        if (this.certIncorpForm.value['language'] == 'BT') {
          this.certIncorpForm.controls['price'].setValue(40)
        }
        else {
          this.certIncorpForm.controls['price'].setValue(20)
        }
      }
      else {
        if (this.certIncorpForm.value['language'] == 'BT') {
          this.certIncorpForm.controls['price'].setValue(20)
        }
        else {
          this.certIncorpForm.controls['price'].setValue(10)
        }
      }
    }
    else if (product == 'Cert Change Name') {
      if (this.certChangeNameForm.value['isCtc']) {
        if (this.certChangeNameForm.value['language'] == 'BT') {
          this.certChangeNameForm.controls['price'].setValue(40)
        }
        else {
          this.certChangeNameForm.controls['price'].setValue(20)
        }
      }
      else {
        if (this.certChangeNameForm.value['language'] == 'BT') {
          this.certChangeNameForm.controls['price'].setValue(20)
        }
        else {
          this.certChangeNameForm.controls['price'].setValue(10)
        }
      }
    }
    else if (product == 'Cert Conversion') {
      if (this.certConversionForm.value['isCtc']) {
        if (this.certConversionForm.value['language'] == 'BT') {
          this.certConversionForm.controls['price'].setValue(40)
        }
        else {
          this.certConversionForm.controls['price'].setValue(20)
        }
      }
      else {
        if (this.certConversionForm.value['language'] == 'BT') {
          this.certConversionForm.controls['price'].setValue(20)
        }
        else {
          this.certConversionForm.controls['price'].setValue(10)
        }
      }
    }
    else if (product == 'Financial Comparison') {
      if (this.finComparisonForm.value['isCtc']) {
        if (this.finComparisonForm.value['language'] == 'BT') {
          this.finComparisonForm.controls['price'].setValue(40)
        }
        else {
          this.finComparisonForm.controls['price'].setValue(20)
        }
      }
      else {
        if (this.finComparisonForm.value['language'] == 'BT') {
          this.finComparisonForm.controls['price'].setValue(20)
        }
        else {
          this.finComparisonForm.controls['price'].setValue(10)
        }
      }
    }
    else if (product == 'Financial Historical') {
      if (this.finHistoricalForm.value['isCtc']) {
        if (this.finHistoricalForm.value['language'] == 'BT') {
          this.finHistoricalForm.controls['price'].setValue(40)
        }
        else {
          this.finHistoricalForm.controls['price'].setValue(20)
        }
      }
      else {
        if (this.finHistoricalForm.value['language'] == 'BT') {
          this.finHistoricalForm.controls['price'].setValue(20)
        }
        else {
          this.finHistoricalForm.controls['price'].setValue(10)
        }
      }
    }
    else if (product == 'Financial Historical') {
      if (this.finHistoricalForm.value['isCtc']) {
        if (this.finHistoricalForm.value['language'] == 'BT') {
          this.finHistoricalForm.controls['price'].setValue(40)
        }
        else {
          this.finHistoricalForm.controls['price'].setValue(20)
        }
      }
      else {
        if (this.finHistoricalForm.value['language'] == 'BT') {
          this.finHistoricalForm.controls['price'].setValue(20)
        }
        else {
          this.finHistoricalForm.controls['price'].setValue(10)
        }
      }
    }
    else if (product == 'Financial Historical') {
      if (this.finHistoricalForm.value['isCtc']) {
        if (this.finHistoricalForm.value['language'] == 'BT') {
          this.finHistoricalForm.controls['price'].setValue(40)
        }
        else {
          this.finHistoricalForm.controls['price'].setValue(20)
        }
      }
      else {
        if (this.finHistoricalForm.value['language'] == 'BT') {
          this.finHistoricalForm.controls['price'].setValue(20)
        }
        else {
          this.finHistoricalForm.controls['price'].setValue(10)
        }
      }
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
