import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { ToastNotificationsService } from 'src/app/core/services';
import { ManagementService } from 'src/app/core/services/management.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-management-form',
  templateUrl: './management-form.component.html',
  styleUrls: ['./management-form.component.scss']
})
export class ManagementFormComponent implements OnInit {

  @Output() back = new EventEmitter<any>();
  @Input() management: any;

  managementForm: FormGroup;
  image: any
  imageReader: any
  selectedImage: any
  url = environment.apiUrl

  constructor(
    private fb: FormBuilder,
    public route: ActivatedRoute,
    public translate: TranslateService,
    private managementService: ManagementService,
    private toastNotificationsService: ToastNotificationsService
  ) { }

  ngOnInit(): void {
    this.initForm();
    if (this.management) {
      this.patchValues();
      this.image = this.management.image;
    }

  }

  initForm() {
    this.managementForm = this.fb.group({
      managementId: new FormControl(''),
      image: new FormControl(''),
      title_ar: new FormControl('', { validators: [Validators.required, Validators.pattern("[\u0600-\u06FF 0-9\.()~!@#$%^'&=+;,{}_-]+")] }),
      title_en: new FormControl('', { validators: [Validators.required, Validators.pattern("[a-zA-Z 0-9\.()~!@#$%^'&=+;,{}_-]+")] }),
      description_ar: new FormControl('', { validators: [Validators.required, Validators.pattern("[\u0600-\u06FF 0-9\.()~!@#$%^'&=+;,{}_-]+")] }),
      description_en: new FormControl('', { validators: [Validators.required, Validators.pattern("[a-zA-Z 0-9\.()~!@#$%^'&=+;,{}_-]+")] }),
      email: new FormControl('', { validators: [Validators.required, Validators.pattern('^([\\w-]+(?:\\.[\\w-]+)*)@((?:[\\w-]+\\.)*\\w[\\w-]{0,66})\\.([A-Za-z]{2,6}(?:\\.[A-Za-z]{2,6})?)$')] }),
      phoneNumber: new FormControl('', { validators: [Validators.required, Validators.pattern('^.{8}$')] }),
      type: new FormControl('')
    });
  }

  patchValues() {
    this.managementForm.patchValue({
      managementId: this.management._id,
      title_ar: this.management.title.ar,
      title_en: this.management.title.en,
      description_ar: this.management.description.ar,
      description_en: this.management.description.en,
      email: this.management.email,
      phoneNumber: this.management.phoneNumber
    })
  }

  onSave() {
    if (this.managementForm.invalid) {
      let message = this.translate.instant('GENERAL.FILL_REQUIRED_FIELDS');
      this.toastNotificationsService.showError(message);
      return;
    }

    const formData = new FormData();
    this.selectedImage ? formData.append('image', this.selectedImage) : formData.append('image', this.image);

    formData.append('title_ar', this.managementForm.value.title_ar);
    formData.append('title_en', this.managementForm.value.title_en);
    formData.append('description_en', this.managementForm.value.description_en);
    formData.append('description_ar', this.managementForm.value.description_ar);
    formData.append('email', this.managementForm.value.email);
    formData.append('phoneNumber', this.managementForm.value.phoneNumber);

    if (this.management) {
      this.updateManagement(formData);
    } else {
      this.addManagement(formData);
    }
  }

  addManagement(formData) {
    formData.append('type', 'General');
    this.managementService.createManagement(formData).subscribe((data: any) => {
      if (data.success) {
        this.onBack(true);
      }
    });
  }

  updateManagement(formData) {
    formData.append('managementId', this.managementForm.value.managementId);
    this.managementService.editManagement(formData).subscribe((data: any) => {
      if (data.success) {
        this.onBack(true);
      }
    });
  }

  onBack(reloadData = false) {
    if (this.management) {
      this.image = this.management.image;
    }
    this.back.emit({ reloadData });
  }

  removeImageReader() {
    this.selectedImage = '';
    this.image = '';
    this.imageReader = '';
  }

  removeImage() {
    this.selectedImage = '';
    this.image = '';
  }

  onImageSelected(event) {
    this.selectedImage = event.target.files[0] ?? null;
    this.readSelectedImage(event.target.files[0]);
  }

  readSelectedImage(img) {
    let reader = new FileReader();
    reader.readAsDataURL(img);
    reader.onload = (event) => {
      this.imageReader = event.target.result;
      this.image = '';
    }
  }

}