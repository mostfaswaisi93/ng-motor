import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { ToastNotificationsService } from 'src/app/core/services';
import { GeneralService } from 'src/app/core/services/general.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-who-we-are',
  templateUrl: './who-we-are.component.html',
  styleUrls: ['./who-we-are.component.scss']
})
export class WhoWeAreComponent implements OnInit {

  whoWeAreData: any;
  whoWeAreForm: FormGroup;
  media: any;
  selectedMedia: any[];
  mediaReader: string[] = [];
  url = environment.apiUrl;

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
    this.whoWeAreForm = this.fb.group({
      media: new FormControl(''),
      title_ar: new FormControl('', { validators: [Validators.required, Validators.pattern("[\u0600-\u06FF 0-9\.()~!@#$%^'&=+;,{}_-]+")] }),
      title_en: new FormControl('', { validators: [Validators.required, Validators.pattern("[a-zA-Z 0-9\.()~!@#$%^'&=+;,{}_-]+")] }),
      description_ar: new FormControl('', { validators: [Validators.required, Validators.pattern("[\u0600-\u06FF 0-9\.()~!@#$%^'&=+;,{}_-]+")] }),
      description_en: new FormControl('', { validators: [Validators.required, Validators.pattern("[a-zA-Z 0-9\.()~!@#$%^'&=+;,{}_-]+")] }),
    });
  }

  getData() {
    this.generalService.getGeneralWhoWeAre().subscribe(data => {
      this.whoWeAreData = data.data?.whoAreWe;
      this.media = this.whoWeAreData.media;
      this.selectedMedia= []
      this.mediaReader = []

      this.whoWeAreForm.patchValue({
        title_ar: this.whoWeAreData?.title.ar,
        title_en: this.whoWeAreData?.title.en,
        description_ar: this.whoWeAreData?.description?.ar,
        description_en: this.whoWeAreData?.description?.en
      });
    }, error => {
      this.toastNotificationsService.showError(error.error.message);
    });
  }

  onSave() {
    if (this.whoWeAreForm.invalid) {
      let message = this.translateService.instant('GENERAL.FILL_REQUIRED_FIELDS');
      this.toastNotificationsService.showError(message);
      return;
    }

    const formData = new FormData();
    if (this.selectedMedia) {
      for (let item of this.selectedMedia) {
        formData.append('media', item);
      }
    }

    formData.append('title_ar', this.whoWeAreForm.value.title_ar);
    formData.append('title_en', this.whoWeAreForm.value.title_en);
    formData.append('description_en', this.whoWeAreForm.value.description_en);
    formData.append('description_ar', this.whoWeAreForm.value.description_ar);
    formData.append('oldMedia', this.media);

    this.generalService.generalWhoWeAre(formData).subscribe((data: any) => {
      this.getData();
      this.toastNotificationsService.showSuccess(this.translateService.instant('WHOWEARE.SUCCESS_MSG'));
    }, error => {
      this.toastNotificationsService.showError(error.error.message);
    });
  }

  onMediaSelected(event) {
    this.selectedMedia = [...event.target.files] ?? null;
    this.readSelectedMedia(event.target.files);
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