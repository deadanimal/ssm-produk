import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { TmNgOdometerModule } from 'tm-ng-odometer';

import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { CollapseModule } from 'ngx-bootstrap/collapse';
import { CarouselModule } from 'ngx-bootstrap/carousel';
import { ModalModule } from 'ngx-bootstrap/modal';
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { NgcCookieConsentModule } from 'ngx-cookieconsent';

import { RouterModule } from '@angular/router';
import { PublicRoutes } from './public.routing';
import { AboutComponent } from './about/about.component';
import { ContactComponent } from './contact/contact.component';
import { FaqComponent } from './faq/faq.component';
import { UserGuideComponent } from './user-guide/user-guide.component';
import { HomeComponent } from './home/home.component';
import { TermsConditionsComponent } from './terms-conditions/terms-conditions.component';
import { NotAuthorizedComponent } from './not-authorized/not-authorized.component';

@NgModule({
  declarations: [
    AboutComponent,
    ContactComponent,
    FaqComponent,
    UserGuideComponent,
    HomeComponent,
    TermsConditionsComponent,
    NotAuthorizedComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    TmNgOdometerModule,
    BsDropdownModule.forRoot(),
    CollapseModule.forRoot(),
    CarouselModule.forRoot(),
    ModalModule.forRoot(),
    PaginationModule.forRoot(),
    TabsModule.forRoot(),
    RouterModule.forChild(PublicRoutes),
    NgcCookieConsentModule
  ]
})
export class PublicModule { }
