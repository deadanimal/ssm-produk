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
  selector: 'app-product-search-result-package2',
  templateUrl: './product-search-result-package2.component.html',
  styleUrls: ['./product-search-result-package2.component.scss']
})
export class ProductSearchResultPackage2Component implements OnInit {

  // Data
  entity: any;
  entity_data: any;

  stateCodes: any[] = []

  
  constructor(
    private toastr: ToastrService,
    private productService: ProductsService,
    private fileService: LocalFilesService,
    private modalService: BsModalService,
    private router: Router,
    private fb: FormBuilder,
    private cartService: CartsService,
    private loadingBar: LoadingBarService,
    public spinner: NgxSpinnerService
  ) {
    this.entity = this.router.getCurrentNavigation().extras as any
    this.getData()
    if (this.entity.replaceUrl) {
      this.router.navigate(['/products/search-egov'])
    }
  }

  ngOnInit() {
    let request_ = {
      "language": "en",
      "ctc": "False",
    }
    
    // console.log(this.entity)

    if (this.entity['type_of_entity'] == 'CP') {
      request_["name"] =  "company_profile"
      request_["registration_no"] = this.entity['company_number']
      request_["entity_type"] = "ROC"
    } else if (this.entity['type_of_entity'] == 'BS') {
      request_["name"] =  "business_profile"
      request_["registration_no"] = this.entity['registration_number']
      request_["entity_type"] = "ROB"
    } else if (this.entity['type_of_entity'] == 'XX') {

    } else if (this.entity['type_of_entity'] == 'XX') {

    } else {

    }


    // console.log('Calling service');
    this.spinner.show()

    this.productService.generateDocument(request_).subscribe(
      (res: any) => {
        // console.log(res)
        this.entity_data = res;
        if (this.entity_data['company_info']) {
          if (this.entity_data['company_info']['dateOfChange']) {
            this.entity_data['company_info']['dateOfChange'] = moment(this.entity_data['company_info']['dateOfChange']).format('DD-MM-YYYY')
          }
        }
      },(error: any) => {

      },() => {
        this.spinner.hide()

        this.stateCodes.forEach(
          (state) => {
            if ( 
              this.entity_data['bizInfo'] &&
              this.entity_data['bizInfo']['state'] == state['code']
            ) {
              this.entity_data['bizInfo']['state'] = state['desc']
              // console.log('negeri')
            }

            if (this.entity_data['ownerCurrentInfo']) {
              this.entity_data['ownerCurrentInfo'].forEach(
                (current) => {
                  if (current['state'] == state['code']) {
                    current['state'] = state['desc']
                  } 
                }
              )
            }

            if (this.entity_data['officer_info']) {
              this.entity_data['officer_info'].forEach(
                (current) => {
                  if (current['state'] == state['code']) {
                    current['state'] = state['desc']
                  } 
                }
              )
            }

            if (
              this.entity_data['bs_data'] && 
              this.entity_data['bs_data']['auditFirmState']
            ) {
              if (this.entity_data['bs_data']['auditFirmState'] = state['code']) {
                this.entity_data['bs_data']['auditFirmState'] = state['desc']
              }
            }
          }
        )
      }
    )    
  }

  getData() {
    this.fileService.get('state-codes.json').subscribe(
      (res) => {
        this.stateCodes = res
        // console.log(this.stateCodes)
      }
    )
  }

  goBack() {
    this.router.navigate(['products/search-egov'])
  }
}
