import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeScreenComponent } from './home-screen.component';
import { FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { SharedModule } from '../../shared/shared.module';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [HomeScreenComponent],
  imports: [
    CommonModule,
    FormsModule,
    TranslateModule.forChild(),
    SharedModule,
    RouterModule.forChild([
      {
        path: '',
        component: HomeScreenComponent,
        children: [
        ]
      }
    ]),
  ],
})
export class HomeScreenModule { }
