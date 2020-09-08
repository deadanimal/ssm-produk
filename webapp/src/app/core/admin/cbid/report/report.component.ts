import {
  Component,
  OnInit,
  OnDestroy,
  NgZone,
  TemplateRef,
} from "@angular/core";
import { User } from "src/assets/mock/admin-user/users.model";
import { MocksService } from "src/app/shared/services/mocks/mocks.service";

import * as moment from "moment";
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";
import { BsModalRef, BsModalService } from "ngx-bootstrap";
am4core.useTheme(am4themes_animated);

import swal from "sweetalert2";
import {
  FormGroup,
  FormBuilder,
  Validators,
  FormControl,
} from "@angular/forms";

export enum SelectionType {
  single = "single",
  multi = "multi",
  multiClick = "multiClick",
  cell = "cell",
  checkbox = "checkbox",
}

@Component({
  selector: "app-report",
  templateUrl: "./report.component.html",
  styleUrls: ["./report.component.scss"],
})
export class CbidReportComponent implements OnInit {
  // Chart
  chart: any;

  // Modal
  modal: BsModalRef;
  modalConfig = {
    keyboard: true,
    class: "modal-dialog-centered",
  };

  // Form
  registerForm: FormGroup;
  registerFormMessages = {
    name: [{ type: "required", message: "Name is required" }],
    email: [
      { type: "required", message: "Email is required" },
      { type: "email", message: "A valid email is required" },
    ],
  };

  constructor(
    private mockService: MocksService,
    private modalService: BsModalService,
    private formBuilder: FormBuilder,
    private zone: NgZone
  ) {
    // this.getData()
  }

  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      name: new FormControl("", Validators.compose([Validators.required])),
      email: new FormControl(
        "",
        Validators.compose([Validators.required, Validators.email])
      ),
    });
  }

  ngOnDestroy() {
    // this.zone.runOutsideAngular(() => {
    //   if (this.chart) {
    //     this.chart.dispose()
    //   }
    // })
  }

  getCharts() {
    // this.zone.runOutsideAngular(() => {
    //   this.getChart()
    // })
  }

  openModal(modalRef: TemplateRef<any>) {
    this.modal = this.modalService.show(modalRef, this.modalConfig);
  }

  closeModal() {
    this.modal.hide();
    this.registerForm.reset();
  }

  confirm() {
    swal.fire({
      title: "Success",
      text: "You have successfully export report!",
      type: "success",
      buttonsStyling: false,
      confirmButtonClass: "btn btn-success",
      confirmButtonText: "Success",
      showCancelButton: false,
      // cancelButtonClass: "btn btn-danger",
      // cancelButtonText: "Cancel"
    });
  }

  register() {
    swal
      .fire({
        title: "Success",
        text: "A new user has been created!",
        type: "success",
        buttonsStyling: false,
        confirmButtonClass: "btn btn-success",
        confirmButtonText: "Close",
      })
      .then((result) => {
        if (result.value) {
          this.modal.hide();
          this.registerForm.reset();
        }
      });
  }
}
