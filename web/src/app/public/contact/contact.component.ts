import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { LoadingBarService } from '@ngx-loading-bar/core';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {

  // Form
  contactForm: FormGroup
  focusFirstName: boolean = false
  focusLastName: boolean = false
  focusEmail: boolean = false
  focusMessage: boolean = false
  
  constructor(
    private fb: FormBuilder,
    private loadingBar: LoadingBarService
  ) { }

  ngOnInit(): void {
    this.contactForm = this.fb.group({
      first_name: new FormControl('', Validators.compose([
        Validators.required
      ])),
      last_name: new FormControl('', Validators.compose([
        Validators.required
      ])),
      email: new FormControl('', Validators.compose([
        Validators.required
      ])),
      message: new FormControl('', Validators.compose([
        Validators.required
      ]))
    })
  }

  submit() {
    this.loadingBar.start()
    console.log(this.contactForm.value)
    this.contactForm.reset()
    this.loadingBar.complete()
  }

}
