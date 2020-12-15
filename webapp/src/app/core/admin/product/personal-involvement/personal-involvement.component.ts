import { Component, OnInit, TemplateRef, ChangeDetectorRef } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {
  FormGroup,
  FormBuilder,
  Validators,
  FormControl,
} from '@angular/forms';
import swal from 'sweetalert2/dist/sweetalert2.all.min.js';
import { Router, ActivatedRoute } from '@angular/router';
import { forkJoin } from 'rxjs';
import { BsModalRef, BsModalService } from 'ngx-bootstrap';
import { LoadingBarService } from '@ngx-loading-bar/core';


import { ProductsService } from '../../../../shared/services/products/products.service';

import * as moment from 'moment';

export class FileType {
  name: string
  size: number
  file: string | ArrayBuffer
}

export enum SelectionType {
  single = 'single',
  multi = 'multi',
  multiClick = 'multiClick',
  cell = 'cell',
  checkbox = 'checkbox',
}
@Component({
  selector: 'app-personal-involvement',
  templateUrl: './personal-involvement.component.html',
  styleUrls: ['./personal-involvement.component.scss']
})
export class PersonalInvolvementComponent implements OnInit {

  // Form
  personalForm: FormGroup;
  files: FileType[] = []

  // Chart
  chart: any;

  // Modal
  modal: BsModalRef;
  modalConfig = {
    keyboard: true,
    class: 'modal-dialog-centered modal-lg',
  };

  // Table
  tableEntries: number = 5;
  tableSelected: any[] = [];
  tableTemp = [];
  tableActiveRow: any;
  tableRows: any[] = [];
  SelectionType = SelectionType;
  requestList: any;

  updateForm: FormGroup

  isCompleted: boolean = false;
  isRejected: boolean = false;
  completedDate: string = ''
  remarks: string = ''
  selectedRow;

  constructor(
    private modalService: BsModalService,
    private fb: FormBuilder,
    private cd: ChangeDetectorRef,
    private loadingBar: LoadingBarService,
    private router: Router,
    private productsService: ProductsService,
  ) {

  }

  ngOnInit() {
  }

  initForm() {
    this.personalForm = this.fb.group({
    })
    
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
        console.log('form', this.personalForm.value)
        this.personalForm.controls['documents'].patchValue(this.files)
        // console.log(this.registerForm.value)
        // console.log('he', this.registerForm.valid)
        // console.log(this.isAgree)
        // !registerForm.valid || !isAgree
        // need to run CD since file load runs outside of zone
        this.cd.markForCheck();
      };
    }
  }



  entriesChange($event) {
    this.tableEntries = $event.target.value;
  }

  filterTable($event, tests) {
    let val = $event.target.value.toLowerCase();
    this.tableTemp = this.tableRows.filter(function(d) {
      return d.title.toLowerCase().indexOf(val) ! == -1 || !val;
    });
  }

  onSelect({ selected }) {
    this.tableSelected.splice(0, this.tableSelected.length);
    this.tableSelected.push(...selected);
  }

  onActivate(event) {
    this.tableActiveRow = event.row;
  }
  
  openModal(modalRef: TemplateRef<any>, row) {

    this.selectedRow = row
    if (row) {
      if (row.status == 'PG') {
        this.isCompleted = false
      }
    }
    this.modal = this.modalService.show(
      modalRef, this.modalConfig
    );
    // this.modal = this.modalService.show(modalRef, this.modalConfig);
  } 

  closeModal() {
    this.modal.hide();
  }  

  updateApplication() {
    this.loadingBar.start()

    let application_ = this.selectedRow;

    let temp_completed_date = moment(this.completedDate).format('YYYY-MM-DD')
    temp_completed_date = temp_completed_date + 'T08:00:00.000000Z'
    this.updateForm.controls['completed_date'].setValue(temp_completed_date)

    let id_ = application_['id']
    
    let change_ = {
      'completed': this.isCompleted,
    }

    if (this.completedDate != '') {
      change_['completed_date'] = temp_completed_date
    }
    change_['remarks'] = this.remarks;
    console.log(change_)

    // this.servicesService.markAsCompleteServiceRequest(id_, change_).subscribe(
    //   (respond)=> {
    //     console.log(respond)
    //   },
    //   (error) => {
    //     this.closeModal()
    //   },
    //   () => {
    //     this.closeModal()
    //     this.initData();
    //   }
    // )
  }  

  successAlert(task) {
    swal.fire({
      
    })
    .then(() => {
      
    })
    // this.navigatePage('/enquiry');
  }

  errorAlert(task) {
    swal.fire({
      title: 'Error',
      text: task,
      type: 'error',
      buttonsStyling: false,
      confirmButtonText: 'Close',
      customClass: {
        confirmButton: 'btn btn-warning', 
      },
    })
    .then(() => {
      // this.initForm()
    })
  }

  


}
