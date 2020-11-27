import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MetadataComponent } from './metadata/metadata.component';
import { SlsComponent } from './sls/sls.component';
import { AcsComponent } from './acs/acs.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BsDropdownModule, CarouselModule, CollapseModule, ModalModule, PaginationModule, TabsModule } from 'ngx-bootstrap';
import { RouterModule } from '@angular/router';
import { SsoRouters } from './sso.routing';
import { LoginComponent } from './login/login.component';

@NgModule({
  declarations: [
    AcsComponent,
    MetadataComponent, 
    SlsComponent, LoginComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    BsDropdownModule.forRoot(),
    CollapseModule.forRoot(),
    CarouselModule.forRoot(),
    ModalModule.forRoot(),
    PaginationModule.forRoot(),
    TabsModule.forRoot(),
    RouterModule.forChild(SsoRouters)
  ]
})
export class SsoModule { }
