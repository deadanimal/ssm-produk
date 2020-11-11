import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import swal from 'sweetalert2';
import {
  FormGroup,
  FormBuilder,
  Validators,
  FormControl,
} from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
/// get ticket service
import { TicketsService } from 'src/app/shared/services/ticket/ticket.service';
import { forkJoin } from 'rxjs';
import { UsersService } from 'src/app/shared/services/users/users.service';
import { LoadingBarService } from '@ngx-loading-bar/core';

export class FileType {
  name: string
  size: number
  file: string | ArrayBuffer
}

@Component({
  selector: 'app-enquiry-general',
  templateUrl: './enquiry-general.component.html',
  styleUrls: ['./enquiry-general.component.scss']
})
export class EnquiryGeneralComponent implements OnInit {

  // Form
  enquiryForm: FormGroup;
  fileToUpload: File = null;

  user: any

  topics: any[] = []
  subjects: any[] = []
  notes: any[] = []

  files: FileType[] = []

  constructor(
    private ticketService: TicketsService,
    private fb: FormBuilder,
    private router: Router,
    private cd: ChangeDetectorRef,
    private userService: UsersService,
    private loadingBar: LoadingBarService
  ) {}

  ngOnInit(): void {
    this.getData()
    this.initForm()
  }

  getData() {
    forkJoin([
      this.ticketService.getTopics(),
      this.ticketService.getSubjects(),
      this.ticketService.getNotes()
    ]).subscribe(
      (res) => {
        this.topics = res[0]
        this.subjects = res[1]
        this.notes = res[2]
      },
      () => {},
      () => {}
    )
  }

  initForm() {
    this.enquiryForm = this.fb.group({
      description: new FormControl(null, Validators.required),
      ticket_type: new FormControl('GN', Validators.required),
      topic: new FormControl(null, Validators.required),
      subject: new FormControl(null, Validators.required),
      user: new FormControl(null, Validators.required),
      phone_number: new FormControl(null, Validators.required),
      receipt_number: new FormControl(null),
      documents: new FormControl(null)
    })
    
    while(!this.user) {
      if (this.userService.currentUser != undefined) {
        this.user = this.userService.currentUser
        this.enquiryForm.controls['user'].patchValue(this.user['id'])
        this.enquiryForm.controls['phone_number'].patchValue(this.user['phone_number'])
        console.log('Gotcha')
      }
    }
  }

  onFileChange(event) {
    let reader = new FileReader();
    let file_: FileType = {
      'size': event.target.files[0].size,
      'name': event.target.files[0].name,
      'file': null
    }

    if (
      file_['size'] > 2000000 ||
      this.files.length > 5
    ) {
      let task = 'Maximum number of attachments is 5. Maximum size for each 2MB file (file format: .DOC, .DOCX, .JPG, .JPEG, .PNG, .PDF)'
      this.errorAlert(task)
    }
    else if (
      event.target.files && 
      event.target.files.length &&
      file_['size'] < 2000000
    ) {
      const [file] = event.target.files;
      reader.readAsDataURL(file)
      // readAsDataURL(file);
      // console.log(event.target)
      // console.log(reader)
      
      
      reader.onload = () => {
        // console.log(reader['result'])
        file_ = {
          'size': event.target.files[0].size,
          'name': event.target.files[0].name,
          'file': reader.result
        }
        this.files.push(file_)
        console.log('file: ', this.files)
        console.log('form', this.enquiryForm.value)
        this.enquiryForm.controls['documents'].patchValue(this.files)
        // console.log(this.registerForm.value)
        // console.log('he', this.registerForm.valid)
        // console.log(this.isAgree)
        // !registerForm.valid || !isAgree
        // need to run CD since file load runs outside of zone
        this.cd.markForCheck();
      };
    }
  }

  removeFile(row) {
    this.files.splice(this.files.findIndex(req => req['name'] === row['name']), 1)

    if (this.files.length == 0) {
      this.enquiryForm.controls['documents'].patchValue(null)
    }
    else {
      this.enquiryForm.controls['documents'].patchValue(this.files)
    }
  }

  submit() {
    console.log(this.enquiryForm.value);
    this.loadingBar.useRef('http').start()
    this.ticketService.create(this.enquiryForm.value).subscribe(
      (res) => {
        this.loadingBar.useRef('http').complete()
        // console.log(res.id);

        let message = 'Your enquiry is submitted. Your ticket number is ' + res.ticket_no
        this.successAlert(message);

        this.enquiryForm.reset()
        this.files = []
        
        // window.location.reload();
      },
      (err) => {
        this.loadingBar.useRef('http').complete()
        console.log(err);
      }
    );
  }

  successAlert(task) {
    swal.fire({
      title: 'Success',
      text: task,
      icon: 'success',
      // showCancelButton: true,
      buttonsStyling: false,
      confirmButtonText: 'Close',
      customClass: {
        cancelButton: 'btn btn-outline-success',
        confirmButton: 'btn btn-success ',
      },
    })
    .then(() => {
      this.initForm()
      this.navigatePage('/enquiry/history')
    })
    // this.navigatePage('/enquiry');
  }

  errorAlert(task) {
    swal.fire({
      title: 'Error',
      text: task,
      icon: 'warning',
      buttonsStyling: false,
      confirmButtonText: 'Close',
      customClass: {
        confirmButton: 'btn btn-warning ',
      },
    })
    .then(() => {
      // this.initForm()
    })
  }

  navigatePage(path: string) {
    return this.router.navigate([path]);
  }

}
