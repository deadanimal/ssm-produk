import { Component, OnInit, NgZone } from "@angular/core";
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";

am4core.useTheme(am4themes_animated);

@Component({
  selector: "app-dashboard",
  templateUrl: "./dashboard.component.html",
  styleUrls: ["./dashboard.component.scss"],
})
export class DashboardComponent implements OnInit {
  chart;
  chart1;
  chart2;
  chart3;

  constructor(private zone: NgZone) {}

  ngOnInit(): void {
    this.zone.runOutsideAngular(() => {
      this.initChart();
      this.initChart1();
      this.initChart2();
      this.initChart3();
    });
  }

  ngOnDestroy() {
    this.zone.runOutsideAngular(() => {
      if (this.chart) {
        this.chart.dispose();
      }
      if (this.chart1) {
        this.chart1.dispose();
      }
      if (this.chart2) {
        this.chart2.dispose();
      }
      if (this.chart3) {
        this.chart3.dispose();
      }
    });
  }

  initChart() {
    let chart = am4core.create("chartdiv", am4charts.XYChart);
    chart.colors.step = 2;

    chart.legend = new am4charts.Legend();
    chart.legend.position = "top";
    chart.legend.paddingBottom = 20;
    chart.legend.labels.template.maxWidth = 95;

    let xAxis = chart.xAxes.push(new am4charts.CategoryAxis());
    xAxis.dataFields.category = "category";
    xAxis.renderer.cellStartLocation = 0.1;
    xAxis.renderer.cellEndLocation = 0.9;
    xAxis.renderer.grid.template.location = 0;

    let yAxis = chart.yAxes.push(new am4charts.ValueAxis());
    yAxis.min = 0;

    function createSeries(value, name) {
      let series = chart.series.push(new am4charts.ColumnSeries());
      series.dataFields.valueY = value;
      series.dataFields.categoryX = "category";
      series.name = name;

      series.events.on("hidden", arrangeColumns);
      series.events.on("shown", arrangeColumns);

      let bullet = series.bullets.push(new am4charts.LabelBullet());
      bullet.interactionsEnabled = false;
      bullet.dy = 30;
      bullet.label.text = "{valueY}";
      bullet.label.fill = am4core.color("#ffffff");

      return series;
    }

    chart.data = [
      {
        category: "Jan",
        first: 40,
        second: 55,
        third: 60,
        fourth: 5,
      },
      {
        category: "Feb",
        first: 30,
        second: 78,
        third: 69,
        fourth: 5,
      },
      {
        category: "Mar",
        first: 27,
        second: 40,
        third: 45,
        fourth: 5,
      },
      {
        category: "Apr",
        first: 50,
        second: 33,
        third: 22,
        fourth: 5,
      },
      {
        category: "May",
        first: 40,
        second: 55,
        third: 60,
        fourth: 5,
      },
      {
        category: "Jun",
        first: 30,
        second: 78,
        third: 69,
        fourth: 5,
      },
      {
        category: "Jul",
        first: 27,
        second: 40,
        third: 45,
        fourth: 5,
      },
      {
        category: "Aug",
        first: 1,
        second: 2,
        third: 3,
        fourth: 5,
      },
    ];

    createSeries("first", "Package A");
    createSeries("second", "Package B");
    createSeries("third", "Package C");
    createSeries("fourth", "Package D");

    function arrangeColumns() {
      let series = chart.series.getIndex(0);

      let w =
        1 -
        xAxis.renderer.cellStartLocation -
        (1 - xAxis.renderer.cellEndLocation);
      if (series.dataItems.length > 1) {
        let x0 = xAxis.getX(series.dataItems.getIndex(0), "categoryX");
        let x1 = xAxis.getX(series.dataItems.getIndex(1), "categoryX");
        let delta = ((x1 - x0) / chart.series.length) * w;
        if (am4core.isNumber(delta)) {
          let middle = chart.series.length / 2;

          let newIndex = 0;
          chart.series.each(function (series) {
            if (!series.isHidden && !series.isHiding) {
              series.dummyData = newIndex;
              newIndex++;
            } else {
              series.dummyData = chart.series.indexOf(series);
            }
          });
          let visibleCount = newIndex;
          let newMiddle = visibleCount / 2;

          chart.series.each(function (series) {
            let trueIndex = chart.series.indexOf(series);
            let newIndex = series.dummyData;

            let dx = (newIndex - trueIndex + middle - newMiddle) * delta;

            series.animate(
              { property: "dx", to: dx },
              series.interpolationDuration,
              series.interpolationEasing
            );
            series.bulletsContainer.animate(
              { property: "dx", to: dx },
              series.interpolationDuration,
              series.interpolationEasing
            );
          });
        }
      }
    }

    this.chart = chart;
  }

  initChart1() {
    let chart = am4core.create("chartdiv1", am4charts.XYChart);
    // chart.scrollbarX = new am4core.Scrollbar();

    // Add data
    chart.data = [
      {
        country: "Jan",
        visits: 3025,
      },
      {
        country: "Feb",
        visits: 1882,
      },
      {
        country: "Mar",
        visits: 1809,
      },
      {
        country: "Apr",
        visits: 1322,
      },
      {
        country: "May",
        visits: 1122,
      },
      {
        country: "Jun",
        visits: 1114,
      },
      {
        country: "Jul",
        visits: 984,
      },
      {
        country: "Aug",
        visits: 711,
      },
    ];

    // Create axes
    let categoryAxis = chart.xAxes.push(new am4charts.CategoryAxis());
    categoryAxis.dataFields.category = "country";
    categoryAxis.renderer.grid.template.location = 0;
    categoryAxis.renderer.minGridDistance = 30;
    categoryAxis.renderer.labels.template.horizontalCenter = "right";
    categoryAxis.renderer.labels.template.verticalCenter = "middle";
    // categoryAxis.renderer.labels.template.rotation = 270;
    categoryAxis.tooltip.disabled = true;
    categoryAxis.renderer.minHeight = 110;

    let valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
    valueAxis.renderer.minWidth = 50;

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
    });

    // Cursor
    chart.cursor = new am4charts.XYCursor();

    this.chart1 = chart;
  }

  initChart2() {
    let chart = am4core.create("chartdiv2", am4charts.XYChart);

    // Add data
    chart.data = generateChartData();

    // Create axes
    let dateAxis = chart.xAxes.push(new am4charts.DateAxis());
    dateAxis.renderer.minGridDistance = 50;

    let valueAxis = chart.yAxes.push(new am4charts.ValueAxis());

    // Create series
    let series = chart.series.push(new am4charts.LineSeries());
    series.dataFields.valueY = "visits";
    series.dataFields.dateX = "date";
    series.strokeWidth = 2;
    series.minBulletDistance = 10;
    series.tooltipText = "{valueY}";
    series.tooltip.pointerOrientation = "vertical";
    series.tooltip.background.cornerRadius = 20;
    series.tooltip.background.fillOpacity = 0.5;
    series.tooltip.label.padding(12, 12, 12, 12);

    // Add scrollbar
    // chart.scrollbarX = new am4charts.XYChartScrollbar();
    // chart.scrollbarX.series.push(series);

    // Add cursor
    chart.cursor = new am4charts.XYCursor();
    chart.cursor.xAxis = dateAxis;
    chart.cursor.snapToSeries = series;

    function generateChartData() {
      let chartData = [];
      let firstDate = new Date();
      firstDate.setDate(firstDate.getDate() - 1000);
      let visits = 1200;
      for (var i = 0; i < 500; i++) {
        // we create date objects here. In your data, you can have date strings
        // and then set format of your dates using chart.dataDateFormat property,
        // however when possible, use date objects, as this will speed up chart rendering.
        let newDate = new Date(firstDate);
        newDate.setDate(newDate.getDate() + i);

        visits += Math.round(
          (Math.random() < 0.5 ? 1 : -1) * Math.random() * 10
        );

        chartData.push({
          date: newDate,
          visits: visits,
        });
      }
      return chartData;
    }

    this.chart2 = chart;
  }

  initChart3() {
    let chart = am4core.create("chartdiv3", am4charts.PieChart);

    // Add data
    chart.data = [
      {
        country: "Type 1",
        litres: 501,
      },
      {
        country: "Type 2",
        litres: 301,
      },
      {
        country: "Type 3",
        litres: 201,
      },
      {
        country: "Type 4",
        litres: 165,
      },
      {
        country: "Type 5",
        litres: 139,
      },
      {
        country: "Type 6",
        litres: 128,
      },
      {
        country: "Type 7",
        litres: 99,
      },
    ];

    // Add and configure Series
    let pieSeries = chart.series.push(new am4charts.PieSeries());
    pieSeries.dataFields.value = "litres";
    pieSeries.dataFields.category = "country";
    pieSeries.slices.template.stroke = am4core.color("#fff");
    pieSeries.slices.template.strokeOpacity = 1;

    // This creates initial animation
    pieSeries.hiddenState.properties.opacity = 1;
    pieSeries.hiddenState.properties.endAngle = -90;
    pieSeries.hiddenState.properties.startAngle = -90;

    chart.hiddenState.properties.radius = am4core.percent(0);
  }
}
