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

export enum SelectionType {
  single = "single",
  multi = "multi",
  multiClick = "multiClick",
  cell = "cell",
  checkbox = "checkbox",
}
import { LoadingBarService } from "@ngx-loading-bar/core";

// entity
import { CbidTicket } from "src/app/shared/services/cbid-tickets/cbid-tickets.model";
import { CbidTicketsService } from "src/app/shared/services/cbid-tickets/cbid-tickets.service";

// fill form
import { FillForm } from "src/app/shared/services/fill_form/fill_form.model";
import { FillFormsService } from "src/app/shared/services/fill_form/fill_form.service";

// cart service
import { CbidCart } from "src/app/shared/services/cbid-carts/cbid-carts.model";
import { CbidCartsService } from "src/app/shared/services/cbid-carts/cbid-carts.service";

@Component({
  selector: "app-cbid",
  templateUrl: "./cbid.component.html",
  styleUrls: ["./cbid.component.scss"],
})
export class CbidComponent implements OnInit {
  clicked = false;

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
  listProject: any;
  listEntity: any;
  listProduct: any;
  // Form
  searchForm: FormGroup;
  searchField: FormGroup;
  addAppReqForm: FormGroup;
  editAppReqForm: FormGroup;
  addCartForm: FormGroup;

  constructor(
    private entityService: CbidTicketsService,
    private cartsService: CbidCartsService,
    private fb: FormBuilder,
    private loadingBar: LoadingBarService,
    private modalService: BsModalService,
    private formBuilder: FormBuilder,
    private http: HttpClient,
    private router: Router,
    private _route: ActivatedRoute
  ) {
    this.getEntity();
  }

  getEntity() {
    this.entityService.getAll().subscribe((res) => {
      this.listEntity = res;
      var keys = Object.keys(this.listEntity);
      var len = keys.length;
      console.log(len);
      if (len == 0) {
        this.clicked = false;
      } else {
        this.clicked = true;
      }
      console.log("data = ", this.listProject);
    });
  }

  ngOnInit(): void {
    this.addAppReqForm = this.formBuilder.group({
      entity_type: new FormControl("ROB"),
      product_type: new FormControl("BT"),
      requestor: new FormControl("426adae9-1921-4960-afc6-935efd788db4"),
    });

    this.addCartForm = this.formBuilder.group({
      // search_criteria: new FormControl(""),
      // total_pages: new FormControl(""),
      // total_company: new FormControl(""),
      // unit_price: new FormControl(""),
      // total_price: new FormControl(""),
      // total: new FormControl(""),
      // sst: new FormControl(""),
      // total_amount: new FormControl(""),
      products: new FormControl(""),
    });
  }

  newApplicationData() {
    // console.log(this.addAppReqForm.value);
    this.entityService.create(this.addAppReqForm.value).subscribe(
      (res) => {
        this.listEntity = res;
        console.log(res);
        // console.log(res.id);
        // this.successAlert("Successfully add entity.");
        // window.location.reload();
        // console.log("data = ", this.listEntity);
        if (this.listEntity) {
          this.addCartForm.value.products =
            "d7abf307-4cf2-4fb9-a373-9d36d3ce7f4f";
          console.log("addCartForm = ", this.addCartForm.value);
          this.cartsService.create(this.addCartForm.value).subscribe(() => {
            this.successAlert("Successfully add entity.");
            // window.location.reload();
            this.getEntity();
          });
        }
      },
      () => {
        // Activityed
        // this.isLoading = false
        // this.successMessage();
        // this.errorAlert("edit");
      }
    );
  }

  deleteApplicationData(row) {
    console.log(row);
    this.entityService.delete(row).subscribe((res) => {
      // this.listEntity = res;
      this.successAlert("Successfully delete entity.");
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

  navigatePage(path: string) {
    this.router.navigate([path]);
  }

  showSummary() {
    this.clicked = true;
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
}
