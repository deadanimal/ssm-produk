import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { NgxSpinnerModule } from 'ngx-spinner';
import { LoadingBarModule } from '@ngx-loading-bar/core';

import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { CollapseModule } from 'ngx-bootstrap/collapse';
import { CarouselModule } from 'ngx-bootstrap/carousel';
import { ModalModule } from 'ngx-bootstrap/modal';
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { TooltipModule } from 'ngx-bootstrap/tooltip';

import { RouterModule } from '@angular/router';
import { CoreRoutes } from './core.routing';

import { OrdersComponent } from './orders/orders.component';
import { TransactionsComponent } from './transactions/transactions.component';
import { NotificationsComponent } from './notifications/notifications.component';


import { ProfileComponent } from './profile/profile.component';




import { KjakpComponent } from './kjakp/kjakp.component';

import { CompanyDetailComponent } from './company-detail/company-detail.component';

import { RequestInvestigationDocumentComponent } from './request-investigation-document/request-investigation-document.component';


// Product
import { ProductSearchComponent } from './products/product-search/product-search.component';
import { ProductSearchCustomComponent } from './products/product-search-custom/product-search-custom.component';
import { ProductSearchPiComponent } from './products/product-search-pi/product-search-pi.component';
import { ProductSearchSdComponent } from './products/product-search-sd/product-search-sd.component';
import { ProductSearchResultComponent } from './products/product-search-result/product-search-result.component';

// Payment
import { PaymentComponent } from './payment/payment/payment.component';
import { PaymentCallbackComponent } from './payment/payment-callback/payment-callback.component';
import { PaymentToConfirmComponent } from './payment/payment-to-confirm/payment-to-confirm.component';
import { PaymentReturnComponent } from './payment/payment-return/payment-return.component';

// Enquiry
import { EnquiryComponent } from './enquiry/enquiry/enquiry.component';
import { EnquiryEgovComponent } from './enquiry/enquiry-egov/enquiry-egov.component';
import { EnquiryGeneralComponent } from './enquiry/enquiry-general/enquiry-general.component';
import { EnquiryHistoryComponent } from './enquiry/enquiry-history/enquiry-history.component';

// Cart
import { CartComponent } from './cart/cart/cart.component';
import { CheckoutComponent } from './cart/checkout/checkout.component';

// Personal involvement
import { PersonalInvolvementSearchComponent } from './personal-involvement/personal-involvement-search/personal-involvement-search.component';

// CBID
import { CbidComponent } from './cbid/cbid/cbid.component';
import { CbidSearchComponent } from './cbid/cbid-search/cbid-search.component';
import { CbidSearchResultComponent } from './cbid/cbid-search-result/cbid-search-result.component';
import { PaymentReceiptComponent } from './payment/payment-receipt/payment-receipt.component';
import { ProductCustomDataComponent } from './products/product-custom-data/product-custom-data.component';
import { ProductCustomDataPackageAComponent } from './products/product-custom-data-package-a/product-custom-data-package-a.component';
import { ProductCustomDataPackageBComponent } from './products/product-custom-data-package-b/product-custom-data-package-b.component';

@NgModule({
  declarations: [
    CartComponent,
    CheckoutComponent,
    OrdersComponent,
    TransactionsComponent,
    NotificationsComponent,

    ProfileComponent,
    EnquiryComponent,
    EnquiryGeneralComponent,
    KjakpComponent,
    CbidComponent,
    PaymentComponent,
    CompanyDetailComponent,

    RequestInvestigationDocumentComponent,
    EnquiryHistoryComponent,
    PaymentToConfirmComponent,
    PaymentCallbackComponent,
    PaymentReturnComponent,
    ProductSearchComponent,
    ProductSearchResultComponent,
    EnquiryEgovComponent,
    PersonalInvolvementSearchComponent,
    CbidSearchComponent,
    CbidSearchResultComponent,

    ProductSearchPiComponent,
    ProductSearchSdComponent,
    ProductSearchCustomComponent,
    PaymentReceiptComponent,
    ProductCustomDataComponent,
    ProductCustomDataPackageAComponent,
    ProductCustomDataPackageBComponent,
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
    LoadingBarModule
  ],
})
export class CoreModule {}
