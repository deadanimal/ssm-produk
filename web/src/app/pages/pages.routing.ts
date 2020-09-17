import { Routes } from "@angular/router";
import { LandingComponent } from "./landing/landing.component";
import { Landing2Component } from "./landing2/landing2.component";
import { Search1Component } from "./search1/search1.component";
import { CbidComponent } from "./cbid/cbid.component";
import { EgovComponent } from "./egov/egov.component";
import { ReceiptComponent } from "./receipt/receipt.component";
import { DashboardComponent } from "./dashboard/dashboard.component";
import { Landing3Component } from "./landing3/landing3.component";
import { Landing4Component } from "./landing4/landing4.component";
import { ChangelogComponent } from "./changelog/changelog.component";
import { EgovDetailsComponent } from "./egov-details/egov-details.component";
import { EgovDetails2Component } from "./egov-details2/egov-details2.component";

export const PagesRoutes: Routes = [
  {
    path: "",
    children: [
      {
        path: "landing",
        component: LandingComponent,
      },
      {
        path: "landing2",
        component: Landing2Component,
      },
      {
        path: "zzzz",
        component: Search1Component,
      },
      {
        path: "cbidz",
        component: CbidComponent,
      },
      {
        path: "egov",
        component: EgovComponent,
      },
      {
        path: "egov-details",
        component: EgovDetailsComponent,
      },
      {
        path: "egov-details2",
        component: EgovDetails2Component,
      },
      {
        path: "receipt",
        component: ReceiptComponent,
      },
      {
        path: "dashboard",
        component: DashboardComponent,
      },
      {
        path: "landing3",
        component: Landing3Component,
      },
      {
        path: "landing4",
        component: Landing4Component,
      },
      {
        path: "changelog",
        component: ChangelogComponent,
      },
    ],
  },
];
