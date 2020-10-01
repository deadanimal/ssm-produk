import { Component, OnInit } from "@angular/core";
import swal from "sweetalert2";
import {
  FormGroup,
  FormBuilder,
  Validators,
  FormControl,
} from "@angular/forms";
import { Router, ActivatedRoute } from "@angular/router";
/// get ticket service
import { TicketsService } from "src/app/shared/services/ticket/ticket.service";


@Component({
  selector: 'app-enquiry-general',
  templateUrl: './enquiry-general.component.html',
  styleUrls: ['./enquiry-general.component.scss']
})
export class EnquiryGeneralComponent implements OnInit {

  addNewInquiryForm: FormGroup;
  fileToUpload: File = null;

  constructor(
    private TicketsService: TicketsService,
    private formBuilder: FormBuilder,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.addNewInquiryForm = this.formBuilder.group({
      id: new FormControl(""),
      title: new FormControl("qwew"),
      description: new FormControl(""),
      ticket_type: new FormControl("GN"),
      // attached_document: new FormControl(""),
      // error_screenshot: new FormControl(""),
      // error_supporting_document: new FormControl(""),
      // error_product: new FormControl("qweqe"),
      // topic: new FormControl("asd"),
      // subject: new FormControl(""),
      user: new FormControl("38be90e7-9720-47bd-904e-2dff34c07aba"),
    });
  }

  onImageChange(event) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.addNewInquiryForm.get("image").setValue(file);
    }
  }

  onDocumentChange(event) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.addNewInquiryForm.get("attached_document").setValue(file);
    }
  }

  handleFileInput(files: FileList) {
    console.log("asdasd");
    this.fileToUpload = files.item(0);
  }

  newApplicationData() {
    console.log(this.addNewInquiryForm.value);

    // const formData = new FormData();
    // formData.append(
    //   "attached_document",
    //   this.addNewInquiryForm.get("attached_document").value
    // );
    // formData.append("image", this.addNewInquiryForm.get("image").value);
    // formData.append("document", this.addNewInquiryForm.get("document").value);

    // this.addNewInquiryForm.value.attached_document = this.fileToUpload;
    this.TicketsService.create(this.addNewInquiryForm.value).subscribe(
      (res) => {
        console.log(res);
        // console.log(res.id);
        this.successAlert("Successfully submit inquiry.");
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
        title: "Confirmation",
        text: "Are you sure to delete this data ?",
        icon: "info",
        showCancelButton: true,
        buttonsStyling: false,
        confirmButtonText: "Confirm",
        customClass: {
          cancelButton: "btn btn-outline-primary ",
          confirmButton: "btn btn-primary ",
        },
      })
      .then(() => {
        // this.deleteApplicationData(row);
      });
  }

  successAlert(task) {
    swal.fire({
      title: "Success",
      text: task,
      icon: "success",
      // showCancelButton: true,
      buttonsStyling: false,
      confirmButtonText: "Close",
      customClass: {
        cancelButton: "btn btn-outline-success",
        confirmButton: "btn btn-success ",
      },
    });
    // this.navigatePage("/enquiry");
  }

  navigatePage(path: string) {
    return this.router.navigate([path]);
  }

}
