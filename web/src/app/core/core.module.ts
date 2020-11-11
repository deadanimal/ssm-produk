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

import { NotificationsComponent } from './notifications/notifications.component';

// Profile
import { ProfileComponent } from './profile/profile/profile.component';
import { ProfileEgovComponent } from './profile/profile-egov/profile-egov.component';

// Product
import { ProductSearchComponent } from './products/product-search/product-search.component';
import { ProductSearchEgovComponent } from './products/product-search-egov/product-search-egov.component';
import { ProductSearchCustomComponent } from './products/product-search-custom/product-search-custom.component';
import { ProductSearchPiComponent } from './products/product-search-pi/product-search-pi.component';
import { ProductSearchSdComponent } from './products/product-search-sd/product-search-sd.component';
import { ProductSearchResultComponent } from './products/product-search-result/product-search-result.component';
import { ProductSearchResultPackage1Component } from './products/product-search-result-package1/product-search-result-package1.component';
import { ProductSearchResultPackage2Component } from './products/product-search-result-package2/product-search-result-package2.component';
import { ProductSearchResultPackage3Component } from './products/product-search-result-package3/product-search-result-package3.component';
import { ProductCustomDataComponent } from './products/product-custom-data/product-custom-data.component';
import { ProductCustomDataPackageAComponent } from './products/product-custom-data-package-a/product-custom-data-package-a.component';
import { ProductCustomDataPackageBComponent } from './products/product-custom-data-package-b/product-custom-data-package-b.component';

// Payment
import { PaymentComponent } from './payment/payment/payment.component';
import { PaymentCallbackComponent } from './payment/payment-callback/payment-callback.component';
import { PaymentToConfirmComponent } from './payment/payment-to-confirm/payment-to-confirm.component';
import { PaymentReturnComponent } from './payment/payment-return/payment-return.component';
import { PaymentReceiptComponent } from './payment/payment-receipt/payment-receipt.component';


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

import { ProductSearchResultPackage4Component } from './products/product-search-result-package4/product-search-result-package4.component';

// EGov
import { EgovComponent } from './egov/egov/egov.component';
import { EgovHomeComponent } from './egov/egov-home/egov-home.component';
import { ProductSearchEgovPiComponent } from './products/product-search-egov-pi/product-search-egov-pi.component';
import { EnquiryDetailsComponent } from './enquiry/enquiry-details/enquiry-details.component';


@NgModule({
  declarations: [
    CartComponent,
    CheckoutComponent,
    NotificationsComponent,

    ProfileComponent,
    EnquiryComponent,
    EnquiryGeneralComponent,

    CbidComponent,
    PaymentComponent,

    EnquiryHistoryComponent,
    PaymentToConfirmComponent,
    PaymentCallbackComponent,
    PaymentReturnComponent,
    ProductSearchComponent,
    ProductSearchResultPackage1Component,
    ProductSearchResultPackage2Component,
    ProductSearchResultPackage3Component,
    ProductSearchResultComponent,
    EnquiryEgovComponent,
    PersonalInvolvementSearchComponent,
    ProductSearchResultPackage1Component,
    ProductSearchResultPackage2Component,
    ProductSearchEgovComponent,
    ProductSearchPiComponent,
    ProductSearchSdComponent,
    ProductSearchCustomComponent,
    ProductSearchEgovComponent,
    PaymentReceiptComponent,
    ProductCustomDataComponent,
    ProductCustomDataPackageAComponent,
    ProductCustomDataPackageBComponent,
    EgovComponent,
    ProductSearchResultPackage4Component,
    EgovHomeComponent,
    ProductSearchEgovPiComponent,
    ProfileEgovComponent,
    EnquiryDetailsComponent,
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
