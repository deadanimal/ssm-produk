import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import swal from 'sweetalert2';

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

  // Form
  refundForm: FormGroup

  // File attachment
  fileSize: any
  fileName: any
  fileSizeInformation = null
  fileNameInformation = null
  fileSizeInvestigGov = null
  fileNameInvestigGov = null
  fileSizeInvestigReq = null
  fileNameInvestigReq = null

  constructor(
    private fb: FormBuilder
  ) { }

  ngOnInit(): void {
  }

  initForm() {
    this.refundForm = this.fb.group({
      name: new FormControl(null, Validators.compose([
        Validators.required
      ])),
      nric: new FormControl(null, Validators.compose([
        Validators.required
      ])),
      tel_number: new FormControl(null, Validators.compose([
        Validators.required
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
      registration_application: new FormControl('Product Portal', Validators.compose([
        Validators.required
      ])),
      payment_method: new FormControl('CC', Validators.compose([
        Validators.required
      ])),
      resit_no: new FormControl(null, Validators.compose([
        Validators.required
      ])),
      total_payment_request: new FormControl(0, Validators.compose([
        Validators.required
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
        Validators.required
      ])),
      company_email: new FormControl(null, Validators.compose([
        Validators.required
      ])),
      company_fax_number: new FormControl(null, Validators.compose([
        Validators.required
      ])),
      bank_name: new FormControl('AFB', Validators.compose([
        Validators.required
      ])),
      bank_account_owner: new FormControl(null, Validators.compose([
        Validators.required
      ])),
      bank_account_number: new FormControl(null, Validators.compose([
        Validators.required
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
      attached_bank_statement: new FormControl(null, Validators.compose([
        Validators.required
      ]))
    })
  }

//   onFileChange(event, type) {
//     let reader = new FileReader();
//     this.fileSize = event.target.files[0].size
//     this.fileName = event.target.files[0].name
//     if (
//       event.target.files && 
//       event.target.files.length &&
//       this.fileSize < 5000000
//     ) {
//       const [file] = event.target.files;
//       reader.readAsDataURL(file)
//       // readAsDataURL(file);
//       // console.log(event.target)
//       // console.log(reader)
      
      
//       reader.onload = () => {
//         // console.log(reader['result'])
//         if (type == 'egovernment-letter') {
//           this.investigationForm.controls['official_letter_egov'].setValue(reader.result)
//           this.fileSizeInvestigGov = this.fileSize
//           this.fileNameInvestigGov = this.fileName
//         }
//         else if (type == 'request-letter') {
//           this.investigationForm.controls['official_letter_request'].setValue(reader.result)
//           this.fileSizeInvestigReq = this.fileSize
//           this.fileNameInvestigReq = this.fileName
//         }
//         if (type == 'quota') {
//           this.quotaForm.controls['attachment_letter'].setValue(reader.result)
//         }
        
//         // console.log(this.registerForm.value)
//         // console.log('he', this.registerForm.valid)
//         // console.log(this.isAgree)
//         // !registerForm.valid || !isAgree
//         // need to run CD since file load runs outside of zone
//         this.cd.markForCheck();
//       };
//     }
//   }

//   removeFile(type) {
//     if (type == 'update') {
//      this.informationForm.controls['attachment_letter'].setValue(null)
//      this.fileSizeInformation = null
//      this.fileNameInformation = null
//    }
//    else if (type == 'egovernment-letter') {
//      this.fileSizeInvestigGov = null
//      this.fileNameInvestigGov = null
//    }
//    else if (type == 'request-letter') {
//      this.fileSizeInvestigReq = null
//      this.fileNameInvestigReq = null
//    }
//    this.fileName = null
//    this.fileSize = null
//  }

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
