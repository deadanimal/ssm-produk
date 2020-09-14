import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/shared/services/auth/auth.service';
import { LoadingBarService } from '@ngx-loading-bar/core';
import { NotifyService } from 'src/app/shared/handler/notify/notify.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  // Image
  imgLogo = 'assets/img/logo/SSM-Logo.png'

  // Form
  focusUsername
  focusPassword
  loginForm: FormGroup
  loginFormMessages = {
    'username': [
      { type: 'required', message: 'Email is required' },
      { type: 'email', message: 'Please enter a valid email'}
    ],
    'password': [
      { type: 'required', message: 'Password is required' },
      { type: 'minLength', message: 'Password must have at least 8 characters' }
    ]
  }

  constructor(
    private authService: AuthService,
    private notifyService: NotifyService,
    private formBuilder: FormBuilder,
    private loadingBar: LoadingBarService,
    private router: Router
  ) { }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      username: new FormControl('', Validators.compose([
        Validators.required,
        Validators.email
      ])),
      password: new FormControl('', Validators.compose([
        Validators.required,
        Validators.minLength(8)
      ]))
    })
  }

  login() {
    this.loadingBar.start()
    // this.loadingBar.complete()
    // this.successMessage()
    // if (this.loginForm.value.username == 'admin@prototype.com.my') {
    //   this.authService.userRole = 1
    //   this.navigatePage('dashboard-admin')
    // }
    // else if (this.loginForm.value.username == 'user') {
    //   this.authService.userRole = 2
    //   this.navigatePage('dashboard-user')
    // }

    this.authService.obtainToken(this.loginForm.value).subscribe(
      () => {
        //
        this.authService.userRole = 1
        this.loadingBar.complete()
        this.successMessage()
      },
      () => {
        // 
        this.loadingBar.complete()
      },
      () => {
        // 
        this.navigatePage('/admin/dashboard')
      }
    )
  }

  navigatePage(path: String) {
    return this.router.navigate([path])
  }

  successMessage() {
    let title = 'Success'
    let message = 'Logging in right now'
    this.notifyService.openToastr(title, message)
  }

}
