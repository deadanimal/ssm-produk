import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { LandingComponent } from "./landing/landing.component";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { BsDropdownModule } from "ngx-bootstrap/dropdown";
import { CollapseModule } from "ngx-bootstrap/collapse";
import { CarouselModule } from "ngx-bootstrap/carousel";
import { RouterModule } from "@angular/router";
import { PagesRoutes } from "./pages.routing";
import { Landing2Component } from "./landing2/landing2.component";
import { Search1Component } from "./search1/search1.component";
import { CartComponent } from "./cart/cart.component";
import { PaginationModule } from "ngx-bootstrap/pagination";
import { TabsModule } from "ngx-bootstrap/tabs";
import { EgovComponent } from "./egov/egov.component";
import { CbidComponent } from "./cbid/cbid.component";
import { ReceiptComponent } from "./receipt/receipt.component";
import { DashboardComponent } from "./dashboard/dashboard.component";
import { Landing3Component } from "./landing3/landing3.component";
import { Landing4Component } from "./landing4/landing4.component";
import { AuditTrailComponent } from "./audit-trail/audit-trail.component";
import { ChangelogComponent } from "./changelog/changelog.component";
import { TmNgOdometerModule } from "tm-ng-odometer";
import { NgxCaptchaModule } from "ngx-captcha";
import { EgovDetailsComponent } from "./egov-details/egov-details.component";
import { HttpClient, HttpClientModule } from "@angular/common/http";
import { EgovDetails2Component } from './egov-details2/egov-details2.component';

@NgModule({
  declarations: [
    LandingComponent,
    Landing2Component,
    Search1Component,
    CartComponent,
    EgovComponent,
    CbidComponent,
    ReceiptComponent,
    DashboardComponent,
    Landing3Component,
    Landing4Component,
    AuditTrailComponent,
    ChangelogComponent,
    EgovDetailsComponent,
    EgovDetails2Component,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    BsDropdownModule.forRoot(),
    CollapseModule.forRoot(),
    CarouselModule.forRoot(),
    PaginationModule.forRoot(),
    TabsModule.forRoot(),
    RouterModule.forChild(PagesRoutes),
    TmNgOdometerModule,
    NgxCaptchaModule,
    HttpClientModule,
  ],
})
export class PagesModule {}
