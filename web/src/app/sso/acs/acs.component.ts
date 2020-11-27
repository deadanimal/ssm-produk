import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-acs',
  templateUrl: './acs.component.html',
  styleUrls: ['./acs.component.scss']
})
export class AcsComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    this.getData()
    this.redirectSSO()
  }

  getData() {
    console.log('Assertion Consumer Service')
  }

  redirectSSO() {
    // const url = 'http://127.0.0.1:8000/SSOLogin/?sso';
    const url = 'https://ssm-product-api.pipe.my/SSOLogin/?acs'
    window.open(url, '_self')
  }

}
