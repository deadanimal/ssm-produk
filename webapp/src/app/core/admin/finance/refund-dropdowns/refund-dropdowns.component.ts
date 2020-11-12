import { Component, OnInit, TemplateRef } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { LoadingBarService } from '@ngx-loading-bar/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap';
import { TicketsService } from 'src/app/shared/services/tickets/tickets.service';
import { TransactionsService } from 'src/app/shared/services/transactions/transactions.service';

@Component({
  selector: 'app-refund-dropdowns',
  templateUrl: './refund-dropdowns.component.html',
  styleUrls: ['./refund-dropdowns.component.scss']
})
export class RefundDropdownsComponent implements OnInit {

  // data
  dropdowns: any[] = []

  // Table
  tableEntries: number = 10
  tableSelected: any[] = []
  tableTemp = []
  tableActiveRow: any
  tableRows: any[] = []

  transactions: any[] = []

  dropdownForm: FormGroup

  selectedRow: any

  // Modal
  modal: BsModalRef;
  modalConfig = {
    keyboard: true,
    class: 'modal-dialog-centered modal-lg',
  };

  constructor(
    private transactionService: TransactionsService,
    private loadingBar: LoadingBarService,
    private fb: FormBuilder,
    private modalService: BsModalService
  ) { 
    this.getData()
  }

  ngOnInit() {
    this.initForm()
  }

  getData() {
    this.loadingBar.start()
    this.transactionService.getDropdowns().subscribe(
      (res) => {
        this.loadingBar.complete()
        this.dropdowns = res
         console.log('RF', this.dropdowns)
      },
      () => {
        this.loadingBar.complete()
      },
      () => {
        this.loadTable()
      }
    )
  }

  initForm() {
    this.dropdownForm = this.fb.group({
      name: new FormControl(null, Validators.compose([
        Validators.required
      ])),
      active: new FormControl(true, Validators.compose([
        Validators.required
      ]))
    })
  }

  loadTable() {
    this.tableRows = this.dropdowns
    this.tableTemp = this.tableRows.map((prop, key) => {
      return {
        ...prop,
        id_index: key+1
      };
    })
  }

  openModal(modalRef: TemplateRef<any>) {
    this.modal = this.modalService.show(
      modalRef, this.modalConfig
    );
  } 


  openModalUpdate(modalRef: TemplateRef<any>, row) {
    console.log(row)
    this.selectedRow = row
    
    this.dropdownForm.controls['name'].setValue(row.name)
    this.dropdownForm.controls['active'].setValue(row.active)

    this.modal = this.modalService.show(
      modalRef, this.modalConfig
    );

  } 

  closeModal() {
    this.modal.hide()
    this.selectedRow = null
  }

  // Dropdown
  createDropdown() {
    this.loadingBar.start()
    this.transactionService.createDropdown(this.dropdownForm.value).subscribe(
      (res) => {
        console.log(res)
        this.loadingBar.complete()
      },
      (fail) => {
        console.log(fail)
        this.loadingBar.complete()
        this.closeModal() 
      },
      () => {
        this.getData()
        this.closeModal()
      }
    )
  }

  patchDropdown() {
    this.loadingBar.start()
    console.log(this.selectedRow.id)
    this.transactionService.patchDropdown(this.selectedRow.id, this.dropdownForm.value).subscribe(
      () => {
        this.loadingBar.complete()
      },
      () => {
        this.loadingBar.complete()
        this.closeModal()
      },
      () => {
        this.getData()
        this.closeModal()
      }
    )
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


}
