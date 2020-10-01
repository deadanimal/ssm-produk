import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import swal from "sweetalert2";

@Component({
  selector: 'app-product-search-custom',
  templateUrl: './product-search-custom.component.html',
  styleUrls: ['./product-search-custom.component.scss']
})
export class ProductSearchCustomComponent implements OnInit {

  // hide div summary request
  clicked = false;

  // Form
  entities = "rob";

  // Search
  focus;
  searchField: string = "";

  // Checker
  isEmpty;
  isNoResult = false;
  isGotResult;

  // Options
  searchOpts = [
    { text: "Audit Firm", value: "audit-firm" },
    { text: "Business", value: "business" },
    { text: "Company", value: "company" },
  ];

  data: any = [
    {
      idnum: "ROB",
      entities: "123123123",
      involvement: "Shareholder",
      created_at: "2019-07-27T01:07:14Z",
    },
    {
      idnum: "ROC",
      entities: "2342342423",
      involvement: "Business Ownership",
      created_at: "2019-07-27T01:07:14Z",
    },
  ];

  constructor(private router: Router) {}

  ngOnInit(): void {}

  navigatePage(path: string) {
    // console.log('Path: ', path)
    this.router.navigate([path]);
  }

  search() {
    this.isNoResult = true;
    // if (this.searchField == '') {

    // }
  }

  showSummary() {
    this.clicked = true;
  }

  confirm() {
    swal
      .fire({
        title: "Confirmation",
        text:
          "By requesting to proceed, RM20 processing fee will be charged. This Details Search is valid for 24 hours with maximum of 5 times search remaining.",
        icon: "info",
        showCancelButton: true,
        buttonsStyling: false,
        confirmButtonText: "Checkout",
        customClass: {
          cancelButton: "btn btn-outline-primary ",
          confirmButton: "btn btn-primary ",
        },
      })
      .then(() => {
        this.navigatePage("/checkout");
      });
  }

}
