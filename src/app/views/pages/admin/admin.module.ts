import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminComponent } from './admin.component';
import { SharedModule } from '../../shared/shared.module';
import { TranslateModule } from '@ngx-translate/core';
import { RouterModule } from '@angular/router';
import { AdminHomeComponent } from './admin-home/admin-home.component';
import { ManageServicesComponent } from './manage-services/manage-services.component';
import { ManageServicesFormComponent } from './manage-services/manage-services-form/manage-services-form.component';
import { ManageManagementComponent } from './manage-management/manage-management.component';
import { ManageManagementFormComponent } from './manage-management/manage-management-form/manage-management-form.component';

@NgModule({
  declarations: [
    AdminComponent,
    AdminHomeComponent,
    ManageServicesComponent,
    ManageServicesFormComponent,
    ManageManagementComponent,
    ManageManagementFormComponent
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
            path: 'manage-services',
            component: ManageServicesComponent
          },
          {
            path: 'manage-management',
            component: ManageManagementComponent
          }
        ]
      }
    ]),
  ]
})
export class AdminModule { }
