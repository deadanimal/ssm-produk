import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import {
  AccordionModule,
  BsDropdownModule,
  ModalModule,
  ProgressbarModule,
  TabsModule,
  TooltipModule,
} from "ngx-bootstrap";
import { BsDatepickerModule } from "ngx-bootstrap/datepicker";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { NgxDatatableModule } from "@swimlane/ngx-datatable";
import { LoadingBarModule } from "@ngx-loading-bar/core";

import { RouterModule } from "@angular/router";
import { AdminRoutes } from "./admin.routing";
// Page Module
import { DashboardComponent } from "./dashboard/dashboard.component";
import { RbacComponent } from "./utility/rbac/rbac.component";
import { AuditTrailComponent } from "./utility/audit-trail/audit-trail.component";
import { UsersComponent } from "./utility/users/users.component";

import { ReportComponent } from "./report/report.component";
import { OutstandingTasksComponent } from "./kjakp/outstanding-tasks/outstanding-tasks.component";
import { ApplicationRequestsComponent } from "./cbid/application-requests/application-requests.component";
import { ApprovalComponent } from "./super-admin/approval/approval.component";
import { ReconcileComponent } from "./finance/reconcile/reconcile.component";
import { FeesComponent } from "./finance/fees/fees.component";
import { TicketManagementComponent } from "./enquiry/ticket-management/ticket-management.component";
import { FormManagementComponent } from "./enquiry/form-management/form-management.component";
import { ResupplyComponent } from "./product/resupply/resupply.component";
import { ProductManagementComponent } from "./product/product-management/product-management.component";
import { InvolvementManagementComponent } from "./product/involvement-management/involvement-management.component";
import { FocManagementComponent } from "./product/foc-management/foc-management.component";
import { StatisticsComponent } from "./product/statistics/statistics.component";
import { UsagesComponent } from "./kjakp/usages/usages.component";
import { AddComponent } from "./kjakp/customer-management/add/add.component";
import { PackageComponent } from "./kjakp/customer-management/package/package.component";
import { RenewComponent } from "./kjakp/customer-management/renew/renew.component";
import { AddQuotaComponent } from "./kjakp/customer-management/add-quota/add-quota.component";
import { CbidAuditTrailComponent } from "./cbid/audit-trail/audit-trail.component";
import { CbidReportComponent } from "./cbid/report/report.component";

@NgModule({
  declarations: [
    DashboardComponent,
    ReportComponent,
    OutstandingTasksComponent,
    UsersComponent,
    RbacComponent,
    AuditTrailComponent,
    ApplicationRequestsComponent,
    ApprovalComponent,
    ReconcileComponent,
    FeesComponent,
    TicketManagementComponent,
    FormManagementComponent,
    ResupplyComponent,
    ProductManagementComponent,
    InvolvementManagementComponent,
    FocManagementComponent,
    StatisticsComponent,
    UsagesComponent,
    AddComponent,
    PackageComponent,
    RenewComponent,
    AddQuotaComponent,
    CbidAuditTrailComponent,
    CbidReportComponent,
  ],
  imports: [
    CommonModule,
    AccordionModule.forRoot(),
    BsDatepickerModule.forRoot(),
    BsDropdownModule.forRoot(),
    ModalModule.forRoot(),
    ProgressbarModule.forRoot(),
    TabsModule.forRoot(),
    TooltipModule.forRoot(),
    FormsModule,
    ReactiveFormsModule,
    LoadingBarModule,
    NgxDatatableModule,
    RouterModule.forChild(AdminRoutes),
  ],
})
export class AdminModule {}
