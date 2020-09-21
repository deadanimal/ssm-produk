import { Component, OnInit, TemplateRef } from "@angular/core";
import { BsModalRef, BsModalService } from "ngx-bootstrap/modal";
import swal from "sweetalert2";

@Component({
  selector: "app-request-investigation-document",
  templateUrl: "./request-investigation-document.component.html",
  styleUrls: ["./request-investigation-document.component.scss"],
})
export class RequestInvestigationDocumentComponent implements OnInit {
  // Modal
  modalTransactionDetail: BsModalRef;
  modalConfig = {
    keyboard: true,
    class: "modal-dialog-centered modal-xl",
  };

  constructor(private modalService: BsModalService) {}

  ngOnInit(): void {}

  openTransactionDetail(modalRef: TemplateRef<any>) {
    this.modalTransactionDetail = this.modalService.show(
      modalRef,
      this.modalConfig
    );
  }

  closeTransactionDetail() {
    this.modalTransactionDetail.hide();
  }

  downloadReceipt() {}

  successDownload() {
    swal
      .fire({
        title: "Success",
        text: "Successfully downloaded",
        icon: "success",
        buttonsStyling: false,
        confirmButtonText: "Ok",
        customClass: {
          confirmButton: "btn btn-outline-success ",
        },
      })
      .then((result) => {
        if (result.value) {
          window.open(
            "https://pipeline-project.sgp1.digitaloceanspaces.com/ssm/product/1599179232-96afbd34518b47af99a1fe4f488185d8.pdf",
            "_blank"
          );
        }
      });
    console.log("confirm");
  }

  failedDownload() {
    swal.fire({
      title: "Receipt failed to generate",
      text: "Please contact SSM Enquiry",
      icon: "warning",
      showCancelButton: true,
      buttonsStyling: false,
      confirmButtonText: "Confirm",
      customClass: {
        cancelButton: "btn btn-outline-primary ",
        confirmButton: "btn btn-primary ",
      },
    });
    console.log("confirm");
  }
}
