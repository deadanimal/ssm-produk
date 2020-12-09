import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoadingBarService } from '@ngx-loading-bar/core';
import { ServicesService } from '../../../../shared/services/services/services.service';
// import { ExportAsService, ExportAsConfig } from 'ngx-export-as';

import * as moment from 'moment';
import * as xlsx from 'xlsx';
import * as pdfMake from "pdfmake/build/pdfmake";
import * as pdfFonts from 'pdfmake/build/vfs_fonts';
//import { number } from '@amcharts/amcharts4/core';

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

  // // Export
  // exportAsPDF: ExportAsConfig = {
  //   type: 'pdf', // the type you want to download
  //   elementIdOrContent: 'reportTable1', // the id of html/table element
  // }
  // exportAsExcel: ExportAsConfig = {
  //   type: 'xlsx', // the type you want to download
  //   elementIdOrContent: 'reportTable', // the id of html/table element
  // }
  // exportAsCSV: ExportAsConfig = {
  //   type: 'csv', // the type you want to download
  //   elementIdOrContent: 'reportTable', // the id of html/table element
  // }

  // Checker
  isHidden = true

  constructor(
    private loadingBar: LoadingBarService,
    private router: Router,
    private servicesService: ServicesService,
    // private exportService: ExportAsService
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

  filterTable($event, type) {
    let val = $event.target.value.toLowerCase();
    if (type == 'reference') {
      console.log(val)
      this.tableTemp = this.tableRows.filter(function(d) {
        return d.reference_id.toLowerCase().indexOf(val) !== -1 || !val;
      });
    }
    else if (type == 'pic') {
      if (val) {
        this.tableTemp = []
        this.tableRows.forEach(
          (item) => {
            if (
              item['completed']
            ) {
              this.tableTemp.push(item)
            }
          }
        )
      }
      else {
        this.tableTemp = this.tableRows.filter(function(d) {
          return d.reference_id.toLowerCase().indexOf(val) !== -1 || !val;
        });
      }
    }
    else if (type == 'status') {
      if (val == 'cm') {
        let valNew = true
        this.tableTemp = []
        this.tableRows.forEach(
          (item) => {
            if (
              item['pending'] &&
              item['in_progress'] &&
              item['completed']
            ) {
              this.tableTemp.push(item)
            }
          }
        )
      }
      else if (val == 'ip') {
        let valNew = true
        this.tableTemp = []
        this.tableRows.forEach(
          (item) => {
            if (
              item['pending'] &&
              item['in_progress'] &&
              !item['completed']
            ) {
              this.tableTemp.push(item)
            }
          }
        )
      }
      else if (val == 'pd') {
        let valNew = true
        this.tableTemp = []
        this.tableRows.forEach(
          (item) => {
            if (
              item['pending'] &&
              !item['in_progress'] &&
              !item['completed']
            ) {
              this.tableTemp.push(item)
            }
          }
        )
      }
      else {
        this.tableTemp = this.tableRows
      }
    }
    else if (type == 'date') {
      console.log(val)
      let newVal = val
      if (val) {
        newVal = moment(val, 'YYYY-MM-DD').format('DD/MM/YYYY')
      }
      this.tableTemp = this.tableRows.filter(function(d) {
        return d.created_date.toLowerCase().indexOf(newVal) !== -1 || !newVal;
      });
    }
  }

  filterTableAll($event) {
    let val = $event.target.value.toLowerCase();
    this.tableTemp = this.tableRows.filter(function (d) {
      for (var key in d) {
        if (d[key]?.toString().toLowerCase().indexOf(val) !== -1 || !val) {
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

  export(type: string) {
    if (type == 'pdf') {
        
        var rows = [];

        rows.push(['ReferenceID', 'ReceiptNo', 'Name','Organisation','ApplicationDate', 'Amount(RM)', 'PhoneNo','Status', 'StatusUpdateDate','PIC','Remarks']);

        this.tableTemp.forEach((x) => {
              let temp_servicefee = (x.service.fee/100).toFixed(2);
              var temp_status = "";
              if (x.pending && !x.in_progress && !x.completed){
                  temp_status = "Pending";
              }else if (x.pending && x.in_progress && !x.completed){
                  temp_status = "In Progress";
              }else if (x.pending && x.in_progress && x.completed){
                  temp_status = "Completed";
              }
                
              var temp_pic = "";

              if (!x.completed){
                  temp_pic = "NA";
              }else if (x.completed){
                  temp_pic = "Ali Imran";
              }
              
              rows.push([x.reference_id,x.receipt_no,x.name,x.organisation,x.created_date,temp_servicefee,x.phone_number?x.phone_number:"",temp_status,x.modified_date,temp_pic,x.remarks]);

        });
        
        var dd = {
          content: [           
            {
              table: {
                widths: ['10%', '10%', '10%', '10%','10%','10%','10%','10%','10%','5%','5%'],
                body: rows
              }
            },],
            defaultStyle: {
              fontSize: 7,
            }};
          (<any>pdfMake).vfs = pdfFonts.pdfMake.vfs;
          pdfMake.createPdf(dd).download("cbid");
    }
    // else if (type == 'excel') {
    //   this.exportService.save(this.exportAsExcel, 'SSM_Portal_CBID_Report').subscribe(
    //     // Something
    //   )
    // }
    // else if (type == 'csv') {
    //   this.exportService.save(this.exportAsCSV, 'SSM_Portal_CBID_Report').subscribe(
    //     // Something
    //   )
    // }
  }

  exportExcel() {
    let fileName = 'CBID_Report.xlsx'
    let element = document.getElementById('reportTable'); 
    const ws: xlsx.WorkSheet =xlsx.utils.table_to_sheet(element);

    /* generate workbook and add the worksheet */
    const wb: xlsx.WorkBook = xlsx.utils.book_new();
    xlsx.utils.book_append_sheet(wb, ws, 'Sheet1');

    /* save to file */
    xlsx.writeFile(wb, fileName);
  }

  exportCsv() {
    let fileName = 'CBID_Report.csv'
    let element = document.getElementById('reportTable'); 
    const ws: xlsx.WorkSheet =xlsx.utils.table_to_sheet(element);

    /* generate workbook and add the worksheet */
    const wb: xlsx.WorkBook = xlsx.utils.book_new();
    xlsx.utils.book_append_sheet(wb, ws, 'Sheet1');

    /* save to file */
    xlsx.writeFile(wb, fileName);
  }

}
