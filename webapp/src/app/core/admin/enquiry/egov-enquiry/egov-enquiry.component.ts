import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import * as moment from 'moment';
import { TicketsService } from 'src/app/shared/services/tickets/tickets.service';

export enum SelectionType {
  single = 'single',
  multi = 'multi',
  multiClick = 'multiClick',
  cell = 'cell',
  checkbox = 'checkbox',
}


@Component({
  selector: 'app-egov-enquiry',
  templateUrl: './egov-enquiry.component.html',
  styleUrls: ['./egov-enquiry.component.scss']
})
export class EgovEnquiryComponent implements OnInit {

  // Table
  tableEntries: number = 10
  tableSelected: any[] = []
  tableTemp = []
  tableActiveRow: any
  tableRows: any[] = []

  tableInProgressEntries: number = 10
  tableInProgressSelected: any[] = []
  tableInProgressTemp = []
  tableInProgressActiveRow: any
  tableInProgressRows: any[] = []

  tablePendingEntries: number = 10
  tablePendingSelected: any[] = []
  tablePendingTemp = []
  tablePendingActiveRow: any
  tablePendingRows: any[] = []

  tableClosedEntries: number = 10
  tableClosedSelected: any[] = []
  tableClosedTemp = []
  tableClosedActiveRow: any
  tableClosedRows: any[] = []

  SelectionType = SelectionType

  allTicket: any[] = []
  pendingTicket: any[] = []
  inProgressTicket: any[] = []
  closedTicket: any[] = []
  tickets: any[]

  constructor(
    private ticketService: TicketsService,
    private router: Router
  ) { 
    this.getData()
  }

  ngOnInit() {
  }

  getData() {
    this.ticketService.getTickets().subscribe(
      () => {
        this.tickets = this.ticketService.tickets
         console.log('Tic', this.tickets)
      },
      () => {

      },
      () => {
        this.tickets.forEach(
          (ticket) => {
            ticket['created_date_'] = moment(ticket['created_date']).format('DD/MM/YYYY')
            ticket['modified_date_'] = moment(ticket['modified_date']).format('DD/MM/YYYY')

            if (ticket['ticket_type'] == 'EG') {
              ticket['ticket_type'] = 'eGovernment'
              this.allTicket.push(ticket)

              if (
                ticket['ticket_status'] == 'IP' ||
                ticket['ticket_status'] == 'US' ||
                ticket['ticket_status'] == 'IC' ||
                ticket['ticket_status'] == 'AS'
              ) {
                this.inProgressTicket.push(ticket)
              }
              else if (
                ticket['ticket_status'] == 'IQ' ||
                ticket['ticket_status'] == 'EC'
              ) {
                this.pendingTicket.push(ticket)
              }
              else if(
                ticket['ticket_status'] == 'CA' ||
                ticket['ticket_status'] == 'CR' ||
                ticket['ticket_status'] == 'CD' ||
                ticket['ticket_status'] == 'CO' ||
                ticket['ticket_status'] == 'CL'
              ) {
                this.closedTicket.push(ticket)
              }
            }
            // ticket
          }
        )
        this.loadTable()
      }
    )
  }

  loadTable() {
    this.tableRows = this.allTicket
    this.tableTemp = this.tableRows.map((prop, key) => {
      return {
        ...prop,
        id_index: key+1
      };
    })

    this.tableInProgressRows = this.inProgressTicket
    this.tableInProgressTemp = this.tableInProgressRows.map((prop, key) => {
      return {
        ...prop,
        id_index: key+1
      };
    })

    this.tablePendingRows = this.pendingTicket
    this.tablePendingTemp = this.tablePendingRows.map((prop, key) => {
      return {
        ...prop,
        id_index: key+1
      };
    })

    this.tableClosedRows = this.closedTicket
    this.tableClosedTemp = this.tableClosedRows.map((prop, key) => {
      return {
        ...prop,
        id_index: key+1
      };
    })
  }

  onSelect({ selected }) {
    this.tableSelected.splice(0, this.tableSelected.length);
    this.tableSelected.push(...selected);
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
    let path = '/admin/enquiry/details/'
    this.router.navigate([path], extras as any)
  }

}
