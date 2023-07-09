import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { ToastNotificationsService, TranslationService } from 'src/app/core/services';
import { AuthService } from 'src/app/core/services/auth.service';
import { UsersService } from 'src/app/core/services/users.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  profileForm: FormGroup;
  userId: any;
  userData: any;

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private authService: AuthService,
    private usersService: UsersService,
    public translateService: TranslateService,
    private translatationService: TranslationService,
    private toastNotificationsService: ToastNotificationsService
  ) { }

  ngOnInit(): void {
    this.initForm();
    this.userId = this.authService.user.data._id;
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
      console.log('user data', this.userData);
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
    let data = {
      'id': this.userId,
      'email': this.profileForm.value.email,
      'firstName': this.profileForm.value.firstName,
      'lastName': this.profileForm.value.lastName,
      'userName': this.profileForm.value.userName
    }
    // let data = this.profileForm.getRawValue();
    console.log(data);
    this.usersService.updateUser(data).subscribe(data => {
      console.log(data, 'profile');
      // this.router.navigateByUrl(`/admin/home`);
      this.toastNotificationsService.showSuccess(this.translateService.instant('LOGIN.SUCCESS_MSG'));
    }, error => {
      this.toastNotificationsService.showError(error.error.message);
    });
  }

  setLang() {
    this.translatationService.setLanguage(this.translateService.currentLang === 'en' ? 'ar' : 'en');
  }

}