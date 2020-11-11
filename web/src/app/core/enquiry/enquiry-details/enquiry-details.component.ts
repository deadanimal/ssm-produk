import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoadingBarService } from '@ngx-loading-bar/core';
import * as moment from 'moment';
import { TicketsService } from 'src/app/shared/services/ticket/ticket.service';
import { UsersService } from 'src/app/shared/services/users/users.service';
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
  
  replyForm: FormGroup

  isCollapsed = false;

  constructor(
    private loadingBar: LoadingBarService,
    private fb: FormBuilder,
    private ticketService: TicketsService,
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
      message: new FormControl(null),
      remarks: new FormControl(null),
      escalation_email: new FormControl(null),
    })

    this.replyForm.controls['type'].patchValue(this.ticket['ticket_status'])
    this.replyForm.controls['ticket'].patchValue(this.ticket['id'])
    this.replyForm.controls['user'].patchValue(this.user['id'])

    console.log('<', this.replyForm.value)
  }

  replyTicket() {
    this.loadingBar.useRef('http').start()
    this.ticketService.createReply(this.replyForm.value).subscribe(
      () => {
        this.loadingBar.useRef('http').complete()
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

}
