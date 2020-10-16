import { Component, OnInit } from '@angular/core';

import * as moment from 'moment';

export enum SelectionType {
  single = 'single',
  multi = 'multi',
  multiClick = 'multiClick',
  cell = 'cell',
  checkbox = 'checkbox',
}

@Component({
  selector: 'app-general-enquiry',
  templateUrl: './general-enquiry.component.html',
  styleUrls: ['./general-enquiry.component.scss']
})
export class GeneralEnquiryComponent implements OnInit {

  // Table
  tableEntries: number = 20
  tableSelected: any[] = []
  tableTemp = []
  tableActiveRow: any
  tableRows: any[] = []

  tableInProgressEntries: number = 20
  tableInProgressSelected: any[] = []
  tableInProgressTemp = []
  tableInProgressActiveRow: any
  tableInProgressRows: any[] = []

  tablePendingEntries: number = 20
  tablePendingSelected: any[] = []
  tablePendingTemp = []
  tablePendingActiveRow: any
  tablePendingRows: any[] = []

  tableClosedEntries: number = 20
  tableClosedSelected: any[] = []
  tableClosedTemp = []
  tableClosedActiveRow: any
  tableClosedRows: any[] = []

  SelectionType = SelectionType

  constructor() { }

  ngOnInit() {
  }

}
