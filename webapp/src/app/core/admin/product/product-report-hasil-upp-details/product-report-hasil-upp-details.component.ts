import { Component, OnInit, NgZone, OnDestroy } from '@angular/core';
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import * as am4maps from "@amcharts/amcharts4/maps";
import am4geodata_continentsLow from "@amcharts/amcharts4-geodata/continentsLow";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";
import * as xlsx from 'xlsx';
import * as moment from 'moment';

import { ProductsService } from '../../../../shared/services/products/products.service';

@Component({
  selector: 'app-product-report-hasil-upp-details',
  templateUrl: './product-report-hasil-upp-details.component.html',
  styleUrls: ['./product-report-hasil-upp-details.component.scss']
})
export class ProductReportHasilUppDetailsComponent implements OnInit {

  // Image 
  imgConstruction = 'assets/img/default/under-construction.png'

  tableTemp = []
  listData: any = [
    {
      proName: "Attestation of Company Good Standing (ACGS)",
      ctc: "NON-CTC",
      janTransac: "18323",
      janValue: "9.50",
      febTransac: "18323",
      febValue: "102902",
      marTransac: "18323",
      marValue: "102902",
      aprTransac: "18323",
      aprValue: "102902",
      mayTransac: "18323",
      mayValue: "102902",
      junTransac: "18323",
      junValue: "102902",
      julTransac: "18323",
      julValue: "102902",
      augTransac: "18323",
      augValue: "102902",
      sepTransac: "18323",
      sepValue: "102902",
      octTransac: "18323",
      octValue: "102902",
      novTransac: "18323",
      novValue: "102902",
      decTransac: "18323",
      decValue: "123123",
      allTransac: "1832300",
      allValue: "45646500",
    }, {
      proName: "Sijil Pemerbadanan Syarikat Persendirian di bawah AS 1965",
      ctc: "NON-CTC",
      janTransac: "121,212",
      janValue: "9.50",
      febTransac: "121,212",
      febValue: "9.50",
      marTransac: "121,212",
      marValue: "9.50",
      aprTransac: "121,212",
      aprValue: "9.50",
      mayTransac: "121,212",
      mayValue: "9.50",
      junTransac: "121,212",
      junValue: "9.50",
      julTransac: "121,212",
      julValue: "9.50",
      augTransac: "121,212",
      augValue: "9.50",
      sepTransac: "121,212",
      sepValue: "9.50",
      octTransac: "121,212",
      octValue: "9.50",
      novTransac: "121,212",
      novValue: "9.50",
      decTransac: "121,212",
      decValue: "123123",
      allTransac: "121,212",
      allValue: "456465",
    }, {
      proName: "Sijil Pemerbadanan Syarikat Persendirian di bawah AS 1965",
      ctc: "CTC",
      janTransac: "192301",
      janValue: "91021",
      febTransac: "192301",
      febValue: "91021",
      marTransac: "192301",
      marValue: "91021",
      aprTransac: "192301",
      aprValue: "91021",
      mayTransac: "192301",
      mayValue: "91021",
      junTransac: "192301",
      junValue: "91021",
      julTransac: "192301",
      julValue: "91021",
      augTransac: "192301",
      augValue: "91021",
      sepTransac: "192301",
      sepValue: "91021",
      octTransac: "192301",
      octValue: "91021",
      novTransac: "192301",
      novValue: "91021",
      decTransac: "192301",
      decValue: "123123",
      allTransac: "192301",
      allValue: "456465",
    }, {
      proName: "Sijil Pemerbadanan Syarikat Persendirian di bawah AS 2016",
      ctc: "NON-CTC",
      janTransac: "2371i",
      janValue: "91821",
      febTransac: "2371i",
      febValue: "91821",
      marTransac: "2371i",
      marValue: "91821",
      aprTransac: "2371i",
      aprValue: "91821",
      mayTransac: "2371i",
      mayValue: "91821",
      junTransac: "2371i",
      junValue: "91821",
      julTransac: "2371i",
      julValue: "91821",
      augTransac: "2371i",
      augValue: "91821",
      sepTransac: "2371i",
      sepValue: "91821",
      octTransac: "2371i",
      octValue: "91821",
      novTransac: "2371i",
      novValue: "91821",
      decTransac: "2371i",
      decValue: "91821",
      allTransac: "2371i",
      allValue: "456465",
    }, {
      proName: "Sijil Pemerbadanan Syarikat Persendirian di bawah AS 2016",
      ctc: "CTC",
      janTransac: "121,212",
      janValue: "9.50",
      febTransac: "121,212",
      febValue: "9.50",
      marTransac: "121,212",
      marValue: "9.50",
      aprTransac: "121,212",
      aprValue: "9.50",
      mayTransac: "121,212",
      mayValue: "9.50",
      junTransac: "121,212",
      junValue: "9.50",
      julTransac: "121,212",
      julValue: "9.50",
      augTransac: "121,212",
      augValue: "9.50",
      sepTransac: "121,212",
      sepValue: "9.50",
      octTransac: "121,212",
      octValue: "9.50",
      novTransac: "121,212",
      novValue: "9.50",
      decTransac: "121,212",
      decValue: "123123",
      allTransac: "121,212",
      allValue: "456465",
    }, {
      proName: "Sijil Pemerbadanan Syarikat Awam di bawah AS 1965",
      ctc: "CTC",
      janTransac: "6172",
      janValue: "71819",
      febTransac: "6172",
      febValue: "71819",
      marTransac: "6172",
      marValue: "71819",
      aprTransac: "6172",
      aprValue: "71819",
      mayTransac: "6172",
      mayValue: "71819",
      junTransac: "6172",
      junValue: "71819",
      julTransac: "6172",
      julValue: "71819",
      augTransac: "6172",
      augValue: "71819",
      sepTransac: "6172",
      sepValue: "71819",
      octTransac: "6172",
      octValue: "71819",
      novTransac: "6172",
      novValue: "71819",
      decTransac: "6172",
      decValue: "123123",
      allTransac: "6172",
      allValue: "456465",
    }, {
      proName: "Sijil Pemerbadanan Syarikat Awam di bawah AS 1965",
      ctc: "NON-CTC",
      janTransac: "121,212",
      janValue: "9.50",
      febTransac: "121,212",
      febValue: "9.50",
      marTransac: "121,212",
      marValue: "9.50",
      aprTransac: "121,212",
      aprValue: "9.50",
      mayTransac: "121,212",
      mayValue: "9.50",
      junTransac: "121,212",
      junValue: "9.50",
      julTransac: "121,212",
      julValue: "9.50",
      augTransac: "121,212",
      augValue: "9.50",
      sepTransac: "121,212",
      sepValue: "9.50",
      octTransac: "121,212",
      octValue: "9.50",
      novTransac: "121,212",
      novValue: "9.50",
      decTransac: "121,212",
      decValue: "123123",
      allTransac: "121,212",
      allValue: "456465",
    }, {
      proName: "Sijil Pemerbadanan Syarikat Awam di bawah AS 2016",
      ctc: "CTC",
      janTransac: "121,212",
      janValue: "9.50",
      febTransac: "121,212",
      febValue: "9.50",
      marTransac: "121,212",
      marValue: "9.50",
      aprTransac: "121,212",
      aprValue: "9.50",
      mayTransac: "121,212",
      mayValue: "9.50",
      junTransac: "121,212",
      junValue: "9.50",
      julTransac: "121,212",
      julValue: "9.50",
      augTransac: "121,212",
      augValue: "9.50",
      sepTransac: "121,212",
      sepValue: "9.50",
      octTransac: "121,212",
      octValue: "9.50",
      novTransac: "121,212",
      novValue: "9.50",
      decTransac: "121,212",
      decValue: "123123",
      allTransac: "121,212",
      allValue: "456465",
    }, {
      proName: "Sijil Pemerbadanan Syarikat Awam di bawah AS 2016",
      ctc: "NON-CTC",
      janTransac: "121,212",
      janValue: "9.50",
      febTransac: "121,212",
      febValue: "9.50",
      marTransac: "121,212",
      marValue: "9.50",
      aprTransac: "121,212",
      aprValue: "9.50",
      mayTransac: "121,212",
      mayValue: "9.50",
      junTransac: "121,212",
      junValue: "9.50",
      julTransac: "121,212",
      julValue: "9.50",
      augTransac: "121,212",
      augValue: "9.50",
      sepTransac: "121,212",
      sepValue: "9.50",
      octTransac: "121,212",
      octValue: "9.50",
      novTransac: "121,212",
      novValue: "9.50",
      decTransac: "121,212",
      decValue: "123123",
      allTransac: "121,212",
      allValue: "456465",
    }, {
      proName: "Sijil Pemerbadanan Syarikat Awam di bawah AS 1965 (menurut jaminan)",
      ctc: "CTC",
      janTransac: "121,212",
      janValue: "9.50",
      febTransac: "121,212",
      febValue: "9.50",
      marTransac: "121,212",
      marValue: "9.50",
      aprTransac: "121,212",
      aprValue: "9.50",
      mayTransac: "121,212",
      mayValue: "9.50",
      junTransac: "121,212",
      junValue: "9.50",
      julTransac: "121,212",
      julValue: "9.50",
      augTransac: "121,212",
      augValue: "9.50",
      sepTransac: "121,212",
      sepValue: "9.50",
      octTransac: "121,212",
      octValue: "9.50",
      novTransac: "121,212",
      novValue: "9.50",
      decTransac: "121,212",
      decValue: "123123",
      allTransac: "121,212",
      allValue: "456465",
    }, {
      proName: "Sijil Pemerbadanan Syarikat Awam di bawah AS 1965 (menurut jaminan)",
      ctc: "NON-CTC",
      janTransac: "121,212",
      janValue: "9.50",
      febTransac: "121,212",
      febValue: "9.50",
      marTransac: "121,212",
      marValue: "9.50",
      aprTransac: "121,212",
      aprValue: "9.50",
      mayTransac: "121,212",
      mayValue: "9.50",
      junTransac: "121,212",
      junValue: "9.50",
      julTransac: "121,212",
      julValue: "9.50",
      augTransac: "121,212",
      augValue: "9.50",
      sepTransac: "121,212",
      sepValue: "9.50",
      octTransac: "121,212",
      octValue: "9.50",
      novTransac: "121,212",
      novValue: "9.50",
      decTransac: "121,212",
      decValue: "123123",
      allTransac: "121,212",
      allValue: "456465",
    },
  ];

  // Chart
  private chart: any

  constructor(
    private zone: NgZone,
    private productService: ProductsService,
  ) {
    this.getData()
  }

  ngOnInit() {
    // this.getCharts()
  }

  ngOnDestroy() {
    this.zone.runOutsideAngular(
      () => {
        if (this.chart) {
          console.log('Chart disposed')
          this.chart.dispose()
        }
      }
    )
  }

  // exportExcel() {
  //   let fileName = 'Product_report.xlsx'
  //   let element = document.getElementById('productReportTable');

  //   console.log(element)
  //   const ws: xlsx.WorkSheet = xlsx.utils.table_to_sheet(element);

  //   /* generate workbook and add the worksheet */
  //   const wb: xlsx.WorkBook = xlsx.utils.book_new();
  //   xlsx.utils.book_append_sheet(wb, ws, 'Sheet1');

  //   /* save to file */
  //   xlsx.writeFile(wb, fileName);
  // }

  // Aduh
  getData() {
    // this.loadingBar.start()
    this.productService.getAll().subscribe(
      (res) => {
        // this.loadingBar.complete()
        this.tableTemp = res;
        this.tableTemp.forEach(
          (row) => {
            if (row.created_date) {
              row.created_date = moment(row.created_date).format('DD/MM/YYYY')
            }

            if (row.modified_date) {
              row.modified_date = moment(row.modified_date).format('DD/MM/YYYY')
            }
          }
        )
      },
      () => {
      },
      () => {
        // this.tableTemp = this.tableRows.map((prop, key) => {
        //   return {
        //     ...prop,
        //     id_index: key + 1
        //   };
        // });
        // console.log(this.tableTemp)
      }
    )
  }

  exportExcel() {
    let fileName = 'Product_report.xlsx'
    let element = document.getElementById('productReportTable');

    console.log(element)
    const ws: xlsx.WorkSheet = xlsx.utils.table_to_sheet(element);

    /* generate workbook and add the worksheet */
    const wb: xlsx.WorkBook = xlsx.utils.book_new();
    xlsx.utils.book_append_sheet(wb, ws, 'Sheet1');

    /* save to file */
    xlsx.writeFile(wb, fileName);
  }

  // exportExcel() {
  //   let newArray: any[] = [];
  //   console.log('this.tableTemp = ', this.tableTemp)
  //   let data = Object.values(this.tableTemp);
  //   Object.keys(data).forEach((key, index) => {
  //     newArray.push({
  //       'Ind. ID': data[key].individual_id,
  //       'HH ID': data[key].hh_id
  //     })
  //   })


  //   const ws: xlsx.WorkSheet = xlsx.utils.json_to_sheet(newArray);
  //   const wb: xlsx.WorkBook = xlsx.utils.book_new();
  //   xlsx.utils.book_append_sheet(wb, ws, 'All Ind. Searched Data Export');

  //   /* save to file */
  //   xlsx.writeFile(wb, 'ExportAllData_Ind.xlsx');
  // }

}
