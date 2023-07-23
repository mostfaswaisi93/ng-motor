import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { ToastNotificationsService } from 'src/app/core/services';
import { ServicesService } from 'src/app/core/services/services.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-random-questions-form',
  templateUrl: './random-questions-form.component.html',
  styleUrls: ['./random-questions-form.component.scss']
})
export class RandomQuestionsFormComponent implements OnInit {

  @Output() back = new EventEmitter<any>();
  @Input() question: any;
  serviceId: any

  questionsForm: FormGroup;
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
    if (this.question) {
      this.patchValues();
    }
    this.route.queryParams.subscribe((data) => {
      this.serviceId = data.id
    })
  }

  initForm() {
    this.questionsForm = this.fb.group({
      serviceId: this.serviceId,
      question_ar: new FormControl('', { validators: [Validators.required, Validators.pattern("[\u0600-\u06FF 0-9\.()~!@#$%^'&=+;,{}_-]+")] }),
      question_en: new FormControl('', { validators: [Validators.required, Validators.pattern("[a-zA-Z 0-9\.()~!@#$%^'&=+;,{}_-]+")] }),
      answer_ar: new FormControl('', { validators: [Validators.required, Validators.pattern("[\u0600-\u06FF 0-9\.()~!@#$%^'&=+;,{}_-]+")] }),
      answer_en: new FormControl('', { validators: [Validators.required, Validators.pattern("[a-zA-Z 0-9\.()~!@#$%^'&=+;,{}_-]+")] }),
    });
  }

  patchValues() {
    this.questionsForm.patchValue({
      serviceId: this.serviceId,
      questionId: this.question._id,
      question_ar: this.question.question.ar,
      question_en: this.question.question.en,
      answer_ar: this.question.answer.ar,
      answer_en: this.question.answer.en,
    });
  }

  onSave() {
    if (this.questionsForm.invalid) {
      let message = this.translate.instant('GENERAL.FILL_REQUIRED_FIELDS');
      this.toastNotificationsService.showError(message);
      return;
    }
    this.questionsForm.get('serviceId').setValue(this.serviceId)

    if (this.question) {
      this.updateQuestion();
    } else {
      this.addQuestion();
    }
  }

  addQuestion() {
    this.servicesService.createQuestion(this.questionsForm.value).subscribe((data: any) => {
      if (data.success) {
        this.onBack(true);
      }
    });
  }

  updateQuestion() {
    this.questionsForm.value.questionId = this.question._id

    this.servicesService.editQuestion(this.questionsForm.value).subscribe((data: any) => {
      if (data.success) {
        this.onBack(true);
      }
    });
  }

  onBack(reloadData = false) {
    this.back.emit({ reloadData });
  }
}