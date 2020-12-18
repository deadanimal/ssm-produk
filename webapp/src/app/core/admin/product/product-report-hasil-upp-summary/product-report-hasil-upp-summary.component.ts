import { Component, OnInit, NgZone, TemplateRef, OnDestroy } from '@angular/core';
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import * as am4maps from "@amcharts/amcharts4/maps";
import am4geodata_continentsLow from "@amcharts/amcharts4-geodata/continentsLow";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";
import * as xlsx from 'xlsx';
import * as moment from 'moment';
import { BsModalRef, BsModalService } from 'ngx-bootstrap';

import { ProductsService } from '../../../../shared/services/products/products.service';

@Component({
  selector: 'app-product-report-hasil-upp-summary',
  templateUrl: './product-report-hasil-upp-summary.component.html',
  styleUrls: ['./product-report-hasil-upp-summary.component.scss']
})
export class ProductReportHasilUppSummaryComponent implements OnInit {

  // Image 
  imgConstruction = 'assets/img/default/under-construction.png'

  // Modal
  modal: BsModalRef;
  modalConfig = {
    keyboard: true,
    class: 'modal-dialog-centered',
  }

  tableTemp = []
  listData: any = [
    {
      bulan: "Januari",
      perkara: "Afizi",
      portal: "AC",
      transaksi: "20,000",
      rm: "RM 150,000.00",
      compareSasaran2020: "121,212",
      cs1percent: "9.50%",
      compare2019: "132,321",
      cs2percent: "7.5%",
      cumPerformance: "7.9%",
      cpPercent: "9.1%"
    },
    {
      bulan: "Januari",
      perkara: "Afizi",
      portal: "AC",
      transaksi: "20,000",
      rm: "RM 150,000.00",
      compareSasaran2020: "121,212",
      cs1percent: "9.50%",
      compare2019: "132,321",
      cs2percent: "7.5%",
      cumPerformance: "7.9%",
      cpPercent: "9.1%"
    },
    {
      bulan: "Januari",
      perkara: "Afizi",
      portal: "AC",
      transaksi: "20,000",
      rm: "RM 150,000.00",
      compareSasaran2020: "121,212",
      cs1percent: "9.50%",
      compare2019: "132,321",
      cs2percent: "7.5%",
      cumPerformance: "7.9%",
      cpPercent: "9.1%"
    },
    {
      bulan: "Januari",
      perkara: "Afizi",
      portal: "AC",
      transaksi: "20,000",
      rm: "RM 150,000.00",
      compareSasaran2020: "121,212",
      cs1percent: "9.50%",
      compare2019: "132,321",
      cs2percent: "7.5%",
      cumPerformance: "7.9%",
      cpPercent: "9.1%"
    },
    {
      bulan: "Januari",
      perkara: "Afizi",
      portal: "AC",
      transaksi: "20,000",
      rm: "RM 150,000.00",
      compareSasaran2020: "121,212",
      cs1percent: "9.50%",
      compare2019: "132,321",
      cs2percent: "7.5%",
      cumPerformance: "7.9%",
      cpPercent: "9.1%"
    },
    {
      bulan: "Januari",
      perkara: "Afizi",
      portal: "AC",
      transaksi: "20,000",
      rm: "RM 150,000.00",
      compareSasaran2020: "121,212",
      cs1percent: "9.50%",
      compare2019: "132,321",
      cs2percent: "7.5%",
      cumPerformance: "7.9%",
      cpPercent: "9.1%"
    }
  ];

  // Chart
  private chart: any

  constructor(
    private zone: NgZone,
    private productService: ProductsService,
    private modalService: BsModalService,
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

  openModal(modalRef: TemplateRef<any>) {
    this.modal = this.modalService.show(modalRef, this.modalConfig);
  }

  closeModal() {
    this.modal.hide();
  }

}
