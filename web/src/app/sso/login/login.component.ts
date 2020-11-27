import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    this.getData()
    this.redirectSSO()
  }

  getData() {
    console.log('Login')
  }

  redirectSSO() {
    // const url = 'http://127.0.0.1:8000/SSOLogin/?sso';
    const url = 'https://ssm-product-api.pipe.my/SSOLogin/?sso'
    window.open(url, '_self')
  }

}
