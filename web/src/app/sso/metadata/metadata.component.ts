import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/shared/services/auth/auth.service';

@Component({
  selector: 'app-metadata',
  templateUrl: './metadata.component.html',
  styleUrls: ['./metadata.component.scss']
})
export class MetadataComponent implements OnInit {

  constructor(
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.getData()
    this.redirectSSO()
  }

  getData() {
    console.log('Metadata')
    // this.authService.ssoLogin()
  }

  redirectSSO() {
    // const url = 'http://127.0.0.1:8000/SSOLogin/?sso';
    const url = 'https://ssm-product-api.pipe.my/SSOLogin/metadata/'
    window.open(url, '_self')
  }

}
