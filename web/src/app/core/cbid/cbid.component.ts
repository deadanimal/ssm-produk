import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";

@Component({
  selector: "app-cbid",
  templateUrl: "./cbid.component.html",
  styleUrls: ["./cbid.component.scss"],
})
export class CbidComponent implements OnInit {
  constructor(private router: Router) {}

  ngOnInit(): void {}

  navigatePage(path: string) {
    // console.log('Path: ', path)
    this.router.navigate([path]);
  }
}
