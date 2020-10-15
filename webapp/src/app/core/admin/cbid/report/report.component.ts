import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { LoadingBarService } from '@ngx-loading-bar/core';

import { ServicesService } from '../../../../shared/services/services/services.service';

import * as moment from 'moment';

export enum SelectionType {
  single = "single",
  multi = "multi",
  multiClick = "multiClick",
  cell = "cell",
  checkbox = "checkbox",
}

@Component({
  selector: "app-report",
  templateUrl: "./report.component.html",
  styleUrls: ["./report.component.scss"],
})
export class CbidReportComponent implements OnInit {
  
  // Table
  tableEntries: number = 10;
  tableSelected: any[] = [];
  tableTemp = [];
  tableActiveRow: any;
  tableRows: any[] = [];
  SelectionType = SelectionType;
  requestList: any;

  constructor(
    private loadingBar: LoadingBarService,
    private router: Router,
    private servicesService: ServicesService,
  ) {

  }

  ngOnInit() {
    this.initData()
  }

  initData() {
    this.loadingBar.start()
    this.servicesService.getAll().subscribe(
      (res) => {
        this.tableRows = res;
        this.tableRows.forEach(
          (row) => {
            this.loadingBar.complete()
            let unix_ = moment(row['created_date']).format('x')
            let year = (moment(row['created_date']).year()).toString()
            let month = (moment(row['created_date']).month() + 1).toString()
            let day = (moment(row['created_date']).date()).toString()
            row['reference_id'] = 'CBID' + year + month + day + unix_.slice(6,12)
            row['receipt_no'] = 'SSMB' + year + month + day + unix_.slice(6,12)
            
            if(row.in_progress) {
              row.in_progress_date = moment(row.in_progress_date).format('DD/MM/YYYY')
            }

            if(row.completed) {
              row.completed_date = moment(row.completed_date).format('DD/MM/YYYY')
            }

            if(row.created_date) {
              row.created_date = moment(row.created_date).format('DD/MM/YYYY')
            }

            if(row.modified_date) {
              row.modified_date = moment(row.modified_date).format('DD/MM/YYYY')
            }
          },
          () => {
            this.loadingBar.complete()
          }
        )        
      },
      (err) => {

      },
      () => {
        this.tableTemp = this.tableRows.map((prop, key) => {
          return {
            ...prop,
            id_index: key+1
          };
        });        
        console.log(this.tableTemp)
      }
    )
  }

  entriesChange($event) {
    this.tableEntries = $event.target.value;
  }

  filterTable($event) {
    let val = $event.target.value.toLowerCase();
    this.tableTemp = this.tableRows.filter(function(d) {
      return d.title.toLowerCase().indexOf(val) ! == -1 || !val;
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
