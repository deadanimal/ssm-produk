import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoadingBarService } from '@ngx-loading-bar/core';
import * as moment from 'moment';
import swal from 'sweetalert2'
import { TicketsService } from 'src/app/shared/services/ticket/ticket.service';
import { UsersService } from 'src/app/shared/services/users/users.service';

export class FileType {
  name: string
  size: number
  file: string | ArrayBuffer
}

@Component({
  selector: 'app-enquiry-details',
  templateUrl: './enquiry-details.component.html',
  styleUrls: ['./enquiry-details.component.scss']
})
export class EnquiryDetailsComponent implements OnInit {

  // Data
  ticket: any
  user: any
  ticketLog: any[] = []
  
  replyForm: FormGroup;
  fileToUpload: File = null;

  files: FileType[] = []

  isRead: boolean;
  clicked = false;
  isCollapsed = false;

  constructor(
    private loadingBar: LoadingBarService,
    private fb: FormBuilder,
    private ticketService: TicketsService,
    private cd: ChangeDetectorRef,
    private router: Router,
    private userService: UsersService
  ) { 
    this.ticket = this.router.getCurrentNavigation().extras['ticket']
    this.user = this.userService.currentUser
    console.log(this.ticket)
    if (!this.ticket) {
      this.navigatePage('/enquiry')
    }
  }

  ngOnInit(): void {
    this.initForm()
    let index_ = 0
    if (this.ticket['ticket_replies']) {
      this.ticket['ticket_replies'].forEach(
        (ticket) => {
          index_ = index_ + 1
          let created_date_ = ticket['created_date']
          let status_ = ''

          if (ticket['reply_type'] == 'US') {
            status_ = 'In Progress'
          }
          else if (ticket['reply_type'] == 'IP') {
            status_ = 'In Progress'
          }
          else if (ticket['reply_type'] == 'IQ') {
            status_ = 'In Progress - Response Required'
          }
          else if (ticket['reply_type'] == 'IC') {
            status_ = 'In Progress - Response Received'
          }
          else if (ticket['reply_type'] == 'AS') {
            status_ = 'Assigned'
          }
          else if (ticket['reply_type'] == 'EC') {
            status_ = 'Escalation'
          }
          else if (ticket['reply_type'] == 'CA') {
            status_ = 'Closed - Assigned'
          }
          else if (ticket['reply_type'] == 'CR') {
            status_ = 'Closed - Not Related'
          }
          else if (ticket['reply_type'] == 'C') {
            status_ = 'Closed - Not Responded'
          }
          else if (ticket['reply_type'] == 'CO') {
            status_ = 'Closed - Resolved'
          }
          else if (ticket['reply_type'] == 'CL') {
            status_ = 'Closed'
          }

          this.ticketLog.push({
            'index': index_,
            'date': moment(created_date_).format('DD/MM/YYYY HH:mm'),
            'message': ticket['message'],
            'response': ticket['remarks'],
            'status': status_,
            'user': ticket['user']['full_name']
          })
        }
      )
    }

    let created_ = this.ticket['created_date']
    this.ticketLog.push({
      'index': index_ + 1,
      'date': moment(created_).format('DD/MM/YYYY HH:mm'),
      'message': 'Ticket Created',
      'response': '',
      'status': 'Created',
      'user': this.ticket['user']['full_name']
    })
  }

  initForm() {
    this.replyForm = this.fb.group({
      ticket: new FormControl(null, Validators.compose([
        Validators.required
      ])),
      user: new FormControl(null, Validators.compose([
        Validators.required
      ])),
      type: new FormControl(null, Validators.compose([
        Validators.required
      ])),
      message: new FormControl(null, Validators.required),
      remarks: new FormControl(null),
      escalation_email: new FormControl(null),
      documents: new FormControl(null, Validators.required),
    })

    this.replyForm.controls['type'].patchValue(this.ticket['ticket_status'])
    this.replyForm.controls['ticket'].patchValue(this.ticket['id'])
    this.replyForm.controls['user'].patchValue(this.user['id'])
    console.log(this.ticket['ticket_status'] = 'IC')
    console.log(this.ticket)
    console.log('<', this.replyForm.value)
    
  }

  replyTicket() {
    this.loadingBar.useRef('http').start()
    this.ticket['ticket_status'] = 'IC'
    this.replyForm.controls['type'].patchValue(this.ticket['ticket_status']) 
    this.ticketService.createReply(this.replyForm.value).subscribe(
      () => {
        this.loadingBar.useRef('http').complete()
        let message = 'Successfully submitted'
        this.successAlert(message);
        this.replyForm.reset()
        this.files = []
        this.isCollapsed = false;
      },
      () => {
        this.loadingBar.useRef('http').complete()
      },
      () => {
        this.changeStatus()
      }
    )
  }

  changeStatus() {
    // console.log(this.replyForm.value['type'])
    this.ticketService.updateStatus(this.replyForm.value).subscribe(
      () => {},
      () => {},
      () => {

      }
    )
  }

  navigatePage(path) {
    this.router.navigate([path])
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
      this.files.length > 4
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
        console.log(this.replyForm.controls['message'])
        this.replyForm.controls['documents'].patchValue(this.files)
        console.log('form: ', this.replyForm.value)
        console.log('tic: ', this.replyForm)
        
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
      this.replyForm.controls['documents'].patchValue(null)
    }
    else {
      this.replyForm.controls['documents'].patchValue(this.files)
    }
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
      // this.navigatePage('/enquiry/history')
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

}
