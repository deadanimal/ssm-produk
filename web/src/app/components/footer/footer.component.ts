import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {

  date: Date = new Date();

  constructor(
    private router: Router
  ) {}

  ngOnInit() {}

  navigatePage(path: string) {
    // console.log('Path: ', path)
    return this.router.navigate([path])
  }

}
