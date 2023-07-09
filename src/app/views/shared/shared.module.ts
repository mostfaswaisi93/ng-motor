import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { TranslateModule } from '@ngx-translate/core';
import { RouterModule } from '@angular/router';
import { SafePipe, TranslatorPipe } from './pipes';
import { HeaderComponent } from './layout/header/header.component';
import { FooterComponent } from './layout/footer/footer.component';
import { SidemenuComponent } from './layout/sidemenu/sidemenu.component';
import { ErrorPageComponent } from './error-page/error-page.component';
import { MobileHeaderComponent } from './layout/mobile-header/mobile-header.component';
import { MaterialModule } from './material/material.module';
import { NoticeComponent } from './notice';
import { QuillModule } from 'ngx-quill';
import { CustomLoaderComponent } from './custom-loader/custom-loader.component';
import { SplashScreenComponent } from './splash-screen/splash-screen.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule,
    MaterialModule,
    TranslateModule.forChild(),
    QuillModule.forRoot(),
  ],
  declarations: [
    SafePipe,
    TranslatorPipe,
    HeaderComponent,
    FooterComponent,
    SidemenuComponent,
    ErrorPageComponent,
    MobileHeaderComponent,
    NoticeComponent,
    CustomLoaderComponent,
    SplashScreenComponent
  ],
  exports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule,
    SafePipe,
    TranslatorPipe,
    HeaderComponent,
    FooterComponent,
    SidemenuComponent,
    MobileHeaderComponent,
    MaterialModule,
    NoticeComponent,
    QuillModule,
    CustomLoaderComponent,
    SplashScreenComponent,
    TranslateModule
  ],
  entryComponents: [
    CustomLoaderComponent
  ]
})
export class SharedModule { }
