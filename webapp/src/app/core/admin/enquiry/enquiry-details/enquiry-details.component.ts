import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoadingBarService } from '@ngx-loading-bar/core';
import { TicketsService } from 'src/app/shared/services/tickets/tickets.service';
import { UsersService } from 'src/app/shared/services/users/users.service';

import * as moment from 'moment';

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
  tableActiveRow: any;

  replyForm: FormGroup

  // Actions
  actionAssignTo: string = 'General'
  isAssignEnable: boolean = false
  isEscalationEnable: boolean = false

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private loadingBar: LoadingBarService,
    private ticketService: TicketsService,
    private userService: UsersService
  ) { 
    this.ticket = this.router.getCurrentNavigation().extras['ticket']
    this.user = this.userService.currentUser
    console.log(this.ticket)
    if (!this.ticket) {
      this.navigatePage('/admin/enquiry/general')
    }
  }

  ngOnInit() {
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
          else if (ticket['reply_type'] == 'CD') {
            status_ = 'Closed - Not Responded'
          }
          else if (ticket['reply_type'] == 'CO') {
            status_ = 'Closed - Resolved'
          }
          else if (ticket['reply_type'] == 'CL') {
            status_ = 'Closed'
          }

          this.ticketLog.push({
            'index': index_ ,
            'date': moment(created_date_).format('DD/MM/YYYY HH:mm'),
            'message': ticket['message'],
            'response': ticket['remarks'],
            'status': status_,
            'user': ticket['user']['full_name']
          })
        }
      )

      if (this.replyForm.value['type'] == 'AS') {
        if (this.ticket['ticket_type'] == 'General') {
          this.actionAssignTo = 'eGovernment'
        }
        else {
          this.actionAssignTo = 'General'
        }
      }
      else {
        if (this.ticket['ticket_type'] == 'General') {
          this.actionAssignTo = 'General'
        }
        else {
          this.actionAssignTo = 'eGovernment'
        }
      }
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
    this.loadingBar.start()
    this.ticketService.createReply(this.replyForm.value).subscribe(
      () => {
        this.loadingBar.complete()
      },
      () => {
        this.loadingBar.complete()
      },
      () => {
        this.changeStatus()
      }
    )
  }
  
  statusChanged() {
    if (this.replyForm.value['type'] == 'AS') {
      if (this.ticket['ticket_type'] == 'General') {
        this.actionAssignTo = 'eGovernment'
      }
      else {
        this.actionAssignTo = 'General'
      }
    }
  }

  changeStatus() {
    this.ticketService.updateStatus(this.replyForm.value).subscribe(
      () => {},
      () => {},
      () => {
        if (this.ticket['ticket_type'] == 'General') {
          this.navigatePage('/admin/enquiry/general')
        }
        else {
          this.navigatePage('/admin/enquiry/egov')
        }
      }
    )
  }

  backPage() {
    if (this.ticket['ticket_type'] == 'General') {
      this.navigatePage('/admin/enquiry/general')
    }
    else {
      this.navigatePage('/admin/enquiry/egov')
    }
  }

  navigatePage(path) {
    this.router.navigate([path])
  }
  onActivate(event) {
    this.tableActiveRow = event.row;
  } 
   /// PUSH REMINDER UNTUK ESCALATION ONLY !!
}
