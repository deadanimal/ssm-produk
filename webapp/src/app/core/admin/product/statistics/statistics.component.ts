import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.scss']
})
export class StatisticsComponent implements OnInit {

  // Image 
  imgConstruction = 'assets/img/default/under-construction.png'
  
  constructor() { }

  ngOnInit() {
  }

}
