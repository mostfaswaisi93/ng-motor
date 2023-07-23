import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RandomQuestionsFormComponent } from './random-questions-form.component';

describe('RandomQuestionsFormComponent', () => {
  let component: RandomQuestionsFormComponent;
  let fixture: ComponentFixture<RandomQuestionsFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RandomQuestionsFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RandomQuestionsFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
