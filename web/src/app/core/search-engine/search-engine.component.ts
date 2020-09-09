import {
  Component,
  OnInit,
  OnDestroy,
  NgZone,
  TemplateRef,
} from "@angular/core";
// import { AuditData } from 'src/assets/mock/admin-audit/audit.data.json'
// import * as moment from "moment";
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";
am4core.useTheme(am4themes_animated);

//
import { HttpClient } from "@angular/common/http";
import { environment } from "src/environments/environment";
import { BsModalRef, BsModalService } from "ngx-bootstrap";
import {
  FormGroup,
  FormBuilder,
  Validators,
  FormControl,
} from "@angular/forms";
import swal from "sweetalert2";
import { LoadingBarService } from "@ngx-loading-bar/core";
import { AuthService } from "src/app/shared/services/auth/auth.service";
import { NotifyService } from "src/app/shared/handler/notify/notify.service";
import { Router, ActivatedRoute } from "@angular/router";

import { ProductsService } from "src/app/shared/services/products/products.service";
import { NgxSpinnerService } from "ngx-spinner";

export enum SelectionType {
  single = "single",
  multi = "multi",
  multiClick = "multiClick",
  cell = "cell",
  checkbox = "checkbox",
}
@Component({
  selector: "app-search-engine",
  templateUrl: "./search-engine.component.html",
  styleUrls: ["./search-engine.component.scss"],
})
export class SearchEngineComponent implements OnInit {
  view = {
    isVisible: true,
    // title: "hello 🤔",
    // dateRangeText: "date RangeText 🔥🔥",
    // data: "data ⚡",
  };

  // Table
  tableEntries: number = 5;
  tableSelected: any[] = [];
  tableTemp = [];
  tableActiveRow: any;
  tableRows: any[] = [];
  SelectionType = SelectionType;
  dataSearch: any = [
    {
      id: "1231231311233123",
      name: "DUET & PIPE SYSTEM ENGINEERING SDN BHD",
      entity: "Company",
    },
    {
      id: "1231231311233123",
      name: "DUET & PIPE SYSTEM ENGINEERING SDN BHD",
      entity: "Company",
    },
    {
      id: "1231231311233123",
      name: "DUET & PIPE SYSTEM ENGINEERING SDN BHD",
      entity: "Company",
    },
    {
      id: "1231231311233123",
      name: "DUET & PIPE SYSTEM ENGINEERING SDN BHD",
      entity: "Company",
    },
    {
      id: "1231231311233123",
      name: "DUET & PIPE SYSTEM ENGINEERING SDN BHD",
      entity: "Company",
    },
    {
      id: "1231231311233123",
      name: "DUET & PIPE SYSTEM ENGINEERING SDN BHD",
      entity: "Company",
    },
    {
      id: "1231231311233123",
      name: "DUET & PIPE SYSTEM ENGINEERING SDN BHD",
      entity: "Company",
    },
  ];

  // Search field
  focus;
  searchField: string = "";

  // Checker
  isEmpty = true;
  isNoResult = false;
  isGotResult = false;

  // Form
  productForm: FormGroup;

  // Data
  searchResults: any[] = [];
  pdfProduct: any;

  // slider
  slider1 = "assets/img/banner/banner portal-01.png";
  slider2 = "assets/img/banner/banner portal-02.png";
  slider3 = "assets/img/banner/banner portal-03.png";
  slider4 = "assets/img/banner/banner portal-04.png";

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private productService: ProductsService,
    private spinner: NgxSpinnerService
  ) {}

  ngOnInit(): void {
    this.productForm = this.fb.group({
      name: new FormControl("getCompProfile"),
      registration_number: new FormControl(
        "",
        Validators.compose([Validators.required])
      ),
    });
  }

  navigatePage(path: string) {
    // console.log('Path: ', path)
    this.router.navigate([path]);
  }

  search() {
    // if (this.searchField == '') {

    // }
    // this.testService.getProducts(this.productForm.value).subscribe(
    //   {
    //     () => {},
    //     () => {},
    //     () => {}
    //   }
    // )
    this.spinner.show();
    console.log(this.productForm.value.registration_number);
    setTimeout(() => {
      this.spinner.hide();
      if (
        this.productForm.value.registration_number == "Pipeline Network" ||
        this.productForm.value.registration_number == "960536"
      ) {
        this.isGotResult = true;
        this.isEmpty = false;
      } else {
        this.confirm();
        // this.isGotResult = false;
        // this.isEmpty = true;
      }
    }, 2000);
    // this.productService.search(this.productForm.value).subscribe(
    //   (res) => {
    //     this.spinner.hide();
    //     this.searchResults = this.productService.product
    //     this.isEmpty = false
    //     if (!res) {
    //       this.isNoResult = true

    //     }
    //     else if (res) {
    //       this.isGotResult = true
    //     }
    //   },
    //   (err) => {
    //     this.spinner.hide();
    //     console.log(err)
    //   },
    //   () => {}
    // )
  }

  viewResult() {
    console.log("View result");
    this.router.navigate(["/product-listing"]);
  }

  getPDF() {
    let hello = {
      test: this.searchResults,
    };
    console.log(hello);
    this.spinner.show();
    this.productService.getPDF(hello).subscribe(
      (res) => {
        this.spinner.hide();
        window.open(res, "_blank");
      },
      () => {
        this.spinner.hide();
      },
      () => {}
    );
  }

  confirm() {
    swal.fire({
      title: "Warning",
      text:
        "No entites found. For further search please insert company / business number without check digit and choose the entity type company / business from the dropdown list search box.",
      icon: "warning",
      // showCancelButton: true,
      buttonsStyling: false,
      confirmButtonText: "Close",
      customClass: {
        cancelButton: "btn btn-outline-warning ",
        confirmButton: "btn btn-warning ",
      },
    });
  }

  successAlert() {
    swal.fire({
      title: "Success",
      text: "Successfully export file.",
      icon: "success",
      // showCancelButton: true,
      buttonsStyling: false,
      confirmButtonText: "Close",
      customClass: {
        cancelButton: "btn btn-outline-success ",
        confirmButton: "btn btn-success ",
      },
    });
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
