import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";

@Component({
  selector: "app-customized-data",
  templateUrl: "./customized-data.component.html",
  styleUrls: ["./customized-data.component.scss"],
})
export class CustomizedDataComponent implements OnInit {
  constructor(private router: Router) {}

  ngOnInit(): void {}

  navigatePage(path: string) {
    // console.log('Path: ', path)
    this.router.navigate([path]);
  }
}
