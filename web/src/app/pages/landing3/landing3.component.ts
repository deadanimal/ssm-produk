import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-landing3',
  templateUrl: './landing3.component.html',
  styleUrls: ['./landing3.component.scss']
})
export class Landing3Component implements OnInit {

  focus 
  public totalCompanies: number = 1360941;
  public totalBusinessess: number = 7810212;
  
  constructor(
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  navigatePage(path: string) {
    // console.log('Path: ', path)
    this.router.navigate([path])
  }

}
