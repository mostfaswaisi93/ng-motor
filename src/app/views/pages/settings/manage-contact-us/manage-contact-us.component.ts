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

  contactUsForm: FormGroup;
  contactUsData: any;

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
      id: new FormControl(null),
      logo: new FormControl(null),
      media: new FormControl(null),
      title_ar: new FormControl(null, { validators: [Validators.required, Validators.pattern("[\u0600-\u06FF 0-9\.()~!@#$%^'&=+;,{}_-]+")] }),
      title_en: new FormControl(null, { validators: [Validators.required, Validators.pattern("[a-zA-Z 0-9\.()~!@#$%^'&=+;,{}_-]+")] }),
      description_ar: new FormControl(null, { validators: [Validators.required, Validators.pattern("[\u0600-\u06FF 0-9\.()~!@#$%^'&=+;,{}_-]+")] }),
      description_en: new FormControl(null, { validators: [Validators.required, Validators.pattern("[a-zA-Z 0-9\.()~!@#$%^'&=+;,{}_-]+")] }),
      whatsappLink: new FormControl(null, { validators: [Validators.required, Validators.pattern("[a-zA-Z 0-9\.()~!@#$%^'&=+;,{}_-]+")] })
    });
  }

  getData() {
    this.generalService.getGeneralContactUs().subscribe(data => {
      this.contactUsData = data.data.socialMedia;
      // this.contactUsForm.patchValue({
      //   snapChat: this.contactUsData?.snapChat,
      //   instagram: this.contactUsData?.instagram,
      //   tiktok: this.contactUsData?.tiktok,
      //   youtube: this.contactUsData?.youtube,
      //   facebook: this.contactUsData?.facebook,
      //   twitter: this.contactUsData?.twitter
      // });
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
    this.generalService.generalContactUs(data).subscribe((data) => {
      this.getData();
      this.toastNotificationsService.showSuccess(this.translateService.instant('SOCIALMEDIA.SUCCESS_MSG'));
    }, error => {
      this.toastNotificationsService.showError(error.error.message);
    });
  }

}