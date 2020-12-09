import { Component, OnInit, NgZone, OnDestroy } from '@angular/core';
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import * as am4maps from "@amcharts/amcharts4/maps";
import am4geodata_continentsLow from "@amcharts/amcharts4-geodata/continentsLow";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";

@Component({
  selector: 'app-involvement-management',
  templateUrl: './involvement-management.component.html',
  styleUrls: ['./involvement-management.component.scss']
})
export class InvolvementManagementComponent implements OnInit {

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

}
