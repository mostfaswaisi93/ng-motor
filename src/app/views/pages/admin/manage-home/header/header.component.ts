import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { ToastNotificationsService } from 'src/app/core/services';
import { GeneralService } from 'src/app/core/services/general.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  headerData: any;
  headerForm: FormGroup;
  logo: any = '';
  media: any= [];
  selectedLogo: any;
  selectedMedia: any[];
  logoReader: any;
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
    this.headerForm = this.fb.group({
      logo: new FormControl(''),
      media: new FormControl(''),
      title_ar: new FormControl('', { validators: [Validators.required, Validators.pattern("[\u0600-\u06FF 0-9\.()~!@#$%^'&=+;,{}_-]+")] }),
      title_en: new FormControl('', { validators: [Validators.required, Validators.pattern("[a-zA-Z 0-9\.()~!@#$%^'&=+;,{}_-]+")] }),
      description_ar: new FormControl('', { validators: [Validators.required, Validators.pattern("[\u0600-\u06FF 0-9\.()~!@#$%^'&=+;,{}_-]+")] }),
      description_en: new FormControl('', { validators: [Validators.required, Validators.pattern("[a-zA-Z 0-9\.()~!@#$%^'&=+;,{}_-]+")] }),
      question_ar: new FormControl('', { validators: [Validators.required, Validators.pattern("[\u0600-\u06FF 0-9\.()~!@#$%^'&=+;,{}_-]+")] }),
      question_en: new FormControl('', { validators: [Validators.required, Validators.pattern("[a-zA-Z 0-9\.()~!@#$%^'&=+;,{}_-]+")] }),
    });
  }

  getData() {
    this.generalService.getGeneralHeader().subscribe(data => {
      this.headerData = data.data?.header;
      this.logo = this.headerData.logo;
      this.media = this.headerData.media;
      this.selectedLogo = ''
      this.selectedMedia= [];
      this.logoReader= ''
      this.mediaReader= [];
    
      this.headerForm.patchValue({
        title_ar: this.headerData.title.ar,
        title_en: this.headerData.title.en,
        description_ar: this.headerData.description.ar,
        description_en: this.headerData.description.en,
        question_ar: this.headerData.question.ar,
        question_en: this.headerData.question.en,
      });
    }, error => {
      this.toastNotificationsService.showError(error.error.message);
    });
  }

  onSave() {
    if (this.headerForm.invalid) {
      let message = this.translateService.instant('GENERAL.FILL_REQUIRED_FIELDS');
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
    formData.append('title_ar', this.headerForm.value.title_ar);
    formData.append('title_en', this.headerForm.value.title_en);
    formData.append('description_en', this.headerForm.value.description_en);
    formData.append('description_ar', this.headerForm.value.description_ar);
    formData.append('question_en', this.headerForm.value.question_en);
    formData.append('question_ar', this.headerForm.value.question_ar);
    formData.append('oldMedia', this.media);

    this.generalService.generalHeader(formData).subscribe((data: any) => {
      this.getData();
      this.toastNotificationsService.showSuccess(this.translateService.instant('HEADER.SUCCESS_MSG'));
    }, error => {
      this.toastNotificationsService.showError(error.error.message);
    });
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