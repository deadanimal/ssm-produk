import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-search1',
  templateUrl: './search1.component.html',
  styleUrls: ['./search1.component.scss']
})
export class Search1Component implements OnInit {

  isProceed: boolean = false

  constructor(
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
  }

  proceed() {
    this.isProceed = true
  }

  addCart() {
    let title = 'Success'
    let message = 'Item is added to the cart'
    this.toastr.success(message, title)
  }

}
