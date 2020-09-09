import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";

@Component({
  selector: "app-cbid",
  templateUrl: "./cbid.component.html",
  styleUrls: ["./cbid.component.scss"],
})
export class CbidComponent implements OnInit {
  clicked = false;

  data: any = [
    {
      name: "Registration Of Businesses (ROB)",
      type: "Statistics",
      amount: "10",
      created_at: "2019-07-27T01:07:14Z",
    },
    {
      name: "Registration Of Company (ROC)",
      type: "Listing",
      amount: "20",
      created_at: "2019-07-27T01:07:14Z",
    },
    {
      name: "Both",
      type: "Both",
      amount: "30",
      created_at: "2019-07-27T01:07:14Z",
    },
  ];

  constructor(private router: Router) {}

  ngOnInit(): void {}

  navigatePage(path: string) {
    // console.log('Path: ', path)
    this.router.navigate([path]);
  }

  showSummary() {
    this.clicked = true;
  }
}
