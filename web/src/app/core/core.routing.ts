import { Routes } from '@angular/router';


import { NotificationsComponent } from './notifications/notifications.component';

import { ProfileComponent } from './profile/profile/profile.component';
import { ProfileEgovComponent } from './profile/profile-egov/profile-egov.component';

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

import { EgovComponent } from './egov/egov/egov.component';
import { EgovHomeComponent } from './egov/egov-home/egov-home.component';

import { EnquiryComponent } from './enquiry/enquiry/enquiry.component';
import { EnquiryGeneralComponent } from './enquiry/enquiry-general/enquiry-general.component';
import { EnquiryHistoryComponent } from './enquiry/enquiry-history/enquiry-history.component';
import { EnquiryEgovComponent } from './enquiry/enquiry-egov/enquiry-egov.component';

import { CartComponent } from './cart/cart/cart.component';
import { CheckoutComponent } from './cart/checkout/checkout.component';

import { CbidComponent } from './cbid/cbid/cbid.component';
import { ProductSearchEgovComponent } from './products/product-search-egov/product-search-egov.component';
import { ProductSearchResultPackage1Component } from './products/product-search-result-package1/product-search-result-package1.component';
import { ProductSearchResultPackage2Component } from './products/product-search-result-package2/product-search-result-package2.component';
import { ProductSearchResultPackage3Component } from './products/product-search-result-package3/product-search-result-package3.component';
import { ProductSearchResultPackage4Component } from './products/product-search-result-package4/product-search-result-package4.component';
import { ProductSearchEgovPiComponent } from './products/product-search-egov-pi/product-search-egov-pi.component';
import { EnquiryDetailsComponent } from './enquiry/enquiry-details/enquiry-details.component';



export const CoreRoutes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'notifications',
        component: NotificationsComponent,
      },
      {
        path: 'profile',
        children: [
          {
            path: '',
            component: ProfileComponent,
          },
          {
            path: 'egov',
            component: ProfileEgovComponent
          }
        ]
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
            path: 'search-egov-pi',
            component: ProductSearchEgovPiComponent
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
            path: 'search-result-package3',
            component: ProductSearchResultPackage3Component
          },
          {
            path: 'search-result-package4',
            component: ProductSearchResultPackage4Component
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
            children: [
              {
                path: '',
                component: EnquiryHistoryComponent,
              },
              {
                path: 'details',
                component: EnquiryDetailsComponent,
              }
            ]
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
      },

      // eGov
      {
        path: 'egov',
        children: [
          {
            path: '',
            component: EgovComponent
          },
          {
            path: 'home',
            component: EgovHomeComponent
          }
        ]
      }
    ],
  },
];
