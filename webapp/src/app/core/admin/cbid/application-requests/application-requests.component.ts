import { Component, OnInit, TemplateRef } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import {
  FormGroup,
  FormBuilder,
  Validators,
  FormControl,
} from "@angular/forms";
import swal from "sweetalert2";
import { Router, ActivatedRoute } from "@angular/router";
import { BsModalRef, BsModalService } from "ngx-bootstrap";

export enum SelectionType {
  single = "single",
  multi = "multi",
  multiClick = "multiClick",
  cell = "cell",
  checkbox = "checkbox",
}

@Component({
  selector: "app-application-requests",
  templateUrl: "./application-requests.component.html",
  styleUrls: ["./application-requests.component.scss"],
})
export class ApplicationRequestsComponent implements OnInit {
  // Chart
  chart: any;

  // Modal
  modal: BsModalRef;
  modalConfig = {
    keyboard: true,
    class: "modal-dialog-centered",
  };

  // Table
  tableEntries: number = 5;
  tableSelected: any[] = [];
  tableTemp = [];
  tableActiveRow: any;
  tableRows: any[] = [];
  SelectionType = SelectionType;
  listProject: any;

  // Form
  searchForm: FormGroup;
  searchField: FormGroup;
  addAppReqForm: FormGroup;
  editAppReqForm: FormGroup;

  constructor(
    // private zone: NgZone,
    private modalService: BsModalService,
    private formBuilder: FormBuilder,
    private http: HttpClient,
    // private loadingBar: LoadingBarService,
    private router: Router,
    private _route: ActivatedRoute
  ) {
    // this.projectData.getAll().subscribe((res) => {
    //   this.listProject = res;
    //   this.tableRows = [...res];
    //   console.log("data = ", this.listProject);
    //   console.log("Svc: ", this.tableRows);
    // });
  }

  ngOnInit() {
    this.addAppReqForm = this.formBuilder.group({
      id: new FormControl(""),
      name: new FormControl(""),
      start_date: new FormControl(""),
      expected_completion_date: new FormControl(""),
      project_timeframe: new FormControl(""),
      department: new FormControl(""),
      owner_project: new FormControl(""),
      source_of_fund: new FormControl(""),
      project_cost: new FormControl(""),
      pic: new FormControl(""),
      created_date: new FormControl(""),
      modified_date: new FormControl(""),
    });

    this.editAppReqForm = this.formBuilder.group({
      id: new FormControl(""),
      name: new FormControl(""),
      start_date: new FormControl(""),
      expected_completion_date: new FormControl(""),
      project_timeframe: new FormControl(""),
      department: new FormControl(""),
      owner_project: new FormControl(""),
      source_of_fund: new FormControl(""),
      project_cost: new FormControl(""),
      pic: new FormControl(""),
      created_date: new FormControl(""),
      modified_date: new FormControl(""),
    });
  }

  openModal(modalRef: TemplateRef<any>, row) {
    if (row) {
      console.log(row);
      this.editAppReqForm.patchValue(row);
    }
    this.modal = this.modalService.show(
      modalRef,
      Object.assign({}, { class: "gray modal-lg" })
    );
    // this.modal = this.modalService.show(modalRef, this.modalConfig);
  }

  closeModal() {
    this.modal.hide();
    this.editAppReqForm.reset();
  }

  navigatePage(path: String, id) {
    // let qq = "db17a36a-1da6-4919-9746-dfed8802ec9d";
    console.log(id);
    console.log(path + "/" + id);
    if (path == "/admin//utility/Actions") {
      return this.router.navigate([path]);
    } else if (path == "/admin/project-details") {
      return this.router.navigate([path, id]);
    }
  }

  errorAlert(task) {
    swal.fire({
      title: "Error",
      text: "Cannot " + task + " Action, Please Try Again!",
      type: "error",
      buttonsStyling: false,
      confirmButtonClass: "btn btn-danger",
      confirmButtonText: "Close",
    });
  }

  successAlert(task) {
    swal.fire({
      title: "Success",
      text: "Successfully " + task,
      type: "success",
      buttonsStyling: false,
      confirmButtonClass: "btn btn-success",
      confirmButtonText: "Close",
    });
  }
}
