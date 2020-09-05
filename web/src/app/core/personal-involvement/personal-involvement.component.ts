import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-personal-involvement',
  templateUrl: './personal-involvement.component.html',
  styleUrls: ['./personal-involvement.component.scss']
})
export class PersonalInvolvementComponent implements OnInit {

  // Form
  entities = 'rob'
  

  // Search
  focus
  searchField: string = ''

  // Checker
  isEmpty
  isNoResult = false
  isGotResult

  // Options
  searchOpts = [
    { text: 'Audit Firm', value: 'audit-firm' },
    { text: 'Business', value: 'business' },
    { text: 'Company', value: 'company' }
  ]

  constructor(
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  navigatePage(path: string) {
    // console.log('Path: ', path)
    this.router.navigate([path])
  }

  search() {
    this.isNoResult = true
    // if (this.searchField == '') {

    // }
  }

}
