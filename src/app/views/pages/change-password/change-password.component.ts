import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { ToastNotificationsService, TranslationService } from 'src/app/core/services';
import { MustMatch } from '../../shared/must-match/must-match';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss']
})
export class ChangePasswordComponent implements OnInit {

  changeForm: FormGroup;
  userId: any;

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private authService: AuthService,
    public translateService: TranslateService,
    private translatationService: TranslationService,
    private toastNotificationsService: ToastNotificationsService
  ) { }

  ngOnInit(): void {
    this.userId = this.authService.user.data._id;
    this.initForm();
  }

  initForm() {
    this.changeForm = this.fb.group({
      id: new FormControl(this.userId),
      password: new FormControl(null, { validators: [Validators.required, Validators.pattern('((?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])(?=.{6,}))|((?=.*[a-z])(?=.*[A-Z])(?=.*[^A-Za-z0-9])(?=.{8,}))')] }),
      newPassword: new FormControl(null, { validators: [Validators.required, Validators.pattern('((?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])(?=.{6,}))|((?=.*[a-z])(?=.*[A-Z])(?=.*[^A-Za-z0-9])(?=.{8,}))')] }),
      confirmNewPassword: new FormControl(null, { validators: [Validators.required] })
    }, {
      validator: MustMatch('newPassword', 'confirmNewPassword')
    });
  }

  change() {
    this.userId = this.authService.user.data._id;
    if (this.changeForm.invalid) {
      let message = this.translateService.instant('GENERAL.FILL_REQUIRED_FIELDS');
      this.toastNotificationsService.showError(message);
      return;
    }
    let data = this.changeForm.getRawValue();
    this.authService.changePassword(data).subscribe(data => {
      this.router.navigateByUrl(`/admin/home`);
      this.toastNotificationsService.showSuccess(this.translateService.instant('LOGIN.SUCCESS_MSG'));
    }, error => {
      this.toastNotificationsService.showError(error.error.message);
    });
  }

}
