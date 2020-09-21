import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

import { NgxDatatableModule } from "@swimlane/ngx-datatable";
import { NgxSpinnerModule } from "ngx-spinner";

import { BsDropdownModule } from "ngx-bootstrap/dropdown";
import { CollapseModule } from "ngx-bootstrap/collapse";
import { CarouselModule } from "ngx-bootstrap/carousel";
import { ModalModule } from "ngx-bootstrap/modal";
import { PaginationModule } from "ngx-bootstrap/pagination";
import { TabsModule } from "ngx-bootstrap/tabs";

import { RouterModule } from "@angular/router";
import { CoreRoutes } from "./core.routing";
import { CartComponent } from "./cart/cart.component";
import { CheckoutComponent } from "./checkout/checkout.component";
import { OrdersComponent } from "./orders/orders.component";
import { TransactionsComponent } from "./transactions/transactions.component";
import { NotificationsComponent } from "./notifications/notifications.component";
import { SearchEngineComponent } from "./search-engine/search-engine.component";
import { ProductListingComponent } from "./product-listing/product-listing.component";
import { PersonalInvolvementComponent } from "./personal-involvement/personal-involvement.component";
import { ProfileComponent } from "./profile/profile.component";
import { EnquiryComponent } from "./enquiry/enquiry.component";
import { EnquiryGeneralComponent } from "./enquiry-general/enquiry-general.component";
import { EnquiryKjakpComponent } from "./enquiry-kjakp/enquiry-kjakp.component";
import { KjakpComponent } from "./kjakp/kjakp.component";
import { CbidComponent } from "./cbid/cbid.component";
import { PaymentComponent } from "./payment/payment.component";
import { SharesDirectorsComponent } from "./shares-directors/shares-directors.component";
import { CompanyDetailComponent } from "./company-detail/company-detail.component";
import { CustomizedDataComponent } from "./customized-data/customized-data.component";
import { ProductPurchaseComponent } from "./product-purchase/product-purchase.component";

import { TooltipModule } from "ngx-bootstrap/tooltip";
import { SearchCustomizeDataComponent } from "./search-customize-data/search-customize-data.component";
import { RequestInvestigationDocumentComponent } from './request-investigation-document/request-investigation-document.component';

@NgModule({
  declarations: [
    CartComponent,
    CheckoutComponent,
    OrdersComponent,
    TransactionsComponent,
    NotificationsComponent,
    SearchEngineComponent,
    ProductListingComponent,
    PersonalInvolvementComponent,
    ProfileComponent,
    EnquiryComponent,
    EnquiryGeneralComponent,
    EnquiryKjakpComponent,
    KjakpComponent,
    CbidComponent,
    PaymentComponent,
    SharesDirectorsComponent,
    CompanyDetailComponent,
    CustomizedDataComponent,
    ProductPurchaseComponent,
    SearchCustomizeDataComponent,
    RequestInvestigationDocumentComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    NgxDatatableModule,
    NgxSpinnerModule,
    ReactiveFormsModule,
    BsDropdownModule.forRoot(),
    CollapseModule.forRoot(),
    CarouselModule.forRoot(),
    ModalModule.forRoot(),
    PaginationModule.forRoot(),
    TabsModule.forRoot(),
    RouterModule.forChild(CoreRoutes),
    TooltipModule,
  ],
})
export class CoreModule {}
