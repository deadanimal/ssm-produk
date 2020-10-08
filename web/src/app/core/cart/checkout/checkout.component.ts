import { Component, OnInit, TemplateRef } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  Validators,
  FormControl,
} from '@angular/forms';
import swal from 'sweetalert2';
import { Router } from '@angular/router';
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
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent implements OnInit {

  // Modal
  modal: BsModalRef;
  modalConfig = {
    keyboard: true,
    class: 'modal-dialog-centered',
  };

  // Table
  tableEntries: number = 10;
  tableSelected: any[] = [];
  tableTemp = [];
  tableActiveRow: any;
  tableRows: any[] = [];
  tableMessages = {
    // Message to show when array is presented
    // but contains no values
    emptyMessage: 'Empty checkout',
  
    // Footer total message
    totalMessage: '',
  
    // Footer selected message
    selectedMessage: 'selected'
  }
  SelectionType = SelectionType;

  // Form
  searchForm: FormGroup;
  searchField: FormGroup;
  addAppReqForm: FormGroup;
  editAppReqForm: FormGroup;

  // Data
  items: any[] = [];
  formTypes: any[] = []

  // Icons
  iconEmpty = 'assets/img/default/shopping-bag.svg';

  // declare variable
  sum: number = 0;
  total: number = 0;
  totaldocument: number = 0;

  // Checker
  isEmpty: boolean = false;

  constructor(
    private fb: FormBuilder,
    private loadingBar: LoadingBarService,
    private cartService: CartsService,
    private modalService: BsModalService,
    private formBuilder: FormBuilder,
    private router: Router,
    private fileService: LocalFilesService
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
        // this.updatePrice()
        console.log('a', this.tableRows)
        console.log('b', this.tableTemp)
      }
    )
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
    this.loadingBar.start();
    this.loadingBar.complete();
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
