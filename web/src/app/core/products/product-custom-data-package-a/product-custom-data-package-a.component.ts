import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { BusinessCode } from 'src/app/shared/models/business-code.model';
import { CompanyStatus } from 'src/app/shared/models/company-status.model';
import { StateCode } from 'src/app/shared/models/state-code.model';
import { CartsService } from 'src/app/shared/services/carts/carts.service';
import { LocalFilesService } from 'src/app/shared/services/local-files/local-files.service';
import { SearchCriteriasService } from 'src/app/shared/services/search-criterias/search-criterias.service';
import { ProductsService } from 'src/app/shared/services/products/products.service';
import { QuotasService } from 'src/app/shared/services/quotas/quotas.service';
import Swal from 'sweetalert2';

export enum SelectionType {
  single = 'single',
  multi = 'multi',
  multiClick = 'multiClick',
  cell = 'cell',
  checkbox = 'checkbox',
}

@Component({
  selector: 'app-product-custom-data-package-a',
  templateUrl: './product-custom-data-package-a.component.html',
  styleUrls: ['./product-custom-data-package-a.component.scss']
})
export class ProductCustomDataPackageAComponent implements OnInit {

  // Options
  businessCodes: BusinessCode[] = []
  companyStatus: CompanyStatus[] = []
  stateCodes: StateCode[] = []
  companyOrigins: any[] = []
  companyTypes: any[] = []
  sectors: any[] = []
  divisions: any[] = []

  bizCodes: any[] = []
  bizCodesCombined = ''

  // Form
  customForm: FormGroup
  quotaForm: FormGroup
  cartForm: FormGroup

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
  tableResults: any[] = []

  // Temp
  quota: any

  constructor(
    private cartService: CartsService,
    private criteriaService: SearchCriteriasService,
    private fileService: LocalFilesService,
    private productService: ProductsService,
    private quotaService: QuotasService,
    private fb: FormBuilder,
    private router: Router,
    private spinner: NgxSpinnerService,
    private toastr: ToastrService
  ) { 
    this.getData()
  }

  ngOnInit(): void {
    this.customForm = this.fb.group({
      name: new FormControl('list'),
      package: new FormControl('A'),
      incorpDtFrom: new FormControl(''),
      incorpDtTo: new FormControl(''),
      compStatus: new FormControl(''),
      compType: new FormControl(''),
      sector: new FormControl(''),
      division: new FormControl('NA'),
      bizCode: new FormControl(''),
      compOrigin: new FormControl(''),
      compLocation: new FormControl(''),
    })

    this.quotaForm = this.fb.group({
      item_type: new FormControl('quota'),
      quota_id: new FormControl('19cfff0d-f088-466f-b7dd-0a548a13beb9')
    })

    this.cartForm = this.fb.group({
      product_search_criteria_id: new FormControl(''),
      item_type: new FormControl('product_search_criteria')
    })
  }

  getData() {
    console.log('hehe')
    this.fileService.get('business-codes.json').subscribe(
      (res) => {
        this.businessCodes = res
        console.log(this.businessCodes)
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

    this.quotaService.get('19cfff0d-f088-466f-b7dd-0a548a13beb9').subscribe(
      (res) => {
        this.quota = res
      }
    )

  }

  search() {
    this.spinner.show()
    this.customForm.controls['bizCode'].setValue(this.bizCodesCombined)
    console.log('> ', this.customForm.value)
    this.productService.generateList(this.customForm.value).subscribe(
      (res) => {
        console.log(res)
        // if (res.errorMsg) {
        //   this.notFound()
        // }
        this.spinner.hide()
        let loaded = res
        res['search_criteria'] = this.customForm.value
        this.tableResults.push(res)
      },
      () => {
        this.spinner.hide()
      },
      () => {
        this.updateTable()
        this.quotaService.update('19cfff0d-f088-466f-b7dd-0a548a13beb9').subscribe(
          (res) => {this.quota = res}
        )
      }
    )
  }

  changePackage() {

  }

  checkQuota() {

  }

  updateTable() {
    this.tableRows = this.tableResults
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

  confirm() {
    let cnt = 0
    this.bizCodesCombined = ''
    this.customForm.controls['incorpDtFrom'].setValue(this.customForm.value.incorpDtFrom + 'T00:00:00')
    this.customForm.controls['incorpDtTo'].setValue(this.customForm.value.incorpDtTo + 'T00:00:00')

    this.bizCodes.forEach(
      (biz) => {
        if (cnt == 0) {
          this.bizCodesCombined = biz
        }
        else {
          this.bizCodesCombined = this.bizCodesCombined + ', ' + biz
        }
        cnt++
      }
    )

    if (this.quota.quota == 0) {
      this.noQuota()
    } 
    else {
      this.search()
    }
  }

  noQuota() {
    Swal.fire({
      title: 'Info',
      text: 'By requesting to proceed, '+
            'RM20 processing fee will be '+ 
            'charged. This detail search '+
            'is valid up to 24 hours with '+
            'maximum of 5 times search remaining.',
      icon: 'info',
      buttonsStyling: false,
      showCancelButton: true,
      confirmButtonText: 'Checkout',
      cancelButtonText: 'Cancel',
      customClass: {
        confirmButton: 'btn btn-ssm rounded-pill',
        cancelButton: 'btn btn-outline-ssm rounded-pill'
      }
    }).then((res) => {
      if (res) {
        // Confirm
        this.cartService.addItem(this.cartService.cartCurrent.id, this.quotaForm.value).subscribe(
          () => {
            let title = 'Success'
            let message = 'Item is added to the cart'
            this.toastr.success(message, title)
          }
        )
      }
      else {
        // Cancel
      }
    })
  }

  info() {
    Swal.fire({
      title: 'Info',
      text: 'This detail search '+
            'is valid up to 24 hours with '+
            'maximum of 5 times search remaining',
      icon: 'info',
      buttonsStyling: false,
      confirmButtonText: 'Continue',
      customClass: {
        confirmButton: 'btn btn-ssm rounded-pill',
      }
    }).then((res) => {
      if (res) {
        // Confirm
      }
    })
  }

  notFound() {
    Swal.fire({
      title: 'Attention',
      text: 'No data for the given search criteria',
      icon: 'warning',
      buttonsStyling: false,
      confirmButtonText: 'Close',
      customClass: {
        confirmButton: 'btn btn-warning rounded-pill',
      }
    }).then((res) => {
      if (res) {
        // Confirm
      }
    })
  }

  addToCart(row) {
    let body = {
      "incorp_date_from": row['search_criteria']['incorpDtFrom'],
      "incorp_date_to": row['search_criteria']['incorpDtTo'],
      "company_status": row['search_criteria']['compStatus'],
      "company_type": row['search_criteria']['compType'],
      "company_origin": row['search_criteria']['compOrigin'],
      "company_location": row['search_criteria']['compLocation'],
      "division": row['search_criteria']['division'],
      "business_code": row['search_criteria']['bizCode']
    }
    this.criteriaService.create(body).subscribe(
      (res) => {
        this.cartForm.controls['product_search_criteria_id'].setValue(res.id)
      },
      () => {},
      () => {
        this.cartService.addItem(this.cartService.cartCurrent.id, this.cartForm.value).subscribe(
          () => {
            let title = 'Success'
            let message = 'Item is added to the cart'
            this.toastr.success(message, title)
          }
        )
      }
    )
  }

  checkDates() {
    if (
      this.customForm.value['incorpDtFrom'] &&
      this.customForm.value['incorpDtTo']
    ) {
      let date1 = new Date(this.customForm.value['incorpDtFrom'])
      let date2 = new Date(this.customForm.value['incorpDtTo'])

      let differenceInTime = date2.getTime() - date1.getTime()
      let differenceInDays = differenceInTime/(1000*3600*24)

      if (differenceInDays > 30) {
        Swal.fire({
          title: 'Error',
          text: 'Range of incorporation date must be less than 30 days.',
          icon: 'warning',
          buttonsStyling: false,
          confirmButtonText: 'Close',
          customClass: {
            confirmButton: 'btn btn-warning rounded-pill',
          }
        })
      }
    }
  }

  navigatePage(path: string) {
    return this.router.navigate([path])
  }

}
