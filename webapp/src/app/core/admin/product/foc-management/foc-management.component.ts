import { Component, OnInit, TemplateRef, ChangeDetectorRef } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {
  FormGroup,
  FormBuilder,
  Validators,
  FormControl,
} from '@angular/forms';
import swal from 'sweetalert2'
import { Router, ActivatedRoute } from '@angular/router';
import { BsModalRef, BsModalService } from 'ngx-bootstrap';
import { LoadingBarService } from '@ngx-loading-bar/core';
import { UsersService } from '../../../../shared/services/users/users.service'

import { ProductsService } from '../../../../shared/services/products/products.service';

import * as moment from 'moment';

export enum SelectionType {
  single = 'single',
  multi = 'multi',
  multiClick = 'multiClick',
  cell = 'cell',
  checkbox = 'checkbox',
}

export class FileType {
  name: string
  size: number
  file: string | ArrayBuffer
}


@Component({
  selector: 'app-foc-management',
  templateUrl: './foc-management.component.html',
  styleUrls: ['./foc-management.component.scss']
})
export class FocManagementComponent implements OnInit {

  // Chart
  chart: any;

  // Modal
  modal: BsModalRef;
  modalConfig = {
    keyboard: true,
    class: 'modal-dialog-centered modal-lg',
  };

  user: any;

  // Table
  tableEntries: number = 10;
  tableSelected: any[] = [];
  tableTemp = [];
  tablefocTemp = [];
  tableActiveRow: any;
  tableRows: any[] = [];
  SelectionType = SelectionType;
  requestList: any;

  updateForm: FormGroup
  fileToUpload: File = null;

  isCompleted: boolean = false;
  isRejected: boolean = false;
  completedDate: string = ''
  remarks: string = ''
  selectedRow;

  files: FileType[]=[]

  constructor(
    private modalService: BsModalService,
    private userService: UsersService,
    private fb: FormBuilder,
    private cd: ChangeDetectorRef,
    private loadingBar: LoadingBarService,
    private router: Router,
    private productsService: ProductsService,
  ) {

  }

  ngOnInit(): void{
    while(!this.user) {
      if (this.userService.currentUser != undefined) {
        this.user = this.userService.currentUser
        console.log('User: ', this.user)
        console.log('user type' , this.user['user_type'])
        console.log('Gotcha')
      }
    }
    this.initData();
    this.initForm();

  }

  initForm(){
    this.updateForm = this.fb.group({
      name: new FormControl(null,Validators.required),
      slug: new FormControl('free_of_charge'),
      id_type: new FormControl(null),
      id_number: new FormControl(null, Validators.required),
      reason: new FormControl(null),
      files: new FormControl(null),
      status: new FormControl(null)
    })
  }

  initData() {
    this.productsService.getAll().subscribe(
      (res) => {
        this.tableRows = res;
        this.tableRows.forEach(
          (row) => {


            if(row.created_date) {
              row.created_date = moment(row.created_date).format('DD/MM/YYYY')
            }

            if(row.modified_date) {
              row.modified_date = moment(row.modified_date).format('DD/MM/YYYY')
            }

            if(row['slug'] == 'free_of_charge'){
              this.tablefocTemp.push(row)
              
            }

          }
        )        
      },
      (err) => {

      },
      () => {
        this.tablefocTemp = this.tableRows.map((prop, key) => {
          return {
            ...prop,
            id_index: key+1
          };
        });        
        console.log(this.tablefocTemp)
      }
    )
  }

  // getUser(){
  //   this.usersService.getOne().subscribe()
  // }

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
        // console.log(this.updateForm.controls['message'])
        this.updateForm.controls['files'].patchValue(this.files)
        console.log('form: ', this.updateForm.value)
        console.log('tic: ', this.updateForm)
        
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
      this.updateForm.controls['files'].patchValue(null)
    }
    else {
      this.updateForm.controls['files'].patchValue(this.files)
    }
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

  openAddModal(modalRef: TemplateRef<any>,) {
    this.modal = this.modalService.show(
      modalRef, this.modalConfig
    );
    // this.modal = this.modalService.show(modalRef, this.modalConfig);
  } 

  closeModal() {
    this.modal.hide();
    this.isCompleted = false
    this.completedDate = ''
    this.remarks = ''
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
  
  submit(){
    console.log(this.updateForm.value)
    this.productsService.create(this.updateForm.value).subscribe(
      ()=>{
        
      }
    )

  }


}
