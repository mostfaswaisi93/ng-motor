import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { ToastNotificationsService } from 'src/app/core/services';
import { GeneralService } from 'src/app/core/services/general.service';
@Component({
  selector: 'app-what-do-we-apply',
  templateUrl: './what-do-we-apply.component.html',
  styleUrls: ['./what-do-we-apply.component.scss']
})
export class WhatDoWeApplyComponent implements OnInit {

  whatDoWeApplyData: any;
  whatDoWeApplyForm: FormGroup;

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
    this.whatDoWeApplyForm = this.fb.group({
      title_ar: new FormControl('', { validators: [Validators.required, Validators.pattern("[\u0600-\u06FF 0-9\.()~!@#$%^'&=+;,{}_-]+")] }),
      title_en: new FormControl('', { validators: [Validators.required, Validators.pattern("[a-zA-Z 0-9\.()~!@#$%^'&=+;,{}_-]+")] }),
      description_ar: new FormControl('', { validators: [Validators.required, Validators.pattern("[\u0600-\u06FF 0-9\.()~!@#$%^'&=+;,{}_-]+")] }),
      description_en: new FormControl('', { validators: [Validators.required, Validators.pattern("[a-zA-Z 0-9\.()~!@#$%^'&=+;,{}_-]+")] }),
    });
  }

  getData() {
    this.generalService.getGeneralWhatDoWeApply().subscribe(data => {
      this.whatDoWeApplyData = data.data?.whatDoWeApply;

      this.whatDoWeApplyForm.patchValue({
        title_ar: this.whatDoWeApplyData?.title.ar,
        title_en: this.whatDoWeApplyData?.title.en,
        description_ar: this.whatDoWeApplyData?.description?.ar,
        description_en: this.whatDoWeApplyData?.description?.en,
  
      });
    }, error => {
      this.toastNotificationsService.showError(error.error.message);
    });
  }

  onSave() {
    if (this.whatDoWeApplyForm.invalid) {
      let message = this.translateService.instant('GENERAL.FILL_REQUIRED_FIELDS');
      this.toastNotificationsService.showError(message);
      return;
    }

    this.generalService.generalWhatDoWeApply(this.whatDoWeApplyForm.value).subscribe((data: any) => {
      this.getData();
      this.toastNotificationsService.showSuccess(this.translateService.instant('WHATDOWEAPPLY.SUCCESS_MSG'));
    }, error => {
      this.toastNotificationsService.showError(error.error.message);
    });
  }

}