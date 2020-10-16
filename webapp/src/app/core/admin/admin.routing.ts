import { Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ReportComponent } from './report/report.component';
import { UsersComponent } from './utility/users/users.component';
import { RbacComponent } from './utility/rbac/rbac.component';
import { AuditTrailComponent } from './utility/audit-trail/audit-trail.component';
import { ApplicationRequestsComponent } from './cbid/application-requests/application-requests.component';
import { ApprovalComponent } from './super-admin/approval/approval.component';
import { ReconcileComponent } from './finance/reconcile/reconcile.component';
import { FeesComponent } from './finance/fees/fees.component';

import { OutstandingTasksComponent } from './kjakp/outstanding-tasks/outstanding-tasks.component';
import { UsagesComponent } from './kjakp/usages/usages.component';
import { CustomerManagementComponent } from './kjakp/customer-management/customer-management.component';
//import { AddComponent } from './kjakp/customer-management/add/add.component';
// import { PackageComponent } from './kjakp/customer-management/package/package.component';
// import { RenewComponent } from './kjakp/customer-management/renew/renew.component';
// import { AddQuotaComponent } from './kjakp/customer-management/add-quota/add-quota.component';
import { ResupplyComponent } from './product/resupply/resupply.component';
import { ProductManagementComponent } from './product/product-management/product-management.component';
import { InvolvementManagementComponent } from './product/involvement-management/involvement-management.component';
import { FocManagementComponent } from './product/foc-management/foc-management.component';
import { StatisticsComponent } from './product/statistics/statistics.component';
import { CbidAuditTrailComponent } from './cbid/audit-trail/audit-trail.component';
import { CbidReportComponent } from './cbid/report/report.component';
import { FeeManagementComponent } from './product/fee-management/fee-management.component';
import { EgovEnquiryComponent } from './enquiry/egov-enquiry/egov-enquiry.component';
import { ConfigurationEnquiryComponent } from './enquiry/configuration-enquiry/configuration-enquiry.component';
import { GeneralEnquiryComponent } from './enquiry/general-enquiry/general-enquiry.component';
import { ReportEnquiryComponent } from './enquiry/report-enquiry/report-enquiry.component';

export const AdminRoutes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'dashboard',
        component: DashboardComponent,
      },
      {
        path: 'report',
        component: ReportComponent,
      },
      {
        path: 'utility',
        children: [
          {
            path: 'user-database',
            component: UsersComponent,
          },
          {
            path: 'rbac',
            component: RbacComponent,
          },
          {
            path: 'audit-trail',
            component: AuditTrailComponent,
          },
        ],
      },
      {
        path: 'kjakp',
        children: [
          {
            path: 'outstanding-tasks',
            component: OutstandingTasksComponent,
          },
          {
            path: 'usages',
            component: UsagesComponent,
          },
          {
            path: 'customer-management',
            component: CustomerManagementComponent,
            // children: [
            //   {
            //     path: 'add',
            //     component: AddComponent,
            //   },
            //   {
            //     path: 'package',
            //     component: PackageComponent,
            //   },
            //   {
            //     path: 'renew',
            //     component: RenewComponent,
            //   },
            //   {
            //     path: 'add-quota',
            //     component: AddQuotaComponent,
            //   },
            // ],
          },
        ],
      },
      {
        path: 'product',
        children: [
          {
            path: 'resupply',
            component: ResupplyComponent,
          },
          {
            path: 'product-management',
            component: ProductManagementComponent,
          },
          {
            path: 'involvement-management',
            component: InvolvementManagementComponent,
          },
          {
            path: 'foc-management',
            component: FocManagementComponent,
          },
          {
            path: 'statistics',
            component: StatisticsComponent,
          },
          {
            path: 'fee-management',
            component: FeeManagementComponent
          }
        ],
      },
      {
        path: 'enquiry',
        children: [
          {
            path: 'configuration',
            component: ConfigurationEnquiryComponent
          },
          {
            path: 'egov',
            component: EgovEnquiryComponent
          },
          {
            path: 'general',
            component: GeneralEnquiryComponent
          },
          {
            path: 'report',
            component: ReportEnquiryComponent
          }
        ],
      },
      {
        path: 'finance',
        children: [
          {
            path: 'reconcile',
            component: ReconcileComponent,
          },
          {
            path: 'fees',
            component: FeesComponent,
          },
        ],
      },
      {
        path: 'cbid',
        children: [
          {
            path: 'application-requests',
            component: ApplicationRequestsComponent,
          },
          {
            path: 'audit-trail',
            component: CbidAuditTrailComponent,
          },
          {
            path: 'report',
            component: CbidReportComponent,
          },
        ],
      },
      {
        path: 'super-admin',
        children: [
          {
            path: 'approval',
            component: ApprovalComponent,
          },
        ],
      },
    ],
  },
];
