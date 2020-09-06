import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import swal from "sweetalert2";

@Component({
  selector: "app-payment",
  templateUrl: "./payment.component.html",
  styleUrls: ["./payment.component.scss"],
})
export class PaymentComponent implements OnInit {
  constructor(private router: Router) {}

  ngOnInit(): void {}

  navigatePage(path: string) {
    // console.log('Path: ', path)
    this.router.navigate([path]);
  }

  makePayment() {
    swal
      .fire({
        title: "Success",
        text: "Payment successfully been made!",
        icon: "success",
        buttonsStyling: false,
        confirmButtonText: "Okay",
        customClass: {
          confirmButton: "btn btn-success ",
        },
      })
      .then((result) => {
        if (result.value) {
          this.router.navigate(["/orders"]);
        }
      });
    console.log("confirm");
  }
}
