import { Component, OnInit, TemplateRef } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import {
  FormGroup,
  FormBuilder,
  Validators,
  FormControl,
} from "@angular/forms";
import swal from "sweetalert2";
import { Router, ActivatedRoute } from "@angular/router";
import { BsModalRef, BsModalService } from "ngx-bootstrap";

import { LoadingBarService } from "@ngx-loading-bar/core";

// cart service
import { CbidCart } from "src/app/shared/services/cbid-carts/cbid-carts.model";
import { CbidCartsService } from "src/app/shared/services/cbid-carts/cbid-carts.service";

export enum SelectionType {
  single = "single",
  multi = "multi",
  multiClick = "multiClick",
  cell = "cell",
  checkbox = "checkbox",
}

@Component({
  selector: "app-cart",
  templateUrl: "./cart.component.html",
  styleUrls: ["./cart.component.scss"],
})
export class CartComponent implements OnInit {
  // Modal
  modal: BsModalRef;
  modalConfig = {
    keyboard: true,
    class: "modal-dialog-centered",
  };

  // Table
  tableEntries: number = 5;
  tableSelected: any[] = [];
  tableTemp = [];
  tableActiveRow: any;
  tableRows: any[] = [];
  SelectionType = SelectionType;
  // listCart: any;
  listCart: any = [
    {
      search_criteria: "Bore Pile",
      total_pages: "Afizi",
      total_company: "AC",
      unit_price: "RM 100,000.00",
      total_price: "RM 150,000.00",
      created_at: "2019-07-27T01:07:14Z",
      total: "Bore Pile",
      sst: "Afizi",
      total_amount: "AC",
      products: "RM 100,000.00",
    },
    {
      search_criteria: "Micro Pile",
      total_pages: "Amin",
      total_company: "PE",
      unit_price: "RM 165,800.00",
      total_price: "70,000.00",
      created_at: "2019-07-27T01:07:14Z",
      total: "Bore Pile",
      sst: "Afizi",
      total_amount: "AC",
      products: "RM 100,000.00",
    },
    {
      search_criteria: "Crosshead",
      total_pages: "Husaini",
      total_company: "CA",
      unit_price: "RM 139,900.00",
      total_price: "RM 65,000.00",
      created_at: "2019-07-27T01:07:14Z",
      total: "Bore Pile",
      sst: "Afizi",
      total_amount: "AC",
      products: "RM 100,000.00",
    },
    {
      search_criteria: "Crosshead",
      total_pages: "Husaini",
      total_company: "CA",
      unit_price: "RM 139,900.00",
      total_price: "RM 65,000.00",
      created_at: "2019-07-27T01:07:14Z",
      total: "Bore Pile",
      sst: "Afizi",
      total_amount: "AC",
      products: "RM 100,000.00",
    },
    {
      search_criteria: "Crosshead",
      total_pages: "Husaini",
      total_company: "CA",
      unit_price: "RM 139,900.00",
      total_price: "RM 65,000.00",
      created_at: "2019-07-27T01:07:14Z",
      total: "Bore Pile",
      sst: "Afizi",
      total_amount: "AC",
      products: "RM 100,000.00",
    },
  ];

  // Form
  searchForm: FormGroup;
  searchField: FormGroup;
  addAppReqForm: FormGroup;
  editAppReqForm: FormGroup;

  // Data
  data: any[] = [];

  // Icons
  iconEmpty = "assets/img/default/shopping-bag.svg";

  // declare variable
  sum: number = 0;
  total: number = 0;
  totaldocument: number = 0;

  // Checker
  isEmpty: boolean = false;

  constructor(
    private fb: FormBuilder,
    private loadingBar: LoadingBarService,
    private cartsService: CbidCartsService,
    private modalService: BsModalService,
    private formBuilder: FormBuilder,
    private http: HttpClient,
    // private loadingBar: LoadingBarService,
    private router: Router,
    private _route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.cartsService.getAll().subscribe((res) => {
      this.listCart = res;
      this.listCart.forEach((lisz) => {
        this.total += lisz.total_price;
        this.totaldocument++;
      });
      // this.sum = this.total + 1.2;
      console.log(this.sum);

      // var keys = Object.keys(this.listCart);
      // var len = keys.length;
      // console.log(len);
    });
  }

  deleteApplicationData(row) {
    console.log(row);
    this.cartsService.delete(row).subscribe((res) => {
      // this.listEntity = res;
      // this.successAlert("Successfully delete entity.");
      window.location.reload();
    });
  }

  confirm(row) {
    swal
      .fire({
        title: "Confirmation",
        text: "Are you sure to delete this data ?",
        icon: "info",
        showCancelButton: true,
        buttonsStyling: false,
        confirmButtonText: "Confirm",
        customClass: {
          cancelButton: "btn btn-outline-primary ",
          confirmButton: "btn btn-primary ",
        },
      })
      .then(() => {
        this.deleteApplicationData(row);
      });
  }

  successAlert(task) {
    swal.fire({
      title: "Success",
      text: task,
      icon: "success",
      // showCancelButton: true,
      buttonsStyling: false,
      confirmButtonText: "Close",
      customClass: {
        cancelButton: "btn btn-outline-success",
        confirmButton: "btn btn-success ",
      },
    });
    console.log("confirm");
  }

  deleteCartData(row) {
    console.log(row);
    this.cartsService.delete(row).subscribe((res) => {
      // this.listEntity = res;
      // this.successAlert("Successfully delete entity.");
      window.location.reload();
    });
  }

  // getItems() {
  //   console.log("Item loaded");
  //   if (this.items.length > 0) {
  //     this.isEmpty = false;
  //   }
  // }

  makePayment() {
    this.loadingBar.start();
    this.loadingBar.complete();
  }

  remove() {
    console.log("Item removed");
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
      Object.assign({}, { class: "gray modal-lg" })
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
