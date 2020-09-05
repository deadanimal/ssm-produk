import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-kjakp',
  templateUrl: './kjakp.component.html',
  styleUrls: ['./kjakp.component.scss']
})
export class KjakpComponent implements OnInit {

  isSignUp: boolean = false

  constructor() { }

  ngOnInit(): void {
  }

  signUp() {
    this.isSignUp = true;
  }

}
