import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss']
})
export class OrdersComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  download() {
    window.open('https://pipeline-project.sgp1.digitaloceanspaces.com/ssm/product/1599179232-96afbd34518b47af99a1fe4f488185d8.pdf', "_blank");
  }

}
