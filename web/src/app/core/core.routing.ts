import { Routes } from '@angular/router';


import { NotificationsComponent } from './notifications/notifications.component';

import { TransactionsComponent } from './transactions/transactions.component';
import { ProfileComponent } from './profile/profile.component';

import { KjakpComponent } from './kjakp/kjakp.component';

import { CompanyDetailComponent } from './company-detail/company-detail.component';
import { RequestInvestigationDocumentComponent } from './request-investigation-document/request-investigation-document.component';


import { PaymentComponent } from './payment/payment/payment.component';
import { PaymentReturnComponent } from './payment/payment-return/payment-return.component';
import { PaymentToConfirmComponent } from './payment/payment-to-confirm/payment-to-confirm.component'
import { PaymentCallbackComponent } from './payment/payment-callback/payment-callback.component';
import { PaymentReceiptComponent } from './payment/payment-receipt/payment-receipt.component';

import { ProductSearchComponent } from './products/product-search/product-search.component';
import { ProductSearchResultComponent } from './products/product-search-result/product-search-result.component';
import { ProductSearchPiComponent } from './products/product-search-pi/product-search-pi.component';
import { ProductSearchSdComponent } from './products/product-search-sd/product-search-sd.component';
import { ProductSearchCustomComponent } from './products/product-search-custom/product-search-custom.component';
import { ProductCustomDataComponent } from './products/product-custom-data/product-custom-data.component';
import { ProductCustomDataPackageAComponent } from './products/product-custom-data-package-a/product-custom-data-package-a.component';
import { ProductCustomDataPackageBComponent } from './products/product-custom-data-package-b/product-custom-data-package-b.component';

import { EnquiryComponent } from './enquiry/enquiry/enquiry.component';
import { EnquiryGeneralComponent } from './enquiry/enquiry-general/enquiry-general.component';
import { EnquiryHistoryComponent } from './enquiry/enquiry-history/enquiry-history.component';
import { EnquiryEgovComponent } from './enquiry/enquiry-egov/enquiry-egov.component';

import { CartComponent } from './cart/cart/cart.component';
import { CheckoutComponent } from './cart/checkout/checkout.component';

import { CbidComponent } from './cbid/cbid/cbid.component';
import { CbidSearchComponent } from './cbid/cbid-search/cbid-search.component';
import { CbidSearchResultComponent } from './cbid/cbid-search-result/cbid-search-result.component';
import { ProductSearchEgovComponent } from './products/product-search-egov/product-search-egov.component';
import { ProductSearchResultPackage1Component } from './products/product-search-result-package1/product-search-result-package1.component';


export const CoreRoutes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'company-detail',
        component: CompanyDetailComponent,
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
        path: 'profile',
        component: ProfileComponent,
      },
      {
        path: 'transactions',
        component: TransactionsComponent,
      },
      {
        path: 'request-investigation-document',
        component: RequestInvestigationDocumentComponent,
      },


      // Products
      {
        path: 'products',
        children: [
          {
            path: 'search',
            component: ProductSearchComponent
          },
          {
            path: 'search-egov',
            component: ProductSearchEgovComponent
          },          
          {
            path: 'search-personal-involvement',
            component: ProductSearchPiComponent
          },
          {
            path: 'search-shares-directors',
            component: ProductSearchSdComponent
          },
          {
            path: 'search-result',
            component: ProductSearchResultComponent
          },
          {
            path: 'search-result-package1',
            component: ProductSearchResultPackage1Component
          },    
          {
            path: 'search-result-package2',
            component: ProductSearchResultPackage2Component
          },                   
          {
            path: 'custom-data',
            children: [
              {
                path: '',
                component: ProductCustomDataComponent
              },
              {
                path: 'package-a',
                component: ProductCustomDataPackageAComponent
              },
              {
                path: 'package-b',
                component: ProductCustomDataPackageBComponent
              }
            ]
          },
          {
            path: 'search-custom-data',
            component: ProductSearchCustomComponent
          }
        ]
      },

      // Payment
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
          },
          {
            path: 'receipt',
            component: PaymentReceiptComponent
          }
        ]
      },

      // CBID
      {
        path: 'cbid',
        children: [
          {
            path: '',
            component: CbidComponent
          },
          {
            path: 'search',
            component: CbidSearchComponent
          },
          {
            path: 'search-result',
            component: CbidSearchResultComponent
          }
        ]
      },

      // Enquiry
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
            component: EnquiryEgovComponent,
          },
          {
            path: 'history',
            component: EnquiryHistoryComponent,
          },
        ],
      },

      // Cart
      {
        path: 'cart',
        children: [
          {
            path: '',
            component: CartComponent
          },
          {
            path: 'checkout',
            component: CheckoutComponent
          }
        ]
      }
    ],
  },
];
