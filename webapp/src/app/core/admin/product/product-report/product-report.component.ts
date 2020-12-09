import { Component, OnInit, NgZone, OnDestroy } from '@angular/core';
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import * as am4maps from "@amcharts/amcharts4/maps";
import am4geodata_continentsLow from "@amcharts/amcharts4-geodata/continentsLow";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";

@Component({
  selector: 'app-product-report',
  templateUrl: './product-report.component.html',
  styleUrls: ['./product-report.component.scss']
})
export class ProductReportComponent implements OnInit {

  // Image 
  imgConstruction = 'assets/img/default/under-construction.png'

  // Chart
  private chart: any

  constructor(
    private zone: NgZone
  ) { }

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
    let chart = am4core.create("chartdivpro", am4charts.PieChart);

    // Add data
    chart.data = [{
      "product": "Certificate of Conversion ",
      "litres": 95
    }, {
      "product": " Particulars of Share Capital ",
      "litres": 120
    }, {
      "product": "Financial Comparison - 2 Years ",
      "litres": 211
    }, {
      "product": "Certificate of Change of Company Name",
      "litres": 161
    }, {
      "product": "Financial Historical ",
      "litres": 139
    }, {
      "product": "Financial Comparison - 5 Years ",
      "litres": 128
    }, {
      "product": "Particulars of Shareholders ",
      "litres": 99
    }, {
      "product": "Particulars of Share Capital ",
      "litres": 99
    }, {
      "product": "Attestation of Company Good Standing (ACGS)  ",
      "litres": 99
    }, {
      "product": "Document and Form ",
      "litres": 121
    }
    ];

    // Add and configure Series
    let pieSeries = chart.series.push(new am4charts.PieSeries());
    pieSeries.dataFields.value = "litres";
    pieSeries.dataFields.category = "product";
    pieSeries.slices.template.stroke = am4core.color("#fff");
    pieSeries.slices.template.strokeOpacity = 1;

    // This creates initial animation
    pieSeries.hiddenState.properties.opacity = 1;
    pieSeries.hiddenState.properties.endAngle = -90;
    pieSeries.hiddenState.properties.startAngle = -90;

    chart.hiddenState.properties.radius = am4core.percent(0);
  }

  getChart1() {
    let chart = am4core.create("chartdivrep1", am4charts.XYChart);
    chart.scrollbarX = new am4core.Scrollbar();

    // Add data
    chart.data = [{
      "country": "Jan",
      "visits": 0
    },
    {
      "country": "Feb",
      "visits": 0
    },
    {
      "country": "Mar",
      "visits": 0
    },
    {
      "country": "Apr",
      "visits": 0
    },
    {
      "country": "May",
      "visits": 0
    },
    {
      "country": "Jun",
      "visits": 0
    },
    {
      "country": "Jul",
      "visits": 0
    },
    {
      "country": "Aug",
      "visits": 52
    },
    {
      "country": "Sep",
      "visits": 61
    },
    {
      "country": "Oct",
      "visits": 101
    },
    {
      "country": "Nov",
      "visits": 129
    },
    {
      "country": "Dec",
      "visits": 0
    },
    ];

    prepareParetoData();

    function prepareParetoData() {
      let total = 0;

      for (var i = 0; i < chart.data.length; i++) {
        let value = chart.data[i].visits;
        total += value;
      }

      let sum = 0;
      for (var i = 0; i < chart.data.length; i++) {
        let value = chart.data[i].visits;
        sum += value;
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
    paretoSeries.tooltipText = "pareto: {valueY.formatNumber('#.0')}%[/]";
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
    let data = [
      {
      "year": "Jan",
      "income": 0,
      "expenses": 0
    }, 
    {
      "year": "Feb",
      "income": 0,
      "expenses": 0
    }, 
    {
      "year": "Mar",
      "income": 0,
      "expenses": 0
    }, 
    {
      "year": "Apr",
      "income": 0,
      "expenses": 0
    }, 
    {
      "year": "May",
      "income": 0,
      "expenses": 0,
      "lineDash": "5,5",
    }, 
    {
      "year": "Jun",
      "income": 0,
      "expenses": 0,
      "lineDash": "5,5",
    }, 
    {
      "year": "Jul",
      "income": 0,
      "expenses": 0,
      "lineDash": "5,5",
    }, 
    {
      "year": "Aug",
      "income": 3210,
      "expenses": 2910,
      "lineDash": "5,5",
    }, 
    {
      "year": "Sep",
      "income": 5021,
      "expenses": 4210,
      "lineDash": "5,5",
    }, 
    {
      "year": "Oct",
      "income": 10210,
      "expenses": 11200,
      "lineDash": "5,5",
    }, 
    {
      "year": "Nov",
      "income": 15001,
      "expenses": 20110,
      "lineDash": "5,5",
    }, 
    {
      "year": "Dec",
      "income": 0,
      "expenses": 0,
      "strokeWidth": 1,
      "columnDash": "5,5",
      "fillOpacity": 0.2,
      "additional": "(projection)"
    }
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

    chart.data = data;

  }

}
