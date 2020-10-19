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
import { ServicesService } from 'src/app/shared/services/services/services.service';
import { forkJoin } from 'rxjs';
import { QuotasService } from 'src/app/shared/services/quotas/quotas.service';

export enum SelectionType {
  single = "single",
  multi = "multi",
  multiClick = "multiClick",
  cell = "cell",
  checkbox = "checkbox",
}

@Component({
  selector: 'app-egov-user-management',
  templateUrl: './egov-user-management.component.html',
  styleUrls: ['./egov-user-management.component.scss']
})
export class EgovUserManagementComponent implements OnInit {

  // Data
  investigationRequests: any[] = []
  quotaRequests: any[] []
  egovRequests: any[] []
  tasks: any[] = []


  // Table
  tableDepartmentEntries: number = 20
  tableDepartmentSelected: any[] = []
  tableDepartmentTemp = []
  tableDepartmentActiveRow: any
  tableDepartmentRows: any[] = []

  tableMinistryEntries: number = 20
  tableMinistrySelected: any[] = []
  tableMinistryTemp = []
  tableMinistryActiveRow: any
  tableMinistryRows: any[] = []

  SelectionType = SelectionType

  constructor() { }

  ngOnInit() {
  }

  onSelect({ selected }) {
    this.tableDepartmentSelected.splice(0, this.tableDepartmentSelected.length);
    this.tableDepartmentSelected.push(...selected);
  }

  onActivate(event) {
    this.tableDepartmentActiveRow = event.row;
  } 

  entriesChange($event) {
    this.tableDepartmentEntries = $event.target.value;
  }

}
