import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
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
  @Input() service: any

  serviceForm: FormGroup;
  logo: any
  media:any

  selectedLogo: any
  selectedMedia: any
  
  logoReader: any
  url = environment.apiUrl;

  constructor(
    private fb: FormBuilder,
    public route: ActivatedRoute,
    public translate: TranslateService,
    private toastNotificationsService: ToastNotificationsService,
    private servicesService: ServicesService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.initForm();
    if(this.service){
      this.patchValues()
      this.logo = this.service.logo
      this.media = this.service.media
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

  patchValues(){
    this.serviceForm.patchValue({
      serviceId: this.service._id,
      title_ar: this.service.title.ar,
      title_en: this.service.title.en,
      description_ar: this.service.description.ar,
      description_en: this.service.description.en,
      whatsappLink: this.service.whatsappLink 
    })
  }

  onSave() {
    if (this.serviceForm.invalid) {
      let message = this.translate.instant('GENERAL.FILL_REQUIRED_FIELDS');
      this.toastNotificationsService.showError(message);
      return;
    }

    const formData = new FormData();    
    this.selectedLogo ? formData.append('logo', this.selectedLogo) : formData.append('logo', this.logo);
    if(this.selectedMedia){
      for(let item of this.selectedMedia){
        formData.append("media", item);   
      }
    } 
    formData.append('title_ar', this.serviceForm.value.title_ar);
    formData.append('title_en', this.serviceForm.value.title_en);
    formData.append('description_en', this.serviceForm.value.description_en);
    formData.append('description_ar', this.serviceForm.value.description_ar);
    formData.append('whatsappLink', this.serviceForm.value.whatsappLink);

    if(this.service){
      formData.append('oldMedia', this.media);
      formData.append('serviceId', this.serviceForm.value.serviceId);

      this.servicesService.editService(formData).subscribe((data: any)=>{
        if(data.success){
          this.onBack(true);
        }
      })
    }else{
      this.servicesService.createService(formData).subscribe((data: any)=>{
        if(data.success){
          this.onBack(true);
        }
      })
    }
  }

  onBack(reloadData = false) {
    if(this.service){
      this.logo = this.service.logo
      this.media = this.service.media
    }
    this.back.emit({ reloadData });
  }

  onLogoSelected(event) {
    this.selectedLogo = event.target.files[0] ?? null;  
    this.readLogo(event.target.files[0]);
  }

  onMediaSelected(event) {
    this.selectedMedia = event.target.files ?? null;  
  }

  readLogo(inputValue: any) : void {
    let file:File = inputValue; 
    let myReader:any = new FileReader();

    myReader.onloadend = function(e){
      this.logoReader = myReader.result
    }

    myReader.readAsText(file);
  }

  removeLogo(){
    this.selectedLogo = ""
    this.logo = ""
  }

  removeMedia(img){
    this.media = this.media.filter((item)=>{
      return item != img
    })
  }

}