import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-outstanding-tasks',
  templateUrl: './outstanding-tasks.component.html',
  styleUrls: ['./outstanding-tasks.component.scss']
})
export class OutstandingTasksComponent implements OnInit {

  // Image 
  imgConstruction = 'assets/img/default/under-construction.png'
  
  constructor() { }

  ngOnInit() {
  }

}
