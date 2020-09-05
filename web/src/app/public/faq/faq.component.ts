import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-faq',
  templateUrl: './faq.component.html',
  styleUrls: ['./faq.component.scss']
})
export class FaqComponent implements OnInit {

  // Accordian
  isCollapsed = false;
  isCollapsed1 = true;
  isCollapsed2 = true;
  isCollapsed3 = true;
  isCollapsed4 = true;

  constructor() { }

  ngOnInit(): void {
  }

}
