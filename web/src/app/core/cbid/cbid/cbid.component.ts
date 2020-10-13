import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { BsModalService } from 'ngx-bootstrap';

import { Router } from '@angular/router';
import { LoadingBarService } from '@ngx-loading-bar/core';


import { CartsService } from 'src/app/shared/services/carts/carts.service';
import { ProductsService } from 'src/app/shared/services/products/products.service';
import { ServicesService } from 'src/app/shared/services/services/services.service';
import { Service } from 'src/app/shared/services/services/services.model';


export enum SelectionType {
  single = 'single',
  multi = 'multi',
  multiClick = 'multiClick',
  cell = 'cell',
  checkbox = 'checkbox',
}

@Component({
  selector: 'app-cbid',
  templateUrl: './cbid.component.html',
  styleUrls: ['./cbid.component.scss']
})
export class CbidComponent implements OnInit {

  // Data
  services: Service[] = []
  // Table
  tableEntries: number = 5;
  tableSelected: any[] = [];
  tableTemp = [];
  tableActiveRow: any;
  tableRows: any[] = [];
  SelectionType = SelectionType;
  listProject: any;
  listEntity: any;
  listProduct: any;

  // Form
  serviceForm: FormGroup
  requestForm: FormGroup
  cartForm: FormGroup
  requestToAdd: any[] = []

  // Checker
  isGotRequest: boolean = true
  clicked

  // HC
  service1 = '949ea0bc-1c1c-417a-8683-145de5ef6976'
  service2 = 'cb839e88-f045-4f5a-97ec-18e488f02405'
  service3 = 'e65d94be-0b37-4d7c-8f72-301a038346c3'
  service4 = 'd80eeecb-dd4d-4219-b641-0aa2a2fa7fbb'

  constructor(
    private cartService: CartsService,
    private productService: ProductsService,
    private fb: FormBuilder,
    private loadingBar: LoadingBarService,
    private modalService: BsModalService,
    private serviceService: ServicesService,
    private router: Router
  ) {
    this.getData()
   }

  ngOnInit(): void {
    this.initForm()
  }

  // SB Start

  getData() {
    this.serviceService.getAll().subscribe(
      () => {
        this.services = this.serviceService.services
        console.log(this.services)
      },
      () => {},
      () => {}
    )
  }

  initForm() {
    this.serviceForm = this.fb.group({
      name: new FormControl('CBID - Registration of Business - Statistics'),
      service_type: new FormControl('CB'),
      entities_type: new FormControl('RB', Validators.required),
      product_type: new FormControl('ST', Validators.required),
      fee: new FormControl(1000)
    })

    this.requestForm = this.fb.group({
      service_id: new FormControl('', Validators.required),
      name: new FormControl('Amin Redzuan', Validators.required),
      product_type: new FormControl('', Validators.required),
      organisation: new FormControl('AR Sdn. Bhd.', Validators.required),
      address: new FormControl('', Validators.required),
      email: new FormControl('ar_sdn_bhd@gmail.com', Validators.compose([
        Validators.required,
        Validators.email
      ])),
      phone_number: new FormControl('0176867253', Validators.compose([
        Validators.required,
        Validators.pattern('^[0-9]*$')
      ])),
      remarks: new FormControl(''),
      completed: new FormControl(false)
    })
    
    this.cartForm = this.fb.group({
      item_type: new FormControl('service'),
      service_request_id: new FormControl('', Validators.compose([
        Validators.required
      ]))
    })
  }

  addRequest(selected) {
    this.services.forEach(
      (service) => {
        if (selected.value['entities_type'] == 'BT') {
          if (selected.value['product_type'] == 'BT') {
            if (
              selected.value['service_type'] == service['service_type']
            ) {
              let item = {
                'name': service['name'],
                'service_type': service['service_type'],
                'product_type': service['product_type'],
                'entities_type': service['entities_type'],
                'fee': service['fee'],
                'service': service['id']
              }
              this.requestToAdd.push(item)
              this.getTableData()
            }
          }
          else {
            if (
              selected.value['service_type'] == service['service_type'] &&
              selected.value['product_type'] == service['product_type']
            ) {
              let item = {
                'name': service['name'],
                'service_type': service['service_type'],
                'product_type': service['product_type'],
                'entities_type': service['entities_type'],
                'fee': service['fee'],
                'service': service['id']
              }
              this.requestToAdd.push(item)
              this.getTableData()
            }
          }
        }
        else {
          if (
            selected.value['service_type'] == service['service_type'] &&
            selected.value['product_type'] == service['product_type'] &&
            selected.value['entities_type'] == service['entities_type']
          ) {
            let item = {
              'name': service['name'],
              'service_type': service['service_type'],
              'product_type': service['product_type'],
              'entities_type': service['entities_type'],
              'fee': service['fee'],
              'service': service['id']
            }
            this.requestToAdd.push(item)
            this.getTableData()
          }
        }
      }
    )
  }

  updatePrice() {
    if (this.serviceForm.value['entity_type'] == 'RB') {
      this.serviceForm.controls['price'].setValue(10.00)
    }
    else if (this.serviceForm.value['entity_type'] == 'RC') {
      this.serviceForm.controls['price'].setValue(20.00)
    }
    else if (this.serviceForm.value['entity_type'] == 'BT') {
      this.serviceForm.controls['price'].setValue(30.00)
    }
  }

  addRequest1() {
    let item = {
      'entity_type': this.serviceForm.value['entity_type'],
      'product_type': this.serviceForm.value['product_type'],
      'price': this.serviceForm.value['price']
    }
    // console.log('To add: ', item)
    // if (this.serviceForm.value['entity_type'] == 'BT')
    this.requestToAdd.push(item)
    this.getTableData()

  }

  removeRequest(row) {
    // console.log('To remove', row)
    this.requestToAdd.slice(row)
  }

  getTableData() {
    this.tableRows = this.requestToAdd
    this.tableTemp = this.tableRows.map((prop, key) => {
      return {
        ...prop,
        id_index: key+1
      }
    })
  }

  addToCart() {
    // console.log('Service to add: ')
    // this.cartService
    let reqCnt = this.requestToAdd.length
    let processCnt = 0
    
    this.requestToAdd.forEach(
      (req) => {
        console.log(req)
        this.requestForm.controls['service_id'].setValue(req['service'])

        processCnt += 1
        this.loadingBar.useRef('http').start()

        this.serviceService.requestService(this.requestForm.value).subscribe(
          (res) => {
            this.cartForm.controls['service_request_id'].setValue(res.id)
            this.cartService.addItem(this.cartService.cartCurrent.id, this.cartForm.value).subscribe(
              () => {},
              () => {
                this.loadingBar.useRef('http').complete()
              },
              () => {
                this.loadingBar.useRef('http').complete()
                if (processCnt == reqCnt) {
                  delete this.requestToAdd
                  this.navigatePage('/cart')
                }
              }
            )
          },
          () => {
            this.loadingBar.useRef('http').complete()
          },
          () => {
            this.loadingBar.useRef('http').complete()
          }
        )
      }
    )
  }

  sendRequest() {
    
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

  navigatePage(path: string) {
    return this.router.navigate([path])
  }

}
