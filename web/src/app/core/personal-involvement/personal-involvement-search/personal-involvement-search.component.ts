import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";

@Component({
  selector: 'app-personal-involvement-search',
  templateUrl: './personal-involvement-search.component.html',
  styleUrls: ['./personal-involvement-search.component.scss']
})
export class PersonalInvolvementSearchComponent implements OnInit {

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

}
