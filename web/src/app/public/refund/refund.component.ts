import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { TransactionsService } from '../../shared/services/transactions/transactions.service';
import swal from 'sweetalert2';
import * as moment from 'moment';

export class FileType {
  name: string
  size: number
  file: string | ArrayBuffer
}

@Component({
  selector: 'app-refund',
  templateUrl: './refund.component.html',
  styleUrls: ['./refund.component.scss']
})
export class RefundComponent implements OnInit {


  // Checker
  isAgree: boolean = false
  dropdowns: any[] = []

  currentDate: Date = new Date()

  // Form
  refundForm: FormGroup
  refundFormMessages = {
    'tel_number': [
      { type: 'pattern', message: 'A valid phone no. is required' }
    ],
    'total_payment_request': [
      { type: 'pattern', message: 'A valid number is required' }
    ],
    'company_fax_number': [
      { type: 'pattern', message: 'A valid fax no. is required' }
    ],
    'bank_account_number': [
      { type: 'pattern', message: 'A valid account no. is required' }
    ],
    'company_tel_number': [
      { type: 'pattern', message: 'A valid phone no. is required' }
    ]
  }
  // Aduh
  // File attachment
  fileSize: any
  fileName: any
  fileSizeReceipt = null
  fileNameReceipt = null
  fileSizeError = null
  fileNameError = null
  fileSizeStatement = null
  fileNameStatement = null

  constructor(
    private fb: FormBuilder,
    private cd: ChangeDetectorRef,
    private transactionService: TransactionsService
  ) { 
    this.getData()
  }

  ngOnInit(): void {
    this.initForm()
    let today = new Date()
    // this.currentDate = moment(today).format('DD/MM/YYYY')
    console.log(this.currentDate)
    // console.log(new Date(), '----', new Date().toJSON());
  }

  getData() {
    this.transactionService.getDropdowns().subscribe(
      (res) => {
        this.dropdowns = res
      },
      () => {

      },
      () => {

      }
    )
  }

  initForm() {
    this.refundForm = this.fb.group({
      name: new FormControl(null, Validators.compose([
        Validators.required
      ])),
      id_number: new FormControl(null, Validators.compose([
        Validators.required
      ])),
      tel_number: new FormControl(null, Validators.compose([
        Validators.required,
        Validators.pattern("^[0-9]*$")
      ])),
      email: new FormControl(null, Validators.compose([
        Validators.required
      ])),
      transaction_date: new FormControl(null, Validators.compose([
        Validators.required
      ])),
      transaction_reference_no: new FormControl(null, Validators.compose([
        Validators.required
      ])),
      entity: new FormControl(null, Validators.compose([
        Validators.required
      ])),
      registration_application: new FormControl('XCESS PORTAL', Validators.compose([
        Validators.required
      ])),
      payment_method: new FormControl('CC', Validators.compose([
        Validators.required
      ])),
      receipt_no: new FormControl(null, Validators.compose([
        Validators.required
      ])),
      total_payment_request: new FormControl(0, Validators.compose([
        Validators.required,
        Validators.pattern("^[0-9]*$")
      ])),
      reason: new FormControl('BB', Validators.compose([
        Validators.required
      ])),
      company_requestor_name: new FormControl(null, Validators.compose([
        Validators.required
      ])),
      company_owner_name: new FormControl(null, Validators.compose([
        Validators.required
      ])),
      company_address: new FormControl(null, Validators.compose([
        Validators.required
      ])),
      company_mail_address: new FormControl(null, Validators.compose([
        Validators.required
      ])),
      company_tel_number: new FormControl(null, Validators.compose([
        Validators.required,
        Validators.pattern("^[0-9]*$")
      ])),
      company_email: new FormControl(null, Validators.compose([
        Validators.required
      ])),
      company_fax_number: new FormControl(null, Validators.compose([
        Validators.pattern("^[0-9]*$")
      ])),
      bank_name: new FormControl('AFB', Validators.compose([
        Validators.required
      ])),
      bank_account_owner: new FormControl(null, Validators.compose([
        Validators.required
      ])),
      bank_address: new FormControl(null, Validators.compose([
        Validators.required
      ])),
      bank_account_number: new FormControl(null, Validators.compose([
        Validators.required,
        Validators.pattern("^[0-9]*$")
      ])),
      bank_registered_nric: new FormControl(null, Validators.compose([
        Validators.required
      ])),
      bank_account_type: new FormControl(null, Validators.compose([
        Validators.required
      ])),
      bank_branch: new FormControl(null, Validators.compose([
        Validators.required
      ])),
      attached_receipt: new FormControl(null, Validators.compose([
        Validators.required
      ])),
      attached_error_transaction: new FormControl(null, Validators.compose([
        Validators.required
      ])),
      attached_bank_statement: new FormControl(null),
      toc: new FormControl(false, Validators.compose([
        Validators.required
      ]))
    })
  }

  onFileChange(event, type) {
    let reader = new FileReader();
    this.fileSize = event.target.files[0].size
    this.fileName = event.target.files[0].name
    if (
      event.target.files &&
      event.target.files.length &&
      this.fileSize < 5000000
    ) {
      const [file] = event.target.files;
      reader.readAsDataURL(file)
      // readAsDataURL(file);
      // console.log(event.target)
      // console.log(reader)


      reader.onload = () => {
        // console.log(reader['result'])
        if (type == 'attached_receipt') {
          this.refundForm.controls['attached_receipt'].setValue(reader.result)
          this.fileSizeReceipt = this.fileSize
          this.fileNameReceipt = this.fileName
        }
        else if (type == 'attached_error_transaction') {
          this.refundForm.controls['attached_error_transaction'].setValue(reader.result)
          this.fileSizeError = this.fileSize
          this.fileNameError = this.fileName
        }
        else if (type == 'attached_bank_statement') {
          this.refundForm.controls['attached_bank_statement'].setValue(reader.result)
          this.fileSizeStatement = this.fileSize
          this.fileNameStatement = this.fileName
        }

        // console.log(this.registerForm.value)
        // console.log('he', this.registerForm.valid)
        // console.log(this.isAgree)
        // !registerForm.valid || !isAgree
        // need to run CD since file load runs outside of zone
        this.cd.markForCheck();
      };
    }
    else {
      let message = 'PDF FORMAT ONLY, 5MB MAXIMUM'
      this.errorAlert(message)
    }
  }

  removeFile(type) {
    if (type == 'attached_receipt') {
      this.refundForm.controls['attached_receipt'].setValue(null)
      this.fileSizeReceipt = null
      this.fileNameReceipt = null
    }
    else if (type == 'attached_error_transaction') {
      this.refundForm.controls['attached_error_transaction'].setValue(null)
      this.fileSizeError = null
      this.fileNameError = null
    }
    else if (type == 'attached_bank_statement') {
      this.refundForm.controls['attached_bank_statement'].setValue(null)
      this.fileSizeStatement = null
      this.fileNameStatement = null
    }
    this.fileName = null
    this.fileSize = null
  }

  submitRefundForm() {
    let message = 'Successfully sent refund form'
    setTimeout(
      () => {
        this.successAlert(message)
      }, 1500
    )
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

  continueRefund() {
    this.isAgree = true
  }

}
