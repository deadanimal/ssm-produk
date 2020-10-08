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

  // Icons
  iconEmpty = 'assets/img/default/shopping-bag.svg'

  // declare variable
  sum: number = 0
  total: number = 0
  totaldocument: number = 0

  // Checker
  isEmpty: boolean = false

  constructor(
    private fb: FormBuilder,
    private loadingBar: LoadingBarService,
    private cartService: CartsService,
    private modalService: BsModalService,
    private formBuilder: FormBuilder,
    private fileService: LocalFilesService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getData()
  }

  getData() {
    this.fileService.get('form-types.json').subscribe(
      (res) => {
        this.formTypes = res
        // console.log(this.formTypes)
      }
    )

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
    if (row) {
      console.log(row);
      this.editAppReqForm.patchValue(row);
    }
    this.modal = this.modalService.show(
      modalRef,
      Object.assign({}, { class: 'gray modal-lg' })
    );
    // this.modal = this.modalService.show(modalRef, this.modalConfig);
  }

  closeModal() {
    this.modal.hide();
    this.editAppReqForm.reset();
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

}
