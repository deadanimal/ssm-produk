import { Routes } from '@angular/router';
import { CartComponent } from './cart/cart.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { NotificationsComponent } from './notifications/notifications.component';
import { OrdersComponent } from './orders/orders.component';
import { PersonalInvolvementComponent } from './personal-involvement/personal-involvement.component';
import { ProductListingComponent } from './product-listing/product-listing.component';
import { SearchEngineComponent } from './search-engine/search-engine.component';
import { TransactionsComponent } from './transactions/transactions.component';
import { ProfileComponent } from './profile/profile.component';
import { EnquiryComponent } from './enquiry/enquiry.component';
import { EnquiryGeneralComponent } from './enquiry-general/enquiry-general.component';
import { EnquiryKjakpComponent } from './enquiry-kjakp/enquiry-kjakp.component';
import { KjakpComponent } from './kjakp/kjakp.component';
import { CbidComponent } from './cbid/cbid.component';
import { PaymentComponent } from './payment/payment.component';
import { SharesDirectorsComponent } from './shares-directors/shares-directors.component';
import { CompanyDetailComponent } from './company-detail/company-detail.component';
import { CustomizedDataComponent } from './customized-data/customized-data.component';
import { ProductPurchaseComponent } from './product-purchase/product-purchase.component';
import { SearchCustomizeDataComponent } from './search-customize-data/search-customize-data.component';
import { RequestInvestigationDocumentComponent } from './request-investigation-document/request-investigation-document.component';
import { EnquiryHistoryComponent } from './enquiry-history/enquiry-history.component';
import { PaymentToConfirmComponent } from './payment-to-confirm/payment-to-confirm.component';
import { PaymentCallbackComponent } from './payment-callback/payment-callback.component';
import { SearchComponent } from './search/search.component';
import { SearchDataComponent } from './search-data/search-data.component';
import { SearchResultComponent } from './search-result/search-result.component';
import { SearchDataResultComponent } from './search-data-result/search-data-result.component';
import { PaymentReturnComponent } from './payment-return/payment-return.component';

export const CoreRoutes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'cart',
        component: CartComponent,
      },
      {
        path: 'cbid',
        component: CbidComponent,
      },
      {
        path: 'checkout',
        component: CheckoutComponent,
      },
      {
        path: 'company-detail',
        component: CompanyDetailComponent,
      },
      {
        path: 'customized-data',
        component: CustomizedDataComponent,
      },
      {
        path: 'search-customized-data',
        component: SearchCustomizeDataComponent,
      },
      {
        path: 'enquiry',
        children: [
          {
            path: '',
            component: EnquiryComponent,
          },
          {
            path: 'general',
            component: EnquiryGeneralComponent,
          },
          {
            path: 'egov',
            component: EnquiryKjakpComponent,
          },
          {
            path: 'history',
            component: EnquiryHistoryComponent,
          },
        ],
      },
      {
        path: 'kjakp',
        component: KjakpComponent,
      },
      {
        path: 'notifications',
        component: NotificationsComponent,
      },
      {
        path: 'orders',
        component: OrdersComponent,
      },
      {
        path: 'payment',
        children: [
          {
            path: '',
            component: PaymentComponent
          },
          {
            path: 'callback',
            component: PaymentCallbackComponent
          },
          {
            path: 'to-confirm',
            component: PaymentToConfirmComponent
          },
          {
            path: 'return',
            component: PaymentReturnComponent
          }
        ]
      },
      {
        path: 'personal-involvement',
        component: PersonalInvolvementComponent,
      },
      {
        path: 'product-listing',
        component: ProductListingComponent,
      },
      {
        path: 'product-purchase',
        component: ProductPurchaseComponent,
      },
      {
        path: 'profile',
        component: ProfileComponent,
      },
      {
        path: 'transactions',
        component: TransactionsComponent,
      },
      {
        path: 'search',
        component: SearchComponent
      },
      {
        path: 'search-data',
        component: SearchDataComponent
      },
      {
        path: 'search-result',
        component: SearchResultComponent
      },
      {
        path: 'search-data-result',
        component: SearchDataResultComponent
      },
      {
        path: 'search-engine',
        component: SearchEngineComponent,
      },
      {
        path: 'shares-directors',
        component: SharesDirectorsComponent,
      },
      {
        path: 'request-investigation-document',
        component: RequestInvestigationDocumentComponent,
      },
    ],
  },
];
