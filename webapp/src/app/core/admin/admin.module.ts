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
import { NgSelectModule } from '@ng-select/ng-select';

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

import { ResupplyComponent } from "./product/resupply/resupply.component";
import { ProductManagementComponent } from "./product/product-management/product-management.component";
import { InvolvementManagementComponent } from "./product/involvement-management/involvement-management.component";
import { FocManagementComponent } from "./product/foc-management/foc-management.component";
import { StatisticsComponent } from "./product/statistics/statistics.component";
import { UsagesComponent } from "./kjakp/usages/usages.component";
//import { AddComponent } from "./kjakp/customer-management/add/add.component";
import { CustomerManagementComponent } from './kjakp/customer-management/customer-management.component';
import { PackageComponent } from "./kjakp/customer-management/package/package.component";
import { RenewComponent } from "./kjakp/customer-management/renew/renew.component";
import { AddQuotaComponent } from "./kjakp/customer-management/add-quota/add-quota.component";
import { CbidAuditTrailComponent } from "./cbid/audit-trail/audit-trail.component";
import { CbidReportComponent } from "./cbid/report/report.component";
import { FeeManagementComponent } from './product/fee-management/fee-management.component';
import { GeneralEnquiryComponent } from './enquiry/general-enquiry/general-enquiry.component';
import { EgovEnquiryComponent } from './enquiry/egov-enquiry/egov-enquiry.component';
import { ConfigurationEnquiryComponent } from './enquiry/configuration-enquiry/configuration-enquiry.component';
import { ReportEnquiryComponent } from './enquiry/report-enquiry/report-enquiry.component';

import { EgovDashboardComponent } from './egov/egov-dashboard/egov-dashboard.component';
import { EgovDropdownComponent } from './egov/egov-dropdown/egov-dropdown.component';
import { EgovReportComponent } from './egov/egov-report/egov-report.component';
import { EgovTaskManagementComponent } from './egov/egov-task-management/egov-task-management.component';
import { EgovUserManagementComponent } from './egov/egov-user-management/egov-user-management.component';
import { QuillModule } from 'ngx-quill';
import { EnquiryDetailsComponent } from './enquiry/enquiry-details/enquiry-details.component';
import { RefundDropdownsComponent } from './finance/refund-dropdowns/refund-dropdowns.component';
import { MasterTableComponent } from './finance/master-table/master-table.component';
import { GafGeneratorComponent } from './finance/gaf-generator/gaf-generator.component';
import { SummaryReportComponent } from './finance/summary-report/summary-report.component';
import { DetailedReportComponent } from './finance/detailed-report/detailed-report.component';
<<<<<<< HEAD
import { PersonalInvolvementComponent } from './product/personal-involvement/personal-involvement.component';
=======
import { ProductReportComponent } from './product/product-report/product-report.component';
>>>>>>> f562b2efb0b36ee430d82fac3fb1338948cf5002

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
    ResupplyComponent,
    ProductManagementComponent,
    InvolvementManagementComponent,
    FocManagementComponent,
    StatisticsComponent,
    UsagesComponent,
    CustomerManagementComponent,
    // AddComponent,
    PackageComponent,
    RenewComponent,
    AddQuotaComponent,
    CbidAuditTrailComponent,
    CbidReportComponent,
    FeeManagementComponent,
    GeneralEnquiryComponent,
    EgovEnquiryComponent,
    ConfigurationEnquiryComponent,
    ReportEnquiryComponent,
    EgovDashboardComponent,
    EgovDropdownComponent,
    EgovReportComponent,
    EgovTaskManagementComponent,
    EgovUserManagementComponent,
    EnquiryDetailsComponent,
    RefundDropdownsComponent,
    MasterTableComponent,
    GafGeneratorComponent,
    SummaryReportComponent,
    DetailedReportComponent,
<<<<<<< HEAD
    PersonalInvolvementComponent
=======
    ProductReportComponent
>>>>>>> f562b2efb0b36ee430d82fac3fb1338948cf5002
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
    NgSelectModule,
    NgxDatatableModule,
    QuillModule,
    RouterModule.forChild(AdminRoutes),
  ],
})
export class AdminModule {}
