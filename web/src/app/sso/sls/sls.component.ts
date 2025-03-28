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
    this.redirectSSO()
  }

  getData() {
    console.log('Single Logout Service')
  }

  redirectSSO() {
    // const url = 'http://127.0.0.1:8000/SSOLogin/?sso';
    const url = 'https://ssm-product-api.pipe.my/SSOLogin/?sls'
    window.open(url, '_self')
  }

}
