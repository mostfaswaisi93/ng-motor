import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { HttpTokenInterceptor } from './interceptors';
import { TranslateModule } from '@ngx-translate/core';
import { TranslationService, ToastNotificationsService, SplashScreenService } from './services';
import { AuthGuard } from './guards/auth.guard';
import { LoginGuard } from './guards/login.guard';
import { ModuleGuard } from './guards/module.guard';

@NgModule({
  imports: [
    CommonModule,
    TranslateModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: HttpTokenInterceptor, multi: true },
    TranslationService,
    ToastNotificationsService,
    SplashScreenService,
    AuthGuard,
    LoginGuard,
    ModuleGuard
  ],
  declarations: []
})
export class CoreModule { }
