import {
  Component,
  OnInit,
  OnDestroy,
  NgZone,
  TemplateRef,
} from "@angular/core";
import { BsModalRef, BsModalService } from "ngx-bootstrap";
import {
  FormGroup,
  FormBuilder,
  Validators,
  FormControl,
} from "@angular/forms";
import swal from "sweetalert2";
import { AuthService } from "src/app/shared/services/auth/auth.service";
import { Router } from "@angular/router";

import { ProductsService } from "src/app/shared/services/products/products.service";
import { NgxSpinnerService } from "ngx-spinner";
import { Outfit } from "src/app/shared/services/outfits/outfits.model";
import { OutfitsService } from "src/app/shared/services/outfits/outfits.service";

// user service
import { UsersService } from "src/app/shared/services/users/users.service";

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
  // Data
  outfits: Outfit[] = [];

  // Table
  tableEntries: number = 5;
  tableSelected: any[] = [];
  tableTemp = [];
  tableActiveRow: any;
  tableRows: Outfit[] = [];
  SelectionType = SelectionType;

  // Search field
  focus;
  searchField: string = "";
  searchResult: Outfit[] = [];

  // Checker
  isEmpty = true;
  isNoResult = false;
  isGotResult = false;
  showIcondiv = true;

  // Form
  productForm: FormGroup;
  newIdentityForm: FormGroup;

  // Data
  searchResults: any[] = [];
  pdfProduct: any;

  // slider
  slider1 = "assets/img/banner/banner portal-01.png";
  slider2 = "assets/img/banner/banner portal-02.png";
  slider3 = "assets/img/banner/banner portal-03.png";
  slider4 = "assets/img/banner/banner portal-04.png";

  /// hardcode user
  userid = "8695666e-166e-4812-a8fd-83c958d3efd7";
  userdetails: any;
  user_type = "PB";

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private productService: ProductsService,
    private spinner: NgxSpinnerService,
    private UsersService: UsersService,
    private outfitService: OutfitsService
  ) {}

  ngOnInit(): void {
    this.UsersService.getOne(this.userid).subscribe((res) => {
      this.userdetails = res;
      this.user_type = this.userdetails.user_type;
      if (this.userdetails.user_type == "EG") {
        this.showIcondiv == false;
      }

      console.log("data = ", this.userdetails.user_type);
      // console.log("Svc: ", this.tableRows);
    });

    this.productForm = this.fb.group({
      name: new FormControl("getCompProfile"),
      registration_number: new FormControl(
        "",
        Validators.compose([Validators.required])
      ),
    });
    this.newIdentityForm = this.fb.group({
      name: new FormControl("getNewFormatEntity"),
      registration_number: new FormControl(
        "",
        Validators.compose([Validators.required])
      ),
    });
    this.outfitService.getAll().subscribe(() => {
      this.outfits = this.outfitService.outfits;
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
    console.log(this.productForm.value);
    setTimeout(() => {
      this.spinner.hide();
      if (
        this.productForm.value.registration_number == "Pipeline Network" ||
        this.productForm.value.registration_number == "960536"
      ) {
        this.isGotResult = true;
        this.isEmpty = false;
      } else {
        this.notFound();
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
    // this.newIdentityForm.value['registration_number'] = this.productForm.value.registration_number
    // forkJoin(
    //   this.productService.search(this.productForm.value),
    //   this.productService.search(this.newIdentityForm.value)
    // ).subscribe(
    //   (res) => {
    //     console.log(res)
    //   }
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

  notFound() {
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
    this.tableTemp = this.outfits.filter(function (d) {
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
