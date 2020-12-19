import { Component, OnInit, NgZone, OnDestroy } from '@angular/core';
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import * as am4maps from "@amcharts/amcharts4/maps";
import am4geodata_continentsLow from "@amcharts/amcharts4-geodata/continentsLow";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";
import * as xlsx from 'xlsx';
import * as moment from 'moment';

import { ProductsService } from '../../../../shared/services/products/products.service';
import { TransactionsService } from 'src/app/shared/services/transactions/transactions.service';

@Component({
  selector: 'app-dashboard-product',
  templateUrl: './dashboard-product.component.html',
  styleUrls: ['./dashboard-product.component.scss']
})
export class DashboardProductComponent implements OnInit {

  // Image 
  imgConstruction = 'assets/img/default/under-construction.png'

  tableTemp = []
  transactionData = [
    {
      "month": "Jan",
      "dataCount": 2000,
      "expenses": 2000
    },
    {
      "month": "Feb",
      "dataCount": 2819,
      "expenses": 1621
    },
    {
      "month": "mar",
      "dataCount": 2192,
      "expenses": 2342
    },
    {
      "month": "Apr",
      "dataCount": 2821,
      "expenses": 1728
    },
    {
      "month": "May",
      "dataCount": 712,
      "expenses": 1827
    },
    {
      "month": "Jun",
      "dataCount": 2412,
      "expenses": 2152
    },
    {
      "month": "Jul",
      "dataCount": 4721,
      "expenses": 3827
    },
    {
      "month": "Aug",
      "dataCount": 4265,
      "expenses": 1523
    },
    {
      "month": "Sep",
      "dataCount": 1990,
      "expenses": 1627
    },
    {
      "month": "Oct",
      "dataCount": 3212,
      "expenses": 2900
    },
    {
      "month": "Nov",
      "dataCount": 891,
      "expenses": 1911
    },
    {
      "month": "Dec",
      "dataCount": 4210,
      "expenses": 4210
    },
  ];

  chartJan: number = 0
  chartFeb: number = 0
  chartMar: number = 0
  chartApr: number = 0
  chartMay: number = 0
  chartJun: number = 0
  chartJul: number = 0
  chartAug: number = 0
  chartSep: number = 0
  chartOct: number = 0
  chartNov: number = 0
  chartDec: number = 0

  // Chart
  private chart: any

  constructor(
    private zone: NgZone,
    private productService: ProductsService,
    private transactionsService: TransactionsService
  ) {
    // this.getProductData()
    this.getTransactionData()
  }

  ngOnInit() {
    this.getCharts()
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

  getCharts() {
    this.zone.runOutsideAngular(() => {
      this.getChart()
      this.getChart1()
      this.getChart2()
    })
  }


  getChart() {
    let chart = am4core.create("chartdivpro", am4charts.XYChart);
    chart.scrollbarX = new am4core.Scrollbar();

    // Add data
    chart.data = this.transactionData

    prepareParetoData();

    function prepareParetoData() {

      let i = 0
      chart.data.forEach(function (qwe) {
        // console.log('qwe.expenses = ', qwe.expenses)
        chart.data[i].pareto = (qwe.expenses / 100) * 2;
        i++
      })
    }

    // prepareParetoData();

    // function prepareParetoData() {
    //   let total = 0;

    //   for (var i = 0; i < chart.data.length; i++) {
    //     let valueSum = chart.data[i].dataCount;
    //     total += valueSum;
    //   }

    //   let sum = 0;
    //   for (var i = 0; i < chart.data.length; i++) {
    //     let valueSum = chart.data[i].dataCount;
    //     sum += valueSum;
    //     chart.data[i].pareto = sum / total * 100;
    //   }
    // }

    // Create axes
    let categoryAxis = chart.xAxes.push(new am4charts.CategoryAxis());
    categoryAxis.dataFields.category = "month";
    categoryAxis.renderer.grid.template.location = 0;
    categoryAxis.renderer.minGridDistance = 60;
    categoryAxis.tooltip.disabled = true;

    let valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
    valueAxis.renderer.minWidth = 50;
    valueAxis.min = 0;
    valueAxis.cursorTooltipEnabled = false;

    // Create series
    let series = chart.series.push(new am4charts.ColumnSeries());
    series.sequencedInterpolation = true;
    series.dataFields.valueY = "dataCount";
    series.dataFields.categoryX = "month";
    series.tooltipText = "[{categoryX}: bold]{valueY}[/]";
    series.columns.template.strokeWidth = 0;

    series.tooltip.pointerOrientation = "vertical";

    series.columns.template.column.cornerRadiusTopLeft = 10;
    series.columns.template.column.cornerRadiusTopRight = 10;
    series.columns.template.column.fillOpacity = 0.8;

    // on hover, make corner radiuses bigger
    let hoverState = series.columns.template.column.states.create("hover");
    hoverState.properties.cornerRadiusTopLeft = 0;
    hoverState.properties.cornerRadiusTopRight = 0;
    hoverState.properties.fillOpacity = 1;

    series.columns.template.adapter.add("fill", function (fill, target) {
      return chart.colors.getIndex(target.dataItem.index);
    })


    let paretoValueAxis = chart.yAxes.push(new am4charts.ValueAxis());
    paretoValueAxis.renderer.opposite = true;
    paretoValueAxis.min = 0;
    paretoValueAxis.max = 100;
    paretoValueAxis.strictMinMax = true;
    paretoValueAxis.renderer.grid.template.disabled = true;
    paretoValueAxis.numberFormatter = new am4core.NumberFormatter();
    paretoValueAxis.numberFormatter.numberFormat = "#'%'"
    paretoValueAxis.cursorTooltipEnabled = false;

    let paretoSeries = chart.series.push(new am4charts.LineSeries())
    paretoSeries.dataFields.valueY = "pareto";
    paretoSeries.dataFields.categoryX = "month";
    paretoSeries.yAxis = paretoValueAxis;
    paretoSeries.tooltipText = "Target: {valueY.formatNumber('#.0')}%[/]";
    paretoSeries.bullets.push(new am4charts.CircleBullet());
    paretoSeries.strokeWidth = 2;
    paretoSeries.stroke = new am4core.InterfaceColorSet().getFor("alternativeBackground");
    paretoSeries.strokeOpacity = 0.5;

    // Cursor
    chart.cursor = new am4charts.XYCursor();
    chart.cursor.behavior = "panX";
  }

  getChart1() {
    let chart = am4core.create("chartdivrep1", am4charts.XYChart);
    chart.scrollbarX = new am4core.Scrollbar();

    // Add data
    chart.data = [
      {
        "country": "Jan",
        "visits": this.chartJan
      },
      {
        "country": "Feb",
        "visits": this.chartFeb
      },
      {
        "country": "mar",
        "visits": this.chartMar
      },
      {
        "country": "Apr",
        "visits": this.chartApr
      },
      {
        "country": "May",
        "visits": this.chartMay
      },
      {
        "country": "Jun",
        "visits": this.chartJun
      },
      {
        "country": "Jul",
        "visits": this.chartJul
      },
      {
        "country": "Aug",
        "visits": this.chartAug
      },
      {
        "country": "Sep",
        "visits": this.chartSep
      },
      {
        "country": "Oct",
        "visits": this.chartOct
      },
      {
        "country": "Nov",
        "visits": this.chartNov
      },
      {
        "country": "Dec",
        "visits": this.chartDec
      },
    ];

    console.log('chart.data getChart1 = ', chart.data)

    prepareParetoData();

    function prepareParetoData() {
      let total = 0;

      for (var i = 0; i < chart.data.length; i++) {
        let valueSum = chart.data[i].visits;
        total += valueSum;
      }

      let sum = 0;
      for (var i = 0; i < chart.data.length; i++) {
        let valueSum = chart.data[i].visits;
        sum += valueSum;
        chart.data[i].pareto = sum / total * 100;
      }
    }

    // Create axes
    let categoryAxis = chart.xAxes.push(new am4charts.CategoryAxis());
    categoryAxis.dataFields.category = "country";
    categoryAxis.renderer.grid.template.location = 0;
    categoryAxis.renderer.minGridDistance = 60;
    categoryAxis.tooltip.disabled = true;

    let valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
    valueAxis.renderer.minWidth = 50;
    valueAxis.min = 0;
    valueAxis.cursorTooltipEnabled = false;

    // Create series
    let series = chart.series.push(new am4charts.ColumnSeries());
    series.sequencedInterpolation = true;
    series.dataFields.valueY = "visits";
    series.dataFields.categoryX = "country";
    series.tooltipText = "[{categoryX}: bold]{valueY}[/]";
    series.columns.template.strokeWidth = 0;

    series.tooltip.pointerOrientation = "vertical";

    series.columns.template.column.cornerRadiusTopLeft = 10;
    series.columns.template.column.cornerRadiusTopRight = 10;
    series.columns.template.column.fillOpacity = 0.8;

    // on hover, make corner radiuses bigger
    let hoverState = series.columns.template.column.states.create("hover");
    hoverState.properties.cornerRadiusTopLeft = 0;
    hoverState.properties.cornerRadiusTopRight = 0;
    hoverState.properties.fillOpacity = 1;

    series.columns.template.adapter.add("fill", function (fill, target) {
      return chart.colors.getIndex(target.dataItem.index);
    })


    let paretoValueAxis = chart.yAxes.push(new am4charts.ValueAxis());
    paretoValueAxis.renderer.opposite = true;
    paretoValueAxis.min = 0;
    paretoValueAxis.max = 100;
    paretoValueAxis.strictMinMax = true;
    paretoValueAxis.renderer.grid.template.disabled = true;
    paretoValueAxis.numberFormatter = new am4core.NumberFormatter();
    paretoValueAxis.numberFormatter.numberFormat = "#'%'"
    paretoValueAxis.cursorTooltipEnabled = false;

    let paretoSeries = chart.series.push(new am4charts.LineSeries())
    paretoSeries.dataFields.valueY = "pareto";
    paretoSeries.dataFields.categoryX = "country";
    paretoSeries.yAxis = paretoValueAxis;
    paretoSeries.tooltipText = "sasaran: {valueY.formatNumber('#.0')}%[/]";
    paretoSeries.bullets.push(new am4charts.CircleBullet());
    paretoSeries.strokeWidth = 2;
    paretoSeries.stroke = new am4core.InterfaceColorSet().getFor("alternativeBackground");
    paretoSeries.strokeOpacity = 0.5;

    // Cursor
    chart.cursor = new am4charts.XYCursor();
    chart.cursor.behavior = "panX";
  }

  getChart2() {
    let chart = am4core.create("chartdivrep2", am4charts.XYChart);

    // Export
    chart.exporting.menu = new am4core.ExportMenu();

    // Data for both series
    chart.data = [
      {
        "year": "Jan",
        "income": 1120,
        "expenses": 1022
      },
      {
        "year": "Feb",
        "income": 2819,
        "expenses": 1120
      },
      {
        "year": "mar",
        "income": 2192,
        "expenses": 2012
      },
      {
        "year": "Apr",
        "income": 2821,
        "expenses": 1920
      },
      {
        "year": "May",
        "income": 712,
        "expenses": 1829
      },
      {
        "year": "Jun",
        "income": 2412,
        "expenses": 1928
      },
      {
        "year": "Jul",
        "income": 4721,
        "expenses": 3902
      },
      {
        "year": "Aug",
        "income": 4265,
        "expenses": 4001
      },
      {
        "year": "Sep",
        "income": 1990,
        "expenses": 2932
      },
      {
        "year": "Oct",
        "income": 3212,
        "expenses": 1928,
        "lineDash": "5,5",
      },
      {
        "year": "Nov",
        "income": 891,
        "expenses": 1726,
        "lineDash": "5,5",
      },
      {
        "year": "Dec",
        "income": 4232,
        "expenses": 3982,
        "lineDash": "5,5",
      },
    ];

    /* Create axes */
    let categoryAxis = chart.xAxes.push(new am4charts.CategoryAxis());
    categoryAxis.dataFields.category = "year";
    categoryAxis.renderer.minGridDistance = 30;

    /* Create value axis */
    let valueAxis = chart.yAxes.push(new am4charts.ValueAxis());

    /* Create series */
    let columnSeries = chart.series.push(new am4charts.ColumnSeries());
    columnSeries.name = "Target";
    columnSeries.dataFields.valueY = "income";
    columnSeries.dataFields.categoryX = "year";

    // columnSeries.columns.template.tooltipText = "[#fff font-size: 15px]{name} in {categoryX}:\n[/][#fff font-size: 20px]{valueY}[/] [#fff]{additional}[/]"
    columnSeries.columns.template.propertyFields.fillOpacity = "fillOpacity";
    columnSeries.columns.template.propertyFields.stroke = "stroke";
    columnSeries.columns.template.propertyFields.strokeWidth = "strokeWidth";
    columnSeries.columns.template.propertyFields.strokeDasharray = "columnDash";
    columnSeries.tooltip.label.textAlign = "middle";

    let lineSeries = chart.series.push(new am4charts.LineSeries());
    lineSeries.name = "Revenue";
    lineSeries.dataFields.valueY = "expenses";
    lineSeries.dataFields.categoryX = "year";

    lineSeries.stroke = am4core.color("#fdd400");
    lineSeries.strokeWidth = 3;
    lineSeries.propertyFields.strokeDasharray = "lineDash";
    lineSeries.tooltip.label.textAlign = "middle";

    let bullet = lineSeries.bullets.push(new am4charts.Bullet());
    bullet.fill = am4core.color("#fdd400"); // tooltips grab fill from parent by default
    // bullet.tooltipText = "[#fff font-size: 15px]{name} in {categoryX}:\n[/][#fff font-size: 20px]{valueY}[/] [#fff]{additional}[/]"
    let circle = bullet.createChild(am4core.Circle);
    circle.radius = 4;
    circle.fill = am4core.color("#fff");
    circle.strokeWidth = 3;


  }

  getTransactionData() {
    // this.loadingBar.start()

    let currentYear = (new Date()).getFullYear()

    this.chartJan = 0
    this.chartFeb = 0
    this.chartMar = 0
    this.chartApr = 0
    this.chartMay = 0
    this.chartJun = 0
    this.chartJul = 0
    this.chartAug = 0
    this.chartSep = 0
    this.chartOct = 0
    this.chartNov = 0
    this.chartDec = 0

    let chartDataJan = 0
    let chartDataFeb = 0
    let chartDataMar = 0
    let chartDataApr = 0
    let chartDataMay = 0
    let chartDataJun = 0
    let chartDataJul = 0
    let chartDataAug = 0
    let chartDataSep = 0
    let chartDataOct = 0
    let chartDataNov = 0
    let chartDataDec = 0

    this.transactionsService.getTransactions().subscribe(
      (res) => {
        // this.loadingBar.complete()
        res.forEach(function (loopVal) {

          // console.log('createdDate', loopVal.created_date)
          var createdDate = moment(loopVal.created_date, 'DD-MM-YYYY')
          // console.log('format(MM-DD-YYYY) = ', createdDate.format('MM'))

          let checkerDate = moment(loopVal.created_date)

          let checkerDateMonth = checkerDate.month()
          console.log('createdDate = ', createdDate, 'checkerDateMonth = ', checkerDateMonth)

          if (checkerDateMonth == 0) {
            chartDataJan += 1
          }
          else if (checkerDateMonth == 1) {
            chartDataFeb += 1
          }
          else if (checkerDateMonth == 2) {
            chartDataMar += 1
          }
          else if (checkerDateMonth == 3) {
            chartDataApr += 1
          }
          else if (checkerDateMonth == 4) {
            chartDataMay += 1
          }
          else if (checkerDateMonth == 5) {
            chartDataJun += 1
          }
          else if (checkerDateMonth == 6) {
            chartDataJul += 1
          }
          else if (checkerDateMonth == 7) {
            chartDataAug += 1
          }
          else if (checkerDateMonth == 8) {
            chartDataSep += 1
          }
          else if (checkerDateMonth == 9) {
            chartDataOct += 1
          }
          else if (checkerDateMonth == 10) {
            chartDataNov += 1
          }
          else if (checkerDateMonth == 11) {
            chartDataDec += 1
          }

        })
      }
    )

    this.chartJan = chartDataJan
    this.chartFeb = chartDataFeb
    this.chartMar = chartDataMar
    this.chartApr = chartDataApr
    this.chartMay = chartDataMay
    this.chartJun = chartDataJun
    this.chartJul = chartDataJul
    this.chartAug = chartDataAug
    this.chartSep = chartDataSep
    this.chartOct = chartDataOct
    this.chartNov = chartDataNov
    this.chartDec = chartDataDec

    console.log(this.chartJan, '=', chartDataJan, '--', this.chartDec, '=', chartDataDec, '--', this.chartNov, '--', this.chartOct)

    // this.zone.runOutsideAngular(() => {
    // this.getChart()
    this.getChart1()
    // this.getChart2()
    // })

  }

  getProductData() {
    // this.loadingBar.start()
    this.productService.getAll().subscribe(
      (res) => {
        // this.loadingBar.complete()
        this.tableTemp = res;
        this.tableTemp.forEach(
          (row) => {
            if (row.created_date) {
              row.created_date = moment(row.created_date).format('DD/MM/YYYY')
              let qweqwe = moment(row.created_date).format('MM/DD/YYYY')

              console.log('created_date = ', row.created_date)
              console.log('qweqwe = ', qweqwe)
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

  exportExcel() {
    let newArray: any[] = [];
    console.log('this.tableTemp = ', this.tableTemp)
    let data = Object.values(this.transactionData);
    Object.keys(data).forEach((key, index) => {
      newArray.push({
        'Month': data[key].month,
        'Total': data[key].dataCount,
        'Revenue': data[key].expenses
      })
    })


    const ws: xlsx.WorkSheet = xlsx.utils.json_to_sheet(newArray);
    const wb: xlsx.WorkBook = xlsx.utils.book_new();
    xlsx.utils.book_append_sheet(wb, ws, 'All Ind. Searched Data Export');

    /* save to file */
    xlsx.writeFile(wb, 'ExportAllData_Ind.xlsx');
  }

}
