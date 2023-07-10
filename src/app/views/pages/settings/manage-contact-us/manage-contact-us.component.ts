import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { ToastNotificationsService } from 'src/app/core/services';
import { GeneralService } from 'src/app/core/services/general.service';

@Component({
  selector: 'app-manage-contact-us',
  templateUrl: './manage-contact-us.component.html',
  styleUrls: ['./manage-contact-us.component.scss']
})
export class ManageContactUsComponent implements OnInit {

  contactUsData: any;
  contactUsForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    public route: ActivatedRoute,
    public generalService: GeneralService,
    public translateService: TranslateService,
    private toastNotificationsService: ToastNotificationsService
  ) { }

  ngOnInit(): void {
    this.initForm();
    this.getData();
  }

  initForm() {
    this.contactUsForm = this.fb.group({
      city_ar: new FormControl(null, { validators: [Validators.required, Validators.pattern("[\u0600-\u06FF 0-9\.()~!@#$%^'&=+;,{}_-]+")] }),
      city_en: new FormControl(null, { validators: [Validators.required, Validators.pattern("[a-zA-Z 0-9\.()~!@#$%^'&=+;,{}_-]+")] }),
      country_ar: new FormControl(null, { validators: [Validators.required, Validators.pattern("[\u0600-\u06FF 0-9\.()~!@#$%^'&=+;,{}_-]+")] }),
      country_en: new FormControl(null, { validators: [Validators.required, Validators.pattern("[a-zA-Z 0-9\.()~!@#$%^'&=+;,{}_-]+")] }),
      address_ar: new FormControl(null, { validators: [Validators.required, Validators.pattern("[\u0600-\u06FF 0-9\.()~!@#$%^'&=+;,{}_-]+")] }),
      address_en: new FormControl(null, { validators: [Validators.required, Validators.pattern("[a-zA-Z 0-9\.()~!@#$%^'&=+;,{}_-]+")] }),
      primaryEmail: new FormControl(null, { validators: [Validators.required, Validators.pattern('^([\\w-]+(?:\\.[\\w-]+)*)@((?:[\\w-]+\\.)*\\w[\\w-]{0,66})\\.([A-Za-z]{2,6}(?:\\.[A-Za-z]{2,6})?)$')] }),
      secondaryEmail: new FormControl(null, { validators: [Validators.required, Validators.pattern('^([\\w-]+(?:\\.[\\w-]+)*)@((?:[\\w-]+\\.)*\\w[\\w-]{0,66})\\.([A-Za-z]{2,6}(?:\\.[A-Za-z]{2,6})?)$')] }),
      primaryPhoneNumber: new FormControl(null, { validators: [Validators.required, Validators.pattern('^.{8}$')] }),
      secondaryPhoneNumber: new FormControl(null, { validators: [Validators.required, Validators.pattern('^.{8}$')] })
    });
  }

  getData() {
    this.generalService.getGeneralContactUs().subscribe(data => {
      this.contactUsData = data.data.contactUs;
      this.contactUsForm.patchValue({
        city_ar: this.contactUsData?.city?.ar,
        city_en: this.contactUsData?.city?.en,
        country_ar: this.contactUsData?.country?.ar,
        country_en: this.contactUsData?.country?.en,
        address_ar: this.contactUsData?.address?.ar,
        address_en: this.contactUsData?.address?.en,
        primaryEmail: this.contactUsData?.email?.primary,
        secondaryEmail: this.contactUsData?.email?.secondary,
        primaryPhoneNumber: this.contactUsData?.phoneNumber?.primary,
        secondaryPhoneNumber: this.contactUsData?.phoneNumber?.secondary
      });
    }, error => {
      this.toastNotificationsService.showError(error.error.message);
    });
  }

  onSave() {
    if (this.contactUsForm.invalid) {
      let message = this.translateService.instant('GENERAL.FILL_REQUIRED_FIELDS');
      this.toastNotificationsService.showError(message);
      return;
    }
    let data = this.contactUsForm.getRawValue();
    this.generalService.generalContactUs(data).subscribe((data: any) => {
      this.getData();
      this.toastNotificationsService.showSuccess(this.translateService.instant('CONTACTUS.SUCCESS_MSG'));
    }, error => {
      this.toastNotificationsService.showError(error.error.message);
    });
  }

}