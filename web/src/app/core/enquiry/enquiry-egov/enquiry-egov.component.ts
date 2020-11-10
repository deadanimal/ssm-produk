import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import swal from 'sweetalert2';
import {
  FormGroup,
  FormBuilder,
  Validators,
  FormControl,
} from '@angular/forms';
import { Router } from '@angular/router';
/// get ticket service
import { TicketsService } from 'src/app/shared/services/ticket/ticket.service';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-enquiry-egov',
  templateUrl: './enquiry-egov.component.html',
  styleUrls: ['./enquiry-egov.component.scss']
})
export class EnquiryEgovComponent implements OnInit {

  // Data
  topicOptions
  subjectOptions

  topics: any[] = []
  subjects: any[] = []
  notes: any[] = []

  // Form
  enquiryForm: FormGroup

  fileName: string
  fileSize: number

  addNewInquiryForm: FormGroup;
  fileToUpload: File = null;

  constructor(
    private ticketService: TicketsService,
    private fb: FormBuilder,
    private router: Router,
    private cd: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    // this.addNewInquiryForm = this.fb.group({
    //   id: new FormControl(''),
    //   title: new FormControl('qwew'),
    //   description: new FormControl(''),
    //   ticket_type: new FormControl('EG'),
    //   // attached_document: new FormControl(this.fileToUpload),
    //   // error_screenshot: new FormControl(''),
    //   // error_supporting_document: new FormControl(''),
    //   // error_product: new FormControl('qweqe'),
    //   // topic: new FormControl('asd'),
    //   // subject: new FormControl(''),
    //   user: new FormControl(''),
    // });
    this.getData()
    this.initForm()
  }

  getData() {
    forkJoin([
      this.ticketService.getTopics(),
      this.ticketService.getSubjects(),
      this.ticketService.getNotes()
    ]).subscribe(
      (res) => {
        this.topics = res[0]
        this.subjects = res[1]
        this.notes = res[2]
      },
      () => {},
      () => {}
    )
  }

  initForm() {
    this.enquiryForm = this.fb.group({
      description: new FormControl(null, Validators.required),
      ticket_type: new FormControl('EG', Validators.required),
      topic: new FormControl(null, Validators.required),
      subject: new FormControl(null, Validators.required),
      user: new FormControl(null, Validators.required),
      name: new FormControl(null, Validators.required),
      email: new FormControl(null, Validators.required),
      tel_number: new FormControl(null, Validators.required),
      receipt_number: new FormControl(null, Validators.required),
      attached_document: new FormControl(null, Validators.required)
    })
  }

  onFileChange(event) {
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
        this.enquiryForm.controls['attached_document'].setValue(reader.result)
        // console.log(this.registerForm.value)
        // console.log('he', this.registerForm.valid)
        // console.log(this.isAgree)
        // !registerForm.valid || !isAgree
        // need to run CD since file load runs outside of zone
        this.cd.markForCheck();
      };
    }
  }

  removeFile() {
    this.enquiryForm.controls['attachment_letter'].setValue(null)
    delete this.fileName
    delete this.fileSize
  }

  submit() {
    console.log(this.enquiryForm.value);

    // const formData = new FormData();
    // formData.append(
    //   'attached_document',
    //   this.enquiryForm.get('attached_document').value
    // );
    // formData.append('image', this.enquiryForm.get('image').value);
    // formData.append('document', this.enquiryForm.get('document').value);

    // this.enquiryForm.value.attached_document = this.fileToUpload;
    this.ticketService.create(this.enquiryForm.value).subscribe(
      (res) => {
        console.log(res);
        // console.log(res.id);
        this.successAlert('Successfully submit enquiry.');
        // window.location.reload();
      },
      (err) => {
        console.log(err);
      }
    );
  }

  confirm(row) {
    swal
      .fire({
        title: 'Confirmation',
        text: 'Are you sure to delete this data ?',
        icon: 'info',
        showCancelButton: true,
        buttonsStyling: false,
        confirmButtonText: 'Confirm',
        customClass: {
          cancelButton: 'btn btn-outline-primary ',
          confirmButton: 'btn btn-primary ',
        },
      })
      .then(() => {
        // this.deleteApplicationData(row);
      });
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
    });
    // this.navigatePage('/enquiry');
  }

  navigatePage(path: string) {
    return this.router.navigate([path]);
  }

}
