import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../shared/shared.module';
import { AuthComponent } from './auth.component';
import { RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { TranslateModule } from '@ngx-translate/core';
import { RegisterComponent } from './register/register.component';

@NgModule({
  declarations: [AuthComponent, LoginComponent, AuthComponent, RegisterComponent],
  imports: [
    CommonModule,
    SharedModule,
    TranslateModule,
    RouterModule.forChild([
      {
        path: '',
        component: AuthComponent,
        children: [
          {
            path: '',
            pathMatch: 'full',
            redirectTo: 'login'
          },
          {
            path: 'login',
            component: LoginComponent
          },
          // {
          //   path: 'register',
          //   component: RegisterComponent
          // }
        ]
      }
    ]),
  ]
})
export class AuthModule { }
