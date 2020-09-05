import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import Headroom from "headroom.js";

@Component({
  selector: 'app-core-layout',
  templateUrl: './core-layout.component.html',
  styleUrls: ['./core-layout.component.scss']
})
export class CoreLayoutComponent implements OnInit {

  constructor(
    public router: Router
  ) { }

  ngOnInit(): void {
    var headroom = new Headroom(document.querySelector('#navbar-main'), {
      offset: 300,
      tolerance: {
        up: 30,
        down: 30
      }
    })
    headroom.init()
  }

}
