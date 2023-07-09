import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { ToastNotificationsService } from 'src/app/core/services';

@Component({
  selector: 'app-manage-services-form',
  templateUrl: './manage-services-form.component.html',
  styleUrls: ['./manage-services-form.component.scss']
})
export class ManageServicesFormComponent implements OnInit {

  @Output() back = new EventEmitter<any>();
  serviceForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    public route: ActivatedRoute,
    public translate: TranslateService,
    private toastNotificationsService: ToastNotificationsService
  ) { }

  ngOnInit(): void {
    this.initForm();
  }

  initForm() {
    this.serviceForm = this.fb.group({
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

  onSave() {
    if (this.serviceForm.invalid) {
      let message = this.translate.instant('GENERAL.FILL_REQUIRED_FIELDS');
      this.toastNotificationsService.showError(message);
      return;
    }
  }

  update() {
  }

  onBack(reloadData = false) {
    this.back.emit({ reloadData });
  }

}