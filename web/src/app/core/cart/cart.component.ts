import { Component, OnInit } from "@angular/core";
import { LoadingBarService } from "@ngx-loading-bar/core";
import { FormGroup, FormBuilder } from "@angular/forms";
import { Router } from "@angular/router";

const Items = [
  {
    id: "",
    noname: "Company Profile",
    product: "Financial Historical Comparison (2005 & 2019)",
    lang: "Bahasa English",
    price: 30.0,
    servicefee: 5.0,
    ctcservice: 5.0,
    discount: 0.0,
    totalprice: 40.0,
    isChecked: false,
  },
];

@Component({
  selector: "app-cart",
  templateUrl: "./cart.component.html",
  styleUrls: ["./cart.component.scss"],
})
export class CartComponent implements OnInit {
  // Form

  // Data
  items: any[] = [];

  // Icons
  iconEmpty = "assets/img/default/shopping-bag.svg";

  // Checker
  isEmpty: boolean = false;

  constructor(
    private fb: FormBuilder,
    private loadingBar: LoadingBarService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.items = Items;
  }

  getItems() {
    console.log("Item loaded");
    if (this.items.length > 0) {
      this.isEmpty = false;
    }
  }

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
}
