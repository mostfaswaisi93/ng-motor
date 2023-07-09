import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TranslateModule } from '@ngx-translate/core';
import { SharedModule } from './views/shared/shared.module';
import { BaseComponent } from './views/base/base.component';
import { NgHttpLoaderModule } from 'ng-http-loader';
import { ToastrModule } from 'ngx-toastr';
import { CoreModule } from './core/core.module';
import { ChangePasswordComponent } from './views/pages/change-password/change-password.component';
import { ProfileComponent } from './views/pages/profile/profile.component';
import { SettingsComponent } from './views/pages/settings/settings.component';
import { ManageOurCommitmentsComponent } from './views/pages/settings/manage-our-commitments/manage-our-commitments.component';
import { ManageOurGoalsComponent } from './views/pages/settings/manage-our-goals/manage-our-goals.component';
import { ManageContactUsComponent } from './views/pages/settings/manage-contact-us/manage-contact-us.component';
import { ManageSocialMediaComponent } from './views/pages/settings/manage-social-media/manage-social-media.component';

@NgModule({
  declarations: [
    AppComponent,
    BaseComponent,
    ChangePasswordComponent,
    ProfileComponent,
    SettingsComponent,
    ManageOurCommitmentsComponent,
    ManageOurGoalsComponent,
    ManageContactUsComponent,
    ManageSocialMediaComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    TranslateModule.forRoot(),
    SharedModule,
    CoreModule,
    ToastrModule.forRoot({
      closeButton: true,
      progressBar: true,
      extendedTimeOut: 3000,
    }),
    NgHttpLoaderModule.forRoot(),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
