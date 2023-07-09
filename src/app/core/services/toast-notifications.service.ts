import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class ToastNotificationsService {

  constructor(
    private translateService: TranslateService,
    private toastrService: ToastrService,
  ) { }


  showSuccess(description?, title?) {
    if (!description) {
      description = this.translateService.instant('DIALOG.SUCCESS_MESSAGE');
    }
    this.toastrService.success(title, description);
  }

  showError(description?, title?) {
    if (!description) {
      description = this.translateService.instant('DIALOG.ERROR_MESSAGE');
    }
    this.toastrService.error(title, description);
  }

  showInfo(description?, title?) {
    if (!description) {
      description = this.translateService.instant('DIALOG.INFO_MESSAGE');
    }
    this.toastrService.info(title, description);
  }

  showWarning(description?, title?) {
    if (!description) {
      description = this.translateService.instant('DIALOG.INFO_MESSAGE');
    }
    this.toastrService.warning(title, description);
  }

}
