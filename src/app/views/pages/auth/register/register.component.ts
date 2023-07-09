import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { ToastNotificationsService, TranslationService } from 'src/app/core/services';
import { AuthService } from '../../../../core/services/auth.service';
import { MustMatch } from 'src/app/views/shared/must-match/must-match';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  hidePassword = true;
  hideConPassword = true;
  registerForm: FormGroup;

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
    this.registerForm = this.fb.group({
      email: new FormControl(null, { validators: [Validators.required, Validators.pattern('^([\\w-]+(?:\\.[\\w-]+)*)@((?:[\\w-]+\\.)*\\w[\\w-]{0,66})\\.([A-Za-z]{2,6}(?:\\.[A-Za-z]{2,6})?)$')] }),
      firstName: new FormControl(null, { validators: [Validators.required, Validators.pattern("[a-zA-Z 0-9\.()~!@#$%^'&=+;,{}_-]+")] }),
      lastName: new FormControl(null, { validators: [Validators.required, Validators.pattern("[a-zA-Z 0-9\.()~!@#$%^'&=+;,{}_-]+")] }),
      // isAdmin: new FormControl(true),
      userName: new FormControl(null, { validators: [Validators.required, Validators.pattern("[a-zA-Z 0-9\.()~!@#$%^'&=+;,{}_-]+")] }),
      password: new FormControl(null, { validators: [Validators.required, Validators.pattern('((?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])(?=.{6,}))|((?=.*[a-z])(?=.*[A-Z])(?=.*[^A-Za-z0-9])(?=.{8,}))')] }),
      confirmPassword: new FormControl(null, { validators: [Validators.required] }),
    }, {
      validator: MustMatch('password', 'confirmPassword')
    });
  }

  register() {
    if (this.registerForm.invalid) {
      let message = this.translateService.instant('GENERAL.FILL_REQUIRED_FIELDS');
      this.toastNotificationsService.showError(message);
      return;
    }
    let data = this.registerForm.getRawValue();
    this.authService.register(data).subscribe((data: any) => {
      console.log(data, 'Register Data');
      this.toastNotificationsService.showSuccess(this.translateService.instant('LOGIN.REGISTER_SUCCESS_MSG'));
      this.router.navigateByUrl('/auth/login');
    }, error => {
      this.toastNotificationsService.showError(error.error.message);
    });
  }

  setLang() {
    this.translatationService.setLanguage(this.translateService.currentLang === 'ar' ? 'en' : 'ar');
  }

}