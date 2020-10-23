import {
  Component,
  OnInit,
  OnDestroy,
  NgZone,
  TemplateRef,
} from "@angular/core";
import { User } from "src/assets/mock/admin-user/users.model";
import { MocksService } from "src/app/shared/services/mocks/mocks.service";

import * as moment from "moment";
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";
import { BsModalRef, BsModalService } from "ngx-bootstrap";
am4core.useTheme(am4themes_animated);

import swal from "sweetalert2";
import {
  FormGroup,
  FormBuilder,
  Validators,
  FormControl,
} from "@angular/forms";
import { ServicesService } from 'src/app/shared/services/services/services.service';
import { forkJoin } from 'rxjs';
import { QuotasService } from 'src/app/shared/services/quotas/quotas.service';
import { UsersService } from 'src/app/shared/services/users/users.service';
import { LoadingBarService } from '@ngx-loading-bar/core';

export enum SelectionType {
  single = "single",
  multi = "multi",
  multiClick = "multiClick",
  cell = "cell",
  checkbox = "checkbox",
}

import * as xlsx from 'xlsx';

@Component({
  selector: 'app-egov-user-management',
  templateUrl: './egov-user-management.component.html',
  styleUrls: ['./egov-user-management.component.scss']
})
export class EgovUserManagementComponent implements OnInit {

  // Data
  investigationRequests: any[] = []
  quotaRequests: any[] []
  egovRequests: any[] []
  tasks: any[] = []
  users: any[] = []
  usersTemp: any[] = []


  // Table
  tableEntries: number = 20
  tableSelected: any[] = []
  tableTemp = []
  tableActiveRow: any
  tableRows: any[] = []

  SelectionType = SelectionType

  // Checker
  isHidden = true

  constructor(
    private userService: UsersService,
    private serviceService: ServicesService,
    private loadingBar: LoadingBarService
  ) { 
    this.getData()
  }

  ngOnInit() {
  }

  getData() {
    this.loadingBar.start()
    this.serviceService.getEgovRequest().subscribe(
      (res) => {
        this.loadingBar.complete()
        this.usersTemp = res
        this.usersTemp.forEach(
          (user) => {
            if (user['egov_request'] == 'AP') {
              this.users.push(user)
              console.log(user)
            }
          }
        )
      },
      () => {
        this.loadingBar.complete()
      },
      () => {
        this.tableRows = this.users
        this.initTable()
      }
    )
  }

  initTable() {
    this.tableTemp = this.tableRows.map((prop, key) => {
      return {
        ...prop,
        id_index: key+1
      };
    });    
  }

  onSelect({ selected }) {
    this.tableSelected.splice(0, this.tableSelected.length);
    this.tableSelected.push(...selected);
  }

  onActivate(event) {
    this.tableActiveRow = event.row;
  } 

  entriesChange($event) {
    this.tableEntries = $event.target.value;
  }

  filterTable($event) {
    let val = $event.target.value.toLowerCase();
    // if (val) {
    //   this.tableTemp = this.tableRows.filter(function (d) {
    //     const keys = Object.keys(d);
    //     keys.forEach((key) => {
    //       console.log(key)
    //       if (d[key]) {
    //         console.log(d[key])
    //         return d[key].toString().toLowerCase().indexOf(val) !== -1 || !val;
    //       }
    //     });
    //   });
    // }
    // else {
    //   this.tableTemp = this.tableRows
    // } 
    this.tableTemp = this.tableRows.filter(function (d) {
      for (var key in d) {
        if (d[key]) {
          if (d[key].toString().toLowerCase().indexOf(val) !== -1) {
            return true;
          }
        }
      }
      return false;
    });
  }

  exportExcel() {
    let fileName = 'eGov_Report.xlsx'
    let element = document.getElementById('reportTable'); 
    const ws: xlsx.WorkSheet =xlsx.utils.table_to_sheet(element);

    /* generate workbook and add the worksheet */
    const wb: xlsx.WorkBook = xlsx.utils.book_new();
    xlsx.utils.book_append_sheet(wb, ws, 'Sheet1');

    /* save to file */
    xlsx.writeFile(wb, fileName);
  }

  exportCsv() {
    let fileName = 'eGov_Report.csv'
    let element = document.getElementById('reportTable'); 
    const ws: xlsx.WorkSheet =xlsx.utils.table_to_sheet(element);

    /* generate workbook and add the worksheet */
    const wb: xlsx.WorkBook = xlsx.utils.book_new();
    xlsx.utils.book_append_sheet(wb, ws, 'Sheet1');

    /* save to file */
    xlsx.writeFile(wb, fileName);
  }

}
