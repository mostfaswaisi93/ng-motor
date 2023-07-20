import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { ToastNotificationsService } from 'src/app/core/services';
import { ManagementService } from 'src/app/core/services/management.service';

@Component({
  selector: 'app-management-form',
  templateUrl: './management-form.component.html',
  styleUrls: ['./management-form.component.scss']
})
export class ManagementFormComponent implements OnInit {

  @Output() back = new EventEmitter<any>();
  serviceForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    public route: ActivatedRoute,
    public translate: TranslateService,
    private toastNotificationsService: ToastNotificationsService,
    private managementService: ManagementService
  ) { }

  ngOnInit(): void {
    this.initForm();
  }

  initForm() {
    this.serviceForm = this.fb.group({
      serviceId: new FormControl(null),
      image: new FormControl(null),
      title_ar: new FormControl(null, { validators: [Validators.required, Validators.pattern("[\u0600-\u06FF 0-9\.()~!@#$%^'&=+;,{}_-]+")] }),
      title_en: new FormControl(null, { validators: [Validators.required, Validators.pattern("[a-zA-Z 0-9\.()~!@#$%^'&=+;,{}_-]+")] }),
      description_ar: new FormControl(null, { validators: [Validators.required, Validators.pattern("[\u0600-\u06FF 0-9\.()~!@#$%^'&=+;,{}_-]+")] }),
      description_en: new FormControl(null, { validators: [Validators.required, Validators.pattern("[a-zA-Z 0-9\.()~!@#$%^'&=+;,{}_-]+")] }),
      email: new FormControl(null, { validators: [Validators.required, Validators.pattern('^([\\w-]+(?:\\.[\\w-]+)*)@((?:[\\w-]+\\.)*\\w[\\w-]{0,66})\\.([A-Za-z]{2,6}(?:\\.[A-Za-z]{2,6})?)$')] }),
      phoneNumber: new FormControl(null, { validators: [Validators.required, Validators.pattern('^.{8}$')] }),
      type: "General"
    });
  }

  onSave() {
    if (this.serviceForm.invalid) {
      let message = this.translate.instant('GENERAL.FILL_REQUIRED_FIELDS');
      this.toastNotificationsService.showError(message);
      return;
    }

    this.managementService.createManagement(this.serviceForm.value).subscribe((data: any)=>{
      if(data.success){
        this.onBack(true);
      }
    })
  }

  update() {
  }

  onBack(reloadData = false) {
    this.back.emit({ reloadData });
  }

}