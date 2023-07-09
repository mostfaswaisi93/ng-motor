import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { ToastNotificationsService } from 'src/app/core/services';
import { GeneralService } from 'src/app/core/services/general.service';

@Component({
  selector: 'app-manage-social-media',
  templateUrl: './manage-social-media.component.html',
  styleUrls: ['./manage-social-media.component.scss']
})
export class ManageSocialMediaComponent implements OnInit {

  socialMediaData: any;
  socialMediaForm: FormGroup;

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
    this.socialMediaForm = this.fb.group({
      snapChat: new FormControl(null, { validators: [Validators.required, Validators.pattern("^(http[s]?:\/\/)?([www\.])?([a-zA-Z0-9-]+\.)*[a-zA-Z0-9-]+\.[a-zA-Z]{2,}(\.[a-zA-Z]{2,})?$")] }),
      instagram: new FormControl(null, { validators: [Validators.required, Validators.pattern("^(http[s]?:\/\/)?([www\.])?([a-zA-Z0-9-]+\.)*[a-zA-Z0-9-]+\.[a-zA-Z]{2,}(\.[a-zA-Z]{2,})?$")] }),
      tiktok: new FormControl(null, { validators: [Validators.required, Validators.pattern("^(http[s]?:\/\/)?([www\.])?([a-zA-Z0-9-]+\.)*[a-zA-Z0-9-]+\.[a-zA-Z]{2,}(\.[a-zA-Z]{2,})?$")] }),
      youtube: new FormControl(null, { validators: [Validators.required, Validators.pattern("^(http[s]?:\/\/)?([www\.])?([a-zA-Z0-9-]+\.)*[a-zA-Z0-9-]+\.[a-zA-Z]{2,}(\.[a-zA-Z]{2,})?$")] }),
      facebook: new FormControl(null, { validators: [Validators.required, Validators.pattern("^(http[s]?:\/\/)?([www\.])?([a-zA-Z0-9-]+\.)*[a-zA-Z0-9-]+\.[a-zA-Z]{2,}(\.[a-zA-Z]{2,})?$")] }),
      twitter: new FormControl(null, { validators: [Validators.required, Validators.pattern("^(http[s]?:\/\/)?([www\.])?([a-zA-Z0-9-]+\.)*[a-zA-Z0-9-]+\.[a-zA-Z]{2,}(\.[a-zA-Z]{2,})?$")] }),
    });
  }

  getData() {
    this.generalService.getGeneralSocialMedia().subscribe((data: any) => {
      this.socialMediaData = data.data.socialMedia;
      this.socialMediaForm.patchValue({
        snapChat: this.socialMediaData?.snapChat,
        instagram: this.socialMediaData?.instagram,
        tiktok: this.socialMediaData?.tiktok,
        youtube: this.socialMediaData?.youtube,
        facebook: this.socialMediaData?.facebook,
        twitter: this.socialMediaData?.twitter
      });
    }, error => {
      this.toastNotificationsService.showError(error.error.message);
    });
  }

  onSave() {
    if (this.socialMediaForm.invalid) {
      let message = this.translateService.instant('GENERAL.FILL_REQUIRED_FIELDS');
      this.toastNotificationsService.showError(message);
      return;
    }
    let data = this.socialMediaForm.getRawValue();
    this.generalService.generalSocialMedia(data).subscribe((data: any) => {
      this.getData();
      this.toastNotificationsService.showSuccess(this.translateService.instant('SOCIALMEDIA.SUCCESS_MSG'));
    }, error => {
      this.toastNotificationsService.showError(error.error.message);
    });
  }

}