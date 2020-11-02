import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import Swal from 'sweetalert2';

export enum SelectionType {
  single = 'single',
  multi = 'multi',
  multiClick = 'multiClick',
  cell = 'cell',
  checkbox = 'checkbox',
}

@Component({
  selector: 'app-product-custom-data-package-b',
  templateUrl: './product-custom-data-package-b.component.html',
  styleUrls: ['./product-custom-data-package-b.component.scss']
})
export class ProductCustomDataPackageBComponent implements OnInit {

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

  // Table
  tableEntries: number = 10
  tableSelected: any[] = []
  tableTemp = []
  tableActiveRow: any
  tableRows: any[] = []
  SelectionType = SelectionType
  tableMessages = {
    // Message to show when array is presented
    // but contains no values
    emptyMessage: 'Empty search',
  
    // Footer total message
    totalMessage: '',
  
    // Footer selected message
    selectedMessage: 'selected'
  }
  tableResults: any[] = []

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

  }

}
