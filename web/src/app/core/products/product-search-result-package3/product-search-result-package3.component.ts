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
import { NgxSpinnerService } from 'ngx-spinner';

import * as moment from 'moment';
import { ServicesService } from 'src/app/shared/services/services/services.service';

export enum SelectionType {
  single = 'single',
  multi = 'multi',
  multiClick = 'multiClick',
  cell = 'cell',
  checkbox = 'checkbox',
}

@Component({
  selector: 'app-product-search-result-package3',
  templateUrl: './product-search-result-package3.component.html',
  styleUrls: ['./product-search-result-package3.component.scss']
})
export class ProductSearchResultPackage3Component implements OnInit {

  // Data
  entity: any;
  entity_data: any;
  imageList: any[] = []
  formTypes: any[] = []
  documents: any[] = []
  requestedDocuments: any[] = []

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
    totalMessage: ' Document Found',
  
    // Footer selected message
    selectedMessage: 'selected'
  }  

  tableDocumentSelected: any[] = []
  tableDocumentTemp = []
  tableDocumentActiveRow: any
  tableDocumentRows: any[] = []
  tableDocumentMessages = {
    // Message to show when array is presented
    // but contains no values
    emptyMessage: 'Empty search',
  
    // Footer total message
    totalMessage: ' Document Found',
  
    // Footer selected message
    selectedMessage: 'selected'
  }

  itemToAdd: any[] = []

  
  constructor(
    private toastr: ToastrService,
    private productService: ProductsService,
    private fileService: LocalFilesService,
    private modalService: BsModalService,
    private router: Router,
    private fb: FormBuilder,
    private loadingBar: LoadingBarService,
    public spinner: NgxSpinnerService,
    private serviceService: ServicesService
  ) {
    this.entity = this.router.getCurrentNavigation().extras as any
    console.log(this.entity)
  }

  ngOnInit() {
    let request_ = {
      "language": "en",
      "ctc": "False",
      "name": "list"
    }
    

    if (this.entity['type_of_entity'] == 'CP') {
      request_["registration_no"] = Number(this.entity['company_number'])
      request_["entity_type"] = "ROC"
    } else if (this.entity['type_of_entity'] == 'BS') {
      request_["registration_no"] = this.entity['registration_number']
      request_["entity_type"] = "ROB"
    } else if (this.entity['type_of_entity'] == 'XX') {

    } else if (this.entity['type_of_entity'] == 'XX') {

    } else {

    }

    this.fileService.get('form-types.json').subscribe(
      (res) => {
        this.formTypes = res
        // console.log(this.formTypes)
      }
    )
    
    let entity_type_profile = ''
    let entity_name = this.entity['name']
    let entity_no = ''
    
    if (this.entity['type_of_entity'] == 'CP') {
      entity_type_profile = 'Company Profile'
      entity_no = this.entity['company_number_new'] + '(' + this.entity['company_number'] + '-' + this.entity['check_digit'] + ')'
    }
    else if (this.entity['type_of_entity'] == 'BS') {
      entity_type_profile = 'Business Profile'
      entity_no = this.entity['registration_number_new'] + '(' + this.entity['registration_number'] + '-' + this.entity['check_digit'] + ')'
    }

    let profile_data = {
      'entity': this.entity['id'],
      'companyNo': entity_no,
      'companyName': entity_name,
      'documentType': 'PF',
      'documentFormType': '-',
      'documentFormName': entity_type_profile,
      'documentDate': '-',
      'totalPage': '-',
      'isChecked': false,
      'verId': null
    }
     
    this.documents.push(profile_data)

    if (this.entity['type_of_entity'] == 'CP') {
      this.spinner.show()
      this.productService.generateImage(request_).subscribe(
        (res) => {
          // console.log('Image list', res)
          this.imageList = res
        },
        () => {
          this.spinner.hide()
        },
        () => {
          this.spinner.hide()
  
          this.imageList.sort((a, b) => new Date(b.dateFiler).getTime() - new Date(a.dateFiler).getTime())
          this.imageList.forEach(
            (img) => {
              let form_type_desc = ''
              this.formTypes.filter((form) => {
                if (img.formType == form.code) {
                  form_type_desc = form.desc_en
                }
              })
  
              let human_date = moment(img.dateFiler).format('DD-MM-YYYY')
  
              let form_data = {
                'entity': this.entity['id'],
                'companyNo': entity_no,
                'companyName': entity_name,
                'documentType': 'FR',
                'documentFormType': img['formType'],
                'documentFormName': form_type_desc,
                'documentDate': human_date,
                'totalPage': img['totalPage'],
                'isChecked': false,
                'verId': img['verId']
              }
  
              this.documents.push(form_data)
            }
          )
          this.updateTable()
        }
      )
    }
    else {
      this.updateTable()
    }
    
  }

  goBack() {
    this.router.navigate(['products/search-egov'])
  }

  updateTable() {
    this.tableRows = this.documents
    this.tableTemp = this.tableRows.map((prop, key) => {
      return {
        ...prop,
        id_index: key+1
      }
    })
    // console.log(this.tableTemp)
  }  

  addCartDocument(row) {
    this.requestedDocuments.push(row)
    this.tableDocumentRows = this.requestedDocuments
    this.tableDocumentTemp = this.tableDocumentRows.map((prop, key) => {
      return {
        ...prop,
        id_index: key+1
      }
    })    
  }

  submit() {
    this.tableTemp.forEach(
      (temp) => {
        if (temp['isChecked']) {
          this.serviceService.requestToAdd.push(temp)
          console.log(this.serviceService.requestToAdd)
        }
      }
    )
    this.navigatePage('/profile/egov')
  }

  navigatePage(path: string) {
    // console.log('Path: ', path)
    if (path == '/profile/egov') {
      return this.router.navigate([path], { queryParams: { tab: 'request-doc' } })
    } else {
      return this.router.navigate([path])
    }
  }
}
