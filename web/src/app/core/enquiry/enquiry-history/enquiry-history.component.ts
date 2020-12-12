import { Component, OnInit } from "@angular/core";
/// get ticket service
import { TicketsService } from "src/app/shared/services/ticket/ticket.service";
import { UsersService } from 'src/app/shared/services/users/users.service';
import * as moment from 'moment';
import { Router } from '@angular/router';

@Component({
  selector: 'app-enquiry-history',
  templateUrl: './enquiry-history.component.html',
  styleUrls: ['./enquiry-history.component.scss']
})
export class EnquiryHistoryComponent implements OnInit {

  listTickets: any;
  total: number;
  totaldocument: number;
  tableEntries: number = 10;
  tableActiveRow: any

  filteredTicket: any[] = []
  ticketTemp: any[] = []

  // Pagination
  page = 1;
  pageSize = 10;
  collectionSize = this.ticketTemp.length;

  user: any

  constructor(
    private ticketService: TicketsService,
    private userService: UsersService,
    private router: Router
  ) {}

  ngOnInit(): void {
    while(!this.user) {
      if (this.userService.currentUser != undefined) {
        this.user = this.userService.currentUser
        console.log('User: ', this.user)
        console.log('Gotcha')
      }
    }
    console.log(" test ",this.ticketService.getAll())
    this.ticketService.getAll().subscribe(
      (res) => {
        console.log(res);
        this.listTickets = res;

        this.listTickets.forEach(
          (ticket) => {
            if(ticket['user']) {
              if (ticket['user']['id'] == this.user['id']) {
                ticket['created_date_'] = moment(ticket['created_date']).format('DD/MM/YYYY HH:mm')
                this.filteredTicket.push(ticket)
              }
            }
          }
        )

        this.ticketTemp = this.filteredTicket

        // this.listTickets.forEach((lisz) => {
        //   this.total += lisz.total_price;
        //   this.totaldocument++;
        // });
        // console.log("ticketList => ", this.listTickets);
      },
      (err) => {
        console.log(err);
      }
    );
  }

  navigatePage(path) {
    this.router.navigate([path])
  }
  onActivate(event) {
    this.tableActiveRow = event.row;
  } 
  
  entriesChange($event) {
    this.tableEntries = $event.target.value;
  }

  viewTicket(row) {
    let extras = {
      'ticket': row
    }
    let path = '/enquiry/history/details/'
    this.router.navigate([path], extras as any)
  }

  filterTable($event, type) {
    let val = $event.target.value.toLowerCase();
    if (type == 'ticket_no') {
      console.log(val)
      this.ticketTemp = this.filteredTicket.filter(function(d) {
        return d.ticket_no.toLowerCase().indexOf(val) !== -1 || !val;
      });
    }
    else if (type == 'topic') {
      console.log(val)
      this.ticketTemp = this.filteredTicket.filter(function(d) {
        return d.topic['name_en'].toLowerCase().indexOf(val) !== -1 || !val;
      });
    }
  }


}
