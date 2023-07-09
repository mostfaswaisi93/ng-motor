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
    private toastNotificationsService: ToastNotificationsService,
    public translate: TranslateService,
    public route: ActivatedRoute, private fb: FormBuilder
  ) { }
  ngOnInit(): void {
    this.initForm();
  }

  initForm() {
    this.serviceForm = this.fb.group({
      id: new FormControl(null),
      nameAr: new FormControl(null, { validators: [Validators.required, Validators.pattern("[\u0600-\u06FF 0-9\.()~!@#$%^'&=+;,{}_-]+")] }),
      nameEn: new FormControl(null, { validators: [Validators.required, Validators.pattern("[a-zA-Z 0-9\.()~!@#$%^'&=+;,{}_-]+")] }),
      active: new FormControl(1, { validators: [Validators.required] }),
      phone: new FormControl(null, { validators: [Validators.required, Validators.pattern('^.{8}$')] })
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