import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './core/guards/auth.guard';
import { LoginGuard } from './core/guards/login.guard';
import { ModuleGuard } from './core/guards/module.guard';
import { BaseComponent } from './views/base/base.component';
import { ChangePasswordComponent } from './views/pages/change-password/change-password.component';
import { ErrorPageComponent } from './views/shared/error-page/error-page.component';
import { USER_HOME_PAGE } from './core/enum/constant';
import { ProfileComponent } from './views/pages/profile/profile.component';
import { SettingsComponent } from './views/pages/settings/settings.component';
import { ManageSocialMediaComponent } from './views/pages/settings/manage-social-media/manage-social-media.component';
import { ManageContactUsComponent } from './views/pages/settings/manage-contact-us/manage-contact-us.component';
import { ManageOurGoalsComponent } from './views/pages/settings/manage-our-goals/manage-our-goals.component';
import { ManageOurCommitmentsComponent } from './views/pages/settings/manage-our-commitments/manage-our-commitments.component';

const routes: Routes = [
  {
    path: 'auth',
    loadChildren: () => import('../app/views/pages/auth/auth.module').then(m => m.AuthModule),
    canActivate: [LoginGuard],
    data: {}
  },
  {
    path: '',
    component: BaseComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: 'admin',
        loadChildren: () => import('../app/views/pages/admin/admin.module').then(m => m.AdminModule),
        canActivate: [ModuleGuard]
      },
      // {
      //   path: 'compiled-table/:id',
      //   loadChildren: () => import('../app/views/pages/compiled-table/compiled-table.module').then(m => m.CompiledTableModule),
      //   canActivate: [ModuleGuard],
      //   data: {
      //     moduleName: 'user'
      //   },
      // },
      {
        path: 'error/403',
        component: ErrorPageComponent,
        data: {
          'type': 'error-v6',
          'code': 403,
          'title': '403... Access forbidden',
          'desc': 'Looks like you don\'t have permission to access for requested page.<br> Please, contact administrator'
        }
      },
      {
        path: 'change-password',
        component: ChangePasswordComponent
      },
      {
        path: 'admin-profile',
        component: ProfileComponent
      },
      {
        path: 'settings',
        component: SettingsComponent
      },
      {
        path: 'settings/manage-social-media',
        component: ManageSocialMediaComponent
      },
      {
        path: 'settings/manage-contact-us',
        component: ManageContactUsComponent
      },
      {
        path: 'settings/manage-our-commitments',
        component: ManageOurCommitmentsComponent
      },
      {
        path: 'settings/manage-our-goals',
        component: ManageOurGoalsComponent
      },
      { path: 'error/:type', component: ErrorPageComponent },
      { path: '', redirectTo: USER_HOME_PAGE, pathMatch: 'full' },
      { path: '**', redirectTo: USER_HOME_PAGE, pathMatch: 'full' },
    ]
  },
  { path: '**', redirectTo: 'error/403', pathMatch: 'full' },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
