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

import { ResupplyComponent } from './product/resupply/resupply.component';
import { ProductManagementComponent } from './product/product-management/product-management.component';
import { InvolvementManagementComponent } from './product/involvement-management/involvement-management.component';
import { FocManagementComponent } from './product/foc-management/foc-management.component';
import { FeeManagementComponent } from './product/fee-management/fee-management.component';
import { PersonalInvolvementComponent} from './product/personal-involvement/personal-involvement.component';

import { StatisticsComponent } from './product/statistics/statistics.component';
import { CbidAuditTrailComponent } from './cbid/audit-trail/audit-trail.component';
import { CbidReportComponent } from './cbid/report/report.component';

import { EgovEnquiryComponent } from './enquiry/egov-enquiry/egov-enquiry.component';
import { ConfigurationEnquiryComponent } from './enquiry/configuration-enquiry/configuration-enquiry.component';
import { GeneralEnquiryComponent } from './enquiry/general-enquiry/general-enquiry.component';
import { ReportEnquiryComponent } from './enquiry/report-enquiry/report-enquiry.component';

import { EgovTaskManagementComponent } from './egov/egov-task-management/egov-task-management.component';
import { EgovReportComponent } from './egov/egov-report/egov-report.component';
import { EgovDropdownComponent } from './egov/egov-dropdown/egov-dropdown.component';
import { EgovUserManagementComponent } from './egov/egov-user-management/egov-user-management.component';
import { EgovDashboardComponent } from './egov/egov-dashboard/egov-dashboard.component';
import { EnquiryDetailsComponent } from './enquiry/enquiry-details/enquiry-details.component';
import { MasterTableComponent } from './finance/master-table/master-table.component';
import { RefundDropdownsComponent } from './finance/refund-dropdowns/refund-dropdowns.component';
import { GafGeneratorComponent } from './finance/gaf-generator/gaf-generator.component';
import { SummaryReportComponent } from './finance/summary-report/summary-report.component';
import { DetailedReportComponent } from './finance/detailed-report/detailed-report.component';
import { ProductReportComponent } from './product/product-report/product-report.component';

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
        path: 'egov',
        children: [
          {
            path: 'dropdown',
            component: EgovDropdownComponent
          },
          {
            path: 'report',
            component: EgovReportComponent,
          },
          {
            path: 'task-management',
            component: EgovTaskManagementComponent,
          },
          
          {
            path: 'user-management',
            component: EgovUserManagementComponent,
          },
          {
            path: 'dashboard',
            component: EgovDashboardComponent
          }
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
          },
          {
<<<<<<< HEAD
            path: 'personal-involvement',
            component: PersonalInvolvementComponent
=======
            path: 'report',
            component: ProductReportComponent
>>>>>>> f562b2efb0b36ee430d82fac3fb1338948cf5002
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
          },
          {
            path: 'details',
            component: EnquiryDetailsComponent
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
          {
            path: 'master-transaction-table',
            children: [
              {
                path: 'summary-report',
                component: SummaryReportComponent
              },
              {
                path: 'detailed-report',
                component: DetailedReportComponent
              }
            ]
          },
          {
            path: 'refund-dropdowns',
            component: RefundDropdownsComponent
          },
          {
            path: 'gaf-generator',
            component: GafGeneratorComponent
          }
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
