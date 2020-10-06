import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'; // this is needed!
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';

import { AlertModule } from 'ngx-bootstrap/alert';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { CarouselModule } from 'ngx-bootstrap/carousel';
import { CollapseModule } from 'ngx-bootstrap/collapse';
import { ModalModule } from 'ngx-bootstrap/modal';
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { PopoverModule } from 'ngx-bootstrap/popover';
import { ProgressbarModule } from 'ngx-bootstrap/progressbar';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { TimepickerModule } from 'ngx-bootstrap/timepicker';
import { TooltipModule } from 'ngx-bootstrap/tooltip';

import { NgcCookieConsentConfig, NgcCookieConsentModule } from 'ngx-cookieconsent';
import { LoadingBarModule } from '@ngx-loading-bar/core';
import { TagInputModule } from 'ngx-chips';
import { TmNgOdometerModule } from 'tm-ng-odometer';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { ToastrModule } from 'ngx-toastr';

import { CoreLayoutComponent } from './layouts/core-layout/core-layout.component';
import { FooterComponent } from './components/footer/footer.component';
import { NavbarComponent } from './components/navbar/navbar.component';

const cookieConfig: NgcCookieConsentConfig = {
  cookie: {
    domain: 'portal.ssm.prototype.com.my' // or 'your.domain.com' // it is mandatory to set a domain, for cookies to work properly (see https://goo.gl/S2Hy2A)
  },
  position: 'bottom-right',
  palette: {
    popup: {
      background: '#ffffff',
      text: '#231e6d',
      link: '#231e6d',
      border: '#231e6d'
    },
    button: {
      background: '#231e6d',
      text: '#ffffff',
      border: 'transparent'
    }
  },
  theme: 'edgeless',
  type: 'info',
  content: {
    message: 'This website uses cookies to ensure you get the best experience on our website.',
    dismiss: 'Got it!',
    deny: 'Refuse cookies',
    link: 'Learn more',
    href: 'https://portal.ssm.portal.com.my',
    policy: 'Cookie Policy'
  }
};

@NgModule({
  declarations: [
    AppComponent,
    CoreLayoutComponent,
    FooterComponent,
    NavbarComponent
  ],
  imports: [
    AppRoutingModule,
    BrowserAnimationsModule,
    CommonModule,
    FormsModule,
    HttpClientModule,
    LoadingBarModule,
    RouterModule,
    TagInputModule,
    AlertModule.forRoot(),
    BsDatepickerModule.forRoot(),
    BsDropdownModule.forRoot(),
    CarouselModule.forRoot(),
    CollapseModule.forRoot(),
    ModalModule.forRoot(),
    PaginationModule.forRoot(),
    PopoverModule.forRoot(),
    ProgressbarModule.forRoot(),
    TabsModule.forRoot(),
    TimepickerModule.forRoot(),
    TooltipModule.forRoot(),
    TmNgOdometerModule,
    ToastrModule.forRoot({
      timeOut: 3000,
      positionClass: 'toast-bottom-right',
      preventDuplicates: true,
      tapToDismiss: true,
      progressBar: true,
      progressAnimation: 'decreasing'
    }),
    NgcCookieConsentModule.forRoot(cookieConfig),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}

