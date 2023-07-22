import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminComponent } from './admin.component';
import { SharedModule } from '../../shared/shared.module';
import { TranslateModule } from '@ngx-translate/core';
import { RouterModule } from '@angular/router';
import { AdminHomeComponent } from './admin-home/admin-home.component';
import { ManageServicesComponent } from './manage-services/manage-services.component';
import { ManageServicesFormComponent } from './manage-services/manage-services-form/manage-services-form.component';
import { ManagementsComponent } from './managements/managements.component';
import { ManagementFormComponent } from './managements/management-form/management-form.component';
import { ManageHomeComponent } from './manage-home/manage-home.component';
import { HeaderComponent } from './manage-home/header/header.component';
import { WhoWeAreComponent } from './manage-home/who-we-are/who-we-are.component';
import { WhatDoWeApplyComponent } from './manage-home/what-do-we-apply/what-do-we-apply.component';
import { ServicesDetailsComponent } from './manage-services/services-details/services-details.component';
import { RandomQuestionsFormComponent } from './manage-services/services-details/random-questions-form/random-questions-form.component';

@NgModule({
  declarations: [
    AdminComponent,
    AdminHomeComponent,
    ManageServicesComponent,
    ManageServicesFormComponent,
    ManagementsComponent,
    ManagementFormComponent,
    ManageHomeComponent,
    HeaderComponent,
    WhoWeAreComponent,
    WhatDoWeApplyComponent,
    ServicesDetailsComponent,
    RandomQuestionsFormComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    TranslateModule,
    RouterModule.forChild([
      {
        path: '',
        component: AdminComponent,
        children: [
          {
            path: '',
            pathMatch: 'full',
            redirectTo: 'home'
          },
          {
            path: 'home',
            component: AdminHomeComponent
          },
          {
            path: 'manage-home',
            component: ManageHomeComponent
          },
          {
            path: 'manage-home/header',
            component: HeaderComponent
          },
          {
            path: 'manage-home/what-do-we-apply',
            component: WhatDoWeApplyComponent
          },
          {
            path: 'manage-home/who-we-are',
            component: WhoWeAreComponent
          },
          {
            path: 'manage-services',
            component: ManageServicesComponent
          },
          {
            path: 'managements',
            component: ManagementsComponent
          },
          {
            path: 'services/services-details',
            component: ServicesDetailsComponent
          },
        ]
      }
    ]),
  ]
})
export class AdminModule { }
