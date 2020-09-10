import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";

export enum SelectionType {
  single = "single",
  multi = "multi",
  multiClick = "multiClick",
  cell = "cell",
  checkbox = "checkbox",
}

@Component({
  selector: "app-cbid",
  templateUrl: "./cbid.component.html",
  styleUrls: ["./cbid.component.scss"],
})
export class CbidComponent implements OnInit {
  clicked = false;

  // Table
  tableEntries: number = 5;
  tableSelected: any[] = [];
  tableTemp = [];
  tableActiveRow: any;
  tableRows: any[] = [];
  SelectionType = SelectionType;
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

  entriesChange($event) {
    this.tableEntries = $event.target.value;
  }

  filterTable($event) {
    let val = $event.target.value;
    this.tableTemp = this.tableRows.filter(function (d) {
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
