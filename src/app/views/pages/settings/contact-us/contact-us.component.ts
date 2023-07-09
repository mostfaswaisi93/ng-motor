import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { ToastNotificationsService, TranslationService } from 'src/app/core/services';
import { AuthService } from 'src/app/core/services/auth.service';
import { UsersService } from 'src/app/core/services/users.service';

@Component({
  selector: 'app-contact-us',
  templateUrl: './contact-us.component.html',
  styleUrls: ['./contact-us.component.scss']
})
export class ContactUsComponent implements OnInit {

  profileForm: FormGroup;
  userData: any;
  userId: any;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private usersService: UsersService,
    public translateService: TranslateService,
    private translatationService: TranslationService,
    private toastNotificationsService: ToastNotificationsService
  ) { }

  ngOnInit(): void {
    this.userId = this.authService.user.data._id;
    this.initForm();
    this.getUser();
  }

  initForm() {
    this.profileForm = this.fb.group({
      id: new FormControl(this.userId),
      email: new FormControl(null, { validators: [Validators.required, Validators.pattern('^([\\w-]+(?:\\.[\\w-]+)*)@((?:[\\w-]+\\.)*\\w[\\w-]{0,66})\\.([A-Za-z]{2,6}(?:\\.[A-Za-z]{2,6})?)$')] }),
      firstName: new FormControl(null, { validators: [Validators.required, Validators.pattern("[a-zA-Z 0-9\.()~!@#$%^'&=+;,{}_-]+")] }),
      lastName: new FormControl(null, { validators: [Validators.required, Validators.pattern("[a-zA-Z 0-9\.()~!@#$%^'&=+;,{}_-]+")] }),
      userName: new FormControl(null, { validators: [Validators.required, Validators.pattern("[a-zA-Z 0-9\.()~!@#$%^'&=+;,{}_-]+")] })
    });
  }

  getUser() {
    this.usersService.getUser(this.userId).subscribe(data => {
      this.userData = data.data;
      this.profileForm.patchValue({
        id: this.userData?._id,
        email: this.userData?.email,
        firstName: this.userData?.firstName,
        lastName: this.userData?.lastName,
        userName: this.userData?.userName,
      });
    }, error => {
      this.toastNotificationsService.showError(error.error.message);
    });
  }

  updateProfile() {
    this.userId = this.authService.user.data._id;
    if (this.profileForm.invalid) {
      let message = this.translateService.instant('GENERAL.FILL_REQUIRED_FIELDS');
      this.toastNotificationsService.showError(message);
      return;
    }
    let data = this.profileForm.getRawValue();
    this.usersService.updateUser(data).subscribe(data => {
      this.authService.setAuth(data, localStorage.getItem('accessToken'), localStorage.getItem('userId'));
      this.authService.checkLogin();
      this.toastNotificationsService.showSuccess(this.translateService.instant('USERPROFILE.SUCCESS_MSG'));
    }, error => {
      this.toastNotificationsService.showError(error.error.message);
    });
  }

}