import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { ToastNotificationsService } from 'src/app/core/services';
import { GeneralService } from 'src/app/core/services/general.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-manage-our-goals',
  templateUrl: './manage-our-goals.component.html',
  styleUrls: ['./manage-our-goals.component.scss']
})
export class ManageOurGoalsComponent implements OnInit {

  ourGoalsData: any;
  ourGoalsForm: FormGroup;
  image: any
  imageReader: any
  selectedImage: any
  url = environment.apiUrl

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
    this.ourGoalsForm = this.fb.group({
      title_ar: new FormControl(null, { validators: [Validators.required, Validators.pattern("[\u0600-\u06FF 0-9\.()~!@#$%^'&=+;,{}_-]+")] }),
      title_en: new FormControl(null, { validators: [Validators.required, Validators.pattern("[a-zA-Z 0-9\.()~!@#$%^'&=+;,{}_-]+")] }),
      description_ar1: new FormControl('', { validators: [Validators.required, Validators.pattern("[\u0600-\u06FF 0-9\.()~!@#$%^'&=+;,{}_-]+")] }),
      description_en1: new FormControl('', { validators: [Validators.required, Validators.pattern("[a-zA-Z 0-9\.()~!@#$%^'&=+;,{}_-]+")] }),      
      description_ar2: new FormControl('', { validators: [Validators.required, Validators.pattern("[\u0600-\u06FF 0-9\.()~!@#$%^'&=+;,{}_-]+")] }),
      description_en2: new FormControl('', { validators: [Validators.required, Validators.pattern("[a-zA-Z 0-9\.()~!@#$%^'&=+;,{}_-]+")] }),      
    });
  }

  getData() {
    this.generalService.getGeneralOurGoals().subscribe(data => {
      this.ourGoalsData = data.data.ourGoals;
      this.image = data.data.ourGoals.image
      this.selectedImage = ''
      this.imageReader = ''

      this.ourGoalsForm.patchValue({
        title_ar: this.ourGoalsData?.title.ar,
        title_en: this.ourGoalsData?.title.en,
        description_ar1: this.ourGoalsData?.description1.ar,
        description_en1: this.ourGoalsData?.description1.en,      
        description_ar2: this.ourGoalsData?.description2.ar,
        description_en2: this.ourGoalsData?.description2.en,      
      });
    }, error => {
      this.toastNotificationsService.showError(error.error.message);
    });
  }

  onSave() {
    if (this.ourGoalsForm.invalid) {
      let message = this.translateService.instant('GENERAL.FILL_REQUIRED_FIELDS');
      this.toastNotificationsService.showError(message);
      return;
    }

    const formData = new FormData();
    this.selectedImage ? formData.append('image', this.selectedImage) : formData.append('image', this.image);
    formData.append('title_ar', this.ourGoalsForm.value.title_ar);
    formData.append('title_en', this.ourGoalsForm.value.title_en);
    formData.append('description_en1', this.ourGoalsForm.value.description_en1);
    formData.append('description_ar1', this.ourGoalsForm.value.description_ar1);
    formData.append('description_en2', this.ourGoalsForm.value.description_en2);
    formData.append('description_ar2', this.ourGoalsForm.value.description_ar2);

    this.generalService.generalOurGoals(formData).subscribe((data) => {
      this.getData();
      this.toastNotificationsService.showSuccess(this.translateService.instant('OURGOALS.SUCCESS_MSG'));
    }, error => {
      this.toastNotificationsService.showError(error.error.message);
    });
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