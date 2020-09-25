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
import { Router } from "@angular/router";

import { ProductsService } from "src/app/shared/services/products/products.service";
import { NgxSpinnerService } from "ngx-spinner";
import { Outfit } from "src/app/shared/services/outfits/outfits.model";
import { OutfitsService } from "src/app/shared/services/outfits/outfits.service";

// user service
import { UsersService } from "src/app/shared/services/users/users.service";
import { AuthService } from "src/app/shared/services/auth/auth.service";

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
  tableEntries: number = 10;
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
  userType: String;
  userID: String;
  userdetails: any;
  user_type = "PB";

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private productService: ProductsService,
    private spinner: NgxSpinnerService,
    private UsersService: UsersService,
    private outfitService: OutfitsService,
    private AuthService: AuthService
  ) {}

  ngOnInit(): void {
    if (this.AuthService.userID != undefined) {
      this.userType = this.AuthService.userType;
      this.userID = this.AuthService.userID;

      this.UsersService.getOne(this.userID).subscribe((res) => {
        this.userdetails = res;
        this.user_type = this.userdetails.user_type;
        if (this.userdetails.user_type == "EG") {
          this.showIcondiv == false;
        }

        console.log("se = ", this.userdetails);
        // console.log("Svc: ", this.tableRows);
      });
    }

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
    this.outfitService.getAll().subscribe(
      () => {
        this.outfits = this.outfitService.outfits;
        this.tableRows = this.outfits
        console.log(this.tableRows)
      },
      () => {},
      () => {
        this.tableTemp = this.tableRows.map((prop, key) => {
          return {
            ...prop,
            id_index: key+1
          };
        });
        console.log(this.tableTemp)
      }
    );
  }

  navigatePage(path: string, selectedHouse) {
    // console.log('Path: ', path)
    let extras = selectedHouse
    this.router.navigate([path], extras);
  }

  search() {
    // this.isEmpty = false
    // this.isGotResult = true
    
    this.spinner.show()
    // console.log(this.tableTemp.length)
    setTimeout(() => {
      this.spinner.hide()
      if (this.tableTemp.length >= 1) {
        this.isEmpty = false
        this.isGotResult = true
      }
      else {
        this.notFound()
      }
    }, 2000)
    // if (this.searchField == '') {

    // }
    // this.testService.getProducts(this.productForm.value).subscribe(
    //   {
    //     () => {},
    //     () => {},
    //     () => {}
    //   }
    // )
    // SINI
    // this.spinner.show();
    // console.log(this.productForm.value);
    // setTimeout(() => {
    //   this.spinner.hide();
    //   if (
    //     this.productForm.value.registration_number == "Pipeline Network" ||
    //     this.productForm.value.registration_number == "960536"
    //   ) {
    //     this.isGotResult = true;
    //     this.isEmpty = false;
    //   } else {
    //     this.notFound();
    //     // this.isGotResult = false;
    //     // this.isEmpty = true;
    //   }
    // }, 2000);

    // SINI habis
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
    let val = $event.target.value.toLowerCase();
    this.tableTemp = this.tableRows.filter(function(d) {
      // console.log(this.tableTemp)
      // console.log(d.name.toLowerCase().indexOf(val) !== -1 || !val)
      return d.name.toLowerCase().indexOf(val) !== -1 || !val;
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
