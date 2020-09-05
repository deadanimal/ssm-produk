import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { LoadingBarService } from '@ngx-loading-bar/core';
import { Router } from '@angular/router';
import swal from 'sweetalert2';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent implements OnInit {

  // Form
  cartForm: FormGroup

  // Data
  items: any[] = []


  // Icons


  // Checker
  isEmpty: boolean = true

  constructor(
    private fb: FormBuilder,
    private loadingBar: LoadingBarService,
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  navigatePage(path: string) {
    // console.log(path)
    this.router.navigate([path])
  }

  confirm() {
    swal.fire({
      title: 'Confirmation',
      text: 'Are you sure to continue to make payment?',
      icon: 'info',
      showCancelButton: true,
      buttonsStyling: false,
      confirmButtonText: 'Confirm',
      customClass: {
        cancelButton: 'btn btn-outline-primary ',
        confirmButton: 'btn btn-primary '
      }
    })
    console.log('confirm')
  }

}
