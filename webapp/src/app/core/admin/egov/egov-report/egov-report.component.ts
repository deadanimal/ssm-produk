import { Component, OnInit } from '@angular/core';
import { LoadingBarService } from '@ngx-loading-bar/core';
import { ServicesService } from '../../../../shared/services/services/services.service';
import * as moment from 'moment';
import * as xlsx from 'xlsx';
import * as pdfMake from "pdfmake/build/pdfmake";
import * as pdfFonts from 'pdfmake/build/vfs_fonts';

@Component({
  selector: 'app-egov-report',
  templateUrl: './egov-report.component.html',
  styleUrls: ['./egov-report.component.scss']
})
export class EgovReportComponent implements OnInit {
  reportTitle: any;
  fromDate: any;
  toDate: any;
  specificDateLabel: any;
  baseTitle: any;
  report_type: string;
  valid_r: number;
  valid_fd: number;
  valid_td: number;
  tableEntries: number = 10;
  tableSelected: any[] = [];
  tableTemp = [];
  tableActiveRow: any;
  tableRows: any[] = [];
  requestList: any;
  loadingBars: boolean;
  isHidden = true;

  constructor(private servicesService: ServicesService,private loadingBar: LoadingBarService,) {
  }

  ngOnInit() {
    this.initData()
  }

  initData() {
        this.reportTitle = "";      
  }

  onSelect({ selected }) {
    this.tableSelected.splice(0, this.tableSelected.length);
    this.tableSelected.push(...selected);
  }

  onActivate(event) {
    this.tableActiveRow = event.row;
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

  runQuery(){
      if(this.valid_r == 1 && this.valid_fd == 1 && this.valid_td == 1){
        this.loadingBars = true;
        this.servicesService.getEgovReport(this.report_type).subscribe(
          (res) => {            
            res = [{
                "year": "2019",
                "items": [
                      {
                        "month": "Jan",
                        "weekly": [
                           {
                              "week": "M1",
                              "agency": 199,
                              "pakej1": 140,
                              "pakej2": 225,
                              "pakej3": 310,
                              "pakej4": 450
                           },
                           {
                            "week": "M2",
                            "agency": 199,
                            "pakej1": 140,
                            "pakej2": 225,
                            "pakej3": 310,
                            "pakej4": 450
                         },
                         {
                          "week": "M3",
                          "agency": 199,
                          "pakej1": 140,
                          "pakej2": 225,
                          "pakej3": 310,
                          "pakej4": 450
                       },
                       {
                        "week": "M4",
                        "agency": 199,
                        "pakej1": 140,
                        "pakej2": 225,
                        "pakej3": 310,
                        "pakej4": 450
                     }

                        ]
                      },{
                        "month": "Feb",
                        "weekly": [
                           {
                              "week": "M1",
                              "agency": 299,
                              "pakej1": 340,
                              "pakej2": 245,
                              "pakej3": 120,
                              "pakej4": 250
                           },
                           {
                            "week": "M2",
                            "agency": 1199,
                            "pakej1": 1420,
                            "pakej2": 2235,
                            "pakej3": 3410,
                            "pakej4": 4150
                         },
                         {
                          "week": "M3",
                          "agency": 1991,
                          "pakej1": 1402,
                          "pakej2": 2253,
                          "pakej3": 3104,
                          "pakej4": 4504
                       },
                       {
                        "week": "M4",
                        "agency": 199,
                        "pakej1": 140,
                        "pakej2": 225,
                        "pakej3": 310,
                        "pakej4": 450
                     }

                        ]
                      }
                ]
              },{
                "year": "2020",
                "items": [
                      {
                        "month": "Jan",
                        "weekly": [
                           {
                              "week": "M1",
                              "agency": 199,
                              "pakej1": 140,
                              "pakej2": 225,
                              "pakej3": 310,
                              "pakej4": 450
                           },
                           {
                            "week": "M2",
                            "agency": 199,
                            "pakej1": 140,
                            "pakej2": 225,
                            "pakej3": 310,
                            "pakej4": 450
                         },
                         {
                          "week": "M3",
                          "agency": 199,
                          "pakej1": 140,
                          "pakej2": 225,
                          "pakej3": 310,
                          "pakej4": 450
                       },
                       {
                        "week": "M4",
                        "agency": 199,
                        "pakej1": 140,
                        "pakej2": 225,
                        "pakej3": 310,
                        "pakej4": 450
                     }

                        ]
                      }
                ]
              }
            ];
            var total_total = 0;
            var agency_total = 0;
            var p1 = 0;
            var p2 = 0;
            var p3 = 0;
            var p4 = 0;
            res.forEach(element => {
                var tempArr = [];
                var not_first = 0;
           
               
                tempArr.push(element.year);
                element.items.forEach(element2 => {
                    var tempArr2;
                    var not_firstv2 = 0;

                    if (not_first == 0){
                      tempArr2 = [...tempArr]; 
                      not_first = 1;
                    }else{
                      tempArr2 = [""];
                    }
                    tempArr2.push(element2.month);                    
                    
                    element2.weekly.forEach(element3 => {
                        var tempArr3;
                        if (not_firstv2 == 0){
                          tempArr3 = [...tempArr2];
                          not_firstv2 = 1;
                        }else{
                          tempArr3 = ["",""];
                        }
                        var temp_total = element3.pakej1 + element3.pakej2 + element3.pakej3 + element3.pakej4;
                        total_total = total_total + temp_total;
                        agency_total = agency_total + element3.agency;
                        p1 = p1 + element3.pakej1;
                        p2 = p2 + element3.pakej2;
                        p3 = p3 + element3.pakej3;
                        p4 = p4 + element3.pakej4;                        
                        
                        tempArr3.push(element3.week,element3.agency,element3.pakej1,element3.pakej2,element3.pakej3,element3.pakej4,temp_total);                      
                      
                        this.tableRows.push(tempArr3);

                      });

                });
                
                
            });
            this.tableRows.push(["JUMLAH","","",agency_total,p1,p2,p3,p4,total_total]);

            this.loadingBars = false;
           
            
          },
          (err) => {
    
          },
          () => {
            // this.tableTemp = this.tableRows.map((prop, key) => {
            //   return {
            //     ...prop,
            //     id_index: key+1
            //   };
            // });
            this.tableTemp = this.tableRows;      
            console.log(this.tableTemp)
         });
      }
  }

  filterTable($event, type) {
    let val = $event.target.value.toLowerCase();
    if (type == 'reportType') {
      //console.log(val)
        this.valid_r = 1;
      if (val == "access_statistics"){
        this.reportTitle = "Statistik Akses eGOV Yang Telah Diluluskan Mengikut Pakej";
      }
      if (val == "usage_statistics"){
        this.reportTitle = "Statistik Penggunaan KJAKP Mengikut Pakej";
      }
      if (val == "total_statistics"){
        this.reportTitle = "Statistik KJAKP Mengikut Pakej & Penggunaan";
      }
      if (val == ""){
        this.valid_r = 0;
      }
      this.report_type = val;
      this.baseTitle = this.reportTitle;
      this.generateLabel();
      this.runQuery();
      // this.tableTemp = this.tableRows.filter(function(d) {
      //   return d.reference_id.toLowerCase().indexOf(val) !== -1 || !val;
      // });
    }
    else if (type == 'fromdate') {
        
        let newVal = val
        this.valid_fd = 0;
        if (val) {
          newVal = moment(val, 'YYYY-MM-DD').format('DD/MM/YYYY')
          this.fromDate = newVal;
          this.valid_fd = 1;
        }
        document.getElementById("enddate").setAttribute("min", val);
        this.generateLabel();
        this.runQuery();
      
        // this.tableTemp = this.tableRows.filter(function(d) {
        //   return d.created_date.toLowerCase().indexOf(newVal) !== -1 || !newVal;
        // });
    }
    else if (type == 'todate') {
        
      let newVal = val
      this.valid_td = 0;
      if (val) {
        newVal = moment(val, 'YYYY-MM-DD').format('DD/MM/YYYY')
        this.toDate = newVal;
        this.valid_td = 1;
      }
      document.getElementById("startdate").setAttribute("max", val);
      this.generateLabel();
      this.runQuery();
      // this.tableTemp = this.tableRows.filter(function(d) {
      //   return d.created_date.toLowerCase().indexOf(newVal) !== -1 || !newVal;
      // });

   }
    
  }

  exportCsv() {
    let fileName = 'eGov_report.csv'
    let element = document.getElementById('reportTable'); 
    const ws: xlsx.WorkSheet =xlsx.utils.table_to_sheet(element);

    /* generate workbook and add the worksheet */
    const wb: xlsx.WorkBook = xlsx.utils.book_new();
    xlsx.utils.book_append_sheet(wb, ws, 'Sheet1');

    /* save to file */
    xlsx.writeFile(wb, fileName);
  }

  export(type: string) {
    if (type == 'pdf') {
        
        var rows = [];
        
        rows.push(['Tahun', 'Bulan', 'Minggu','Agensi','Pakej 1', 'Pakej 2', 'Pakej 3','Pakej 4', 'Jumlah']);

        this.tableTemp.forEach((x) => {
              
              console.log(x);
              
              rows.push([x[0],x[1],x[2],x[3],x[4],x[5],x[6],x[7],x[8]]);

        });
        
        var dd = {
      
          content: [  
            this.reportTitle, 
            " ",     
            {              
              table: {
                widths: ['10%', '10%', '10%', '10%','10%','10%','10%','10%','10%'],
                body: rows
              }
            },],
            defaultStyle: {
              fontSize: 8,
            }};
          (<any>pdfMake).vfs = pdfFonts.pdfMake.vfs;
          pdfMake.createPdf(dd).download("egov-report");
    }
  }

  generateLabel(){
      
        let splitted = this.fromDate.split("/");
        let fromMonth = this.getMonth(splitted[1]);
        splitted = this.toDate.split("/");
        let toMonth = this.getMonth(splitted[1]);
       
        if (fromMonth == toMonth && this.fromDate.split("/")[2] != this.toDate.split("/")[2]){
          this.specificDateLabel = "Bulan " + fromMonth + " " + this.fromDate.split("/")[2] + " - " + this.toDate.split("/")[2]; 
        } 
        else if (fromMonth == toMonth){
          this.specificDateLabel = "Bulan " + fromMonth + " " + splitted[2]; 
        }
        else {
          this.specificDateLabel = "Bulan " + fromMonth + " " + this.fromDate.split("/")[2] + " Hingga " + toMonth + " " + this.toDate.split("/")[2]; 
        }

        if (this.reportTitle != ""){
           this.reportTitle  = this.baseTitle + " " + this.specificDateLabel; 
        }
  } //generate function

  getMonth(month){
        switch(month) { 
          case "01": {                   
            return "Jan"             
          } 
          case "02": { 
            return "Feb"
          }
          case "03": { 
            return "Mac"
          }
          case "04": { 
            return "Apr"             
          }
          case "05": { 
            return "Mei"
          } 
          case "06": { 
            return "Jun" 
          }
          case "07": { 
            return "Jul"
          }
          case "08": { 
            return "Ogos"
          }
          case "09": { 
            return "Sep"
          }    
          case "10": { 
            return "Okt"
          }    
          case "11": { 
            return "Nov" 
          }    
          case "12": { 
            return "Dec"
          }         

      } 
  }

}
