import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sls',
  templateUrl: './sls.component.html',
  styleUrls: ['./sls.component.scss']
})
export class SlsComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    this.getData()
  }

  getData() {
    console.log('Single Logout Service')
  }

}
