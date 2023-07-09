import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { ADMIN_HOME_PAGE } from 'src/app/core/enum/constant';
import { ToastNotificationsService, TranslationService } from 'src/app/core/services';
import { AuthService } from '../../../../core/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  hide = true;
  loginForm: FormGroup;

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private authService: AuthService,
    public translateService: TranslateService,
    private translatationService: TranslationService,
    private toastNotificationsService: ToastNotificationsService
  ) { }

  ngOnInit(): void {
    this.initForm();
  }

  initForm() {
    this.loginForm = this.fb.group({
      email: new FormControl(null, { validators: [Validators.required, Validators.pattern('^([\\w-]+(?:\\.[\\w-]+)*)@((?:[\\w-]+\\.)*\\w[\\w-]{0,66})\\.([A-Za-z]{2,6}(?:\\.[A-Za-z]{2,6})?)$')] }),
      password: new FormControl(null, { validators: [Validators.required] })
    });
  }

  login() {
    if (this.loginForm.invalid) {
      let message = this.translateService.instant('GENERAL.FILL_REQUIRED_FIELDS');
      this.toastNotificationsService.showError(message);
      return;
    }
    let data = this.loginForm.getRawValue();
    this.authService.login(data).subscribe((data: any) => {
      this.authService.setAuth(data, data?.token, data?.data._id);
      this.router.navigateByUrl(ADMIN_HOME_PAGE);
    }, error => {
      this.toastNotificationsService.showError(error.error.message);
    });
  }

  setLang() {
    this.translatationService.setLanguage(this.translateService.currentLang === 'ar' ? 'en' : 'ar');
    window.location.reload();
  }

}
