import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { ToastNotificationsService } from 'src/app/core/services';
import { ServicesService } from 'src/app/core/services/services.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-manage-services-form',
  templateUrl: './manage-services-form.component.html',
  styleUrls: ['./manage-services-form.component.scss']
})
export class ManageServicesFormComponent implements OnInit {

  @Output() back = new EventEmitter<any>();
  @Input() service: any;

  serviceForm: FormGroup;
  logo: any = '';
  media: any;
  selectedLogo: any;
  selectedMedia: any[];
  logoReader: any;
  mediaReader: string[] = [];
  url = environment.apiUrl;

  constructor(
    private fb: FormBuilder,
    public route: ActivatedRoute,
    public translate: TranslateService,
    private servicesService: ServicesService,
    private toastNotificationsService: ToastNotificationsService
  ) { }

  ngOnInit(): void {
    this.initForm();
    if (this.service) {
      this.patchValues();
      this.logo = this.service.logo;
      this.media = this.service.media;
    }
  }

  initForm() {
    this.serviceForm = this.fb.group({
      serviceId: new FormControl(''),
      logo: new FormControl(''),
      media: new FormControl(''),
      title_ar: new FormControl('', { validators: [Validators.required, Validators.pattern("[\u0600-\u06FF 0-9\.()~!@#$%^'&=+;,{}_-]+")] }),
      title_en: new FormControl('', { validators: [Validators.required, Validators.pattern("[a-zA-Z 0-9\.()~!@#$%^'&=+;,{}_-]+")] }),
      description_ar: new FormControl('', { validators: [Validators.required, Validators.pattern("[\u0600-\u06FF 0-9\.()~!@#$%^'&=+;,{}_-]+")] }),
      description_en: new FormControl('', { validators: [Validators.required, Validators.pattern("[a-zA-Z 0-9\.()~!@#$%^'&=+;,{}_-]+")] }),
      whatsappLink: new FormControl('', { validators: [Validators.required, Validators.pattern("[a-zA-Z 0-9\.()~!@#$%^'&=+;,{}_-]+")] })
    });
  }

  patchValues() {
    this.serviceForm.patchValue({
      serviceId: this.service._id,
      title_ar: this.service.title.ar,
      title_en: this.service.title.en,
      description_ar: this.service.description.ar,
      description_en: this.service.description.en,
      whatsappLink: this.service.whatsappLink
    });
  }

  onSave() {
    if (this.serviceForm.invalid) {
      let message = this.translate.instant('GENERAL.FILL_REQUIRED_FIELDS');
      this.toastNotificationsService.showError(message);
      return;
    }

    const formData = new FormData();
    this.selectedLogo ? formData.append('logo', this.selectedLogo) : formData.append('logo', this.logo);
    if (this.selectedMedia) {
      for (let item of this.selectedMedia) {
        formData.append('media', item);
      }
    }
    formData.append('title_ar', this.serviceForm.value.title_ar);
    formData.append('title_en', this.serviceForm.value.title_en);
    formData.append('description_en', this.serviceForm.value.description_en);
    formData.append('description_ar', this.serviceForm.value.description_ar);
    formData.append('whatsappLink', this.serviceForm.value.whatsappLink);

    if (this.service) {
      this.updateServie(formData);
    } else {
      this.addServie(formData);
    }
  }

  addServie(formData) {
    this.servicesService.createService(formData).subscribe((data: any) => {
      if (data.success) {
        this.onBack(true);
      }
    });
  }

  updateServie(formData) {
    formData.append('oldMedia', this.media);
    formData.append('serviceId', this.serviceForm.value.serviceId);
    this.servicesService.editService(formData).subscribe((data: any) => {
      if (data.success) {
        this.onBack(true);
      }
    });
  }

  onBack(reloadData = false) {
    if (this.service) {
      this.logo = this.service.logo;
      this.media = this.service.media;
    }
    this.back.emit({ reloadData });
  }

  onLogoSelected(event) {
    this.selectedLogo = event.target.files[0] ?? null;
    this.readSelectedLogo(event.target.files[0]);
  }

  onMediaSelected(event) {
    this.selectedMedia = [...event.target.files] ?? null;
    this.readSelectedMedia(event.target.files);
  }

  readSelectedLogo(img) {
    let reader = new FileReader();
    reader.readAsDataURL(img);
    reader.onload = (event) => {
      this.logoReader = event.target.result;
    }
  }

  readSelectedMedia(arr) {
    for (let i = 0; i < arr.length; i++) {
      let reader = new FileReader();
      reader.readAsDataURL(arr[i]);
      reader.onload = (event: any) => {
        this.mediaReader.push(event.target.result);
      }
    }
  }

  removeLogo() {
    this.selectedLogo = '';
    this.logo = '';
  }

  removeLogoReader() {
    this.selectedLogo = '';
    this.logo = '';
    this.logoReader = '';
  }

  removeMedia(img) {
    this.media = this.media.filter((item) => {
      return item != img;
    });
  }

  removeMediaReader(img, i) {
    this.mediaReader = this.mediaReader.filter((item) => item != img);
    this.selectedMedia.splice(i, 1);
  }

}