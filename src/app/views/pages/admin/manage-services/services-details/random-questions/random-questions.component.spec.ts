import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RandomQuestionsComponent } from './random-questions.component';

describe('RandomQuestionsComponent', () => {
  let component: RandomQuestionsComponent;
  let fixture: ComponentFixture<RandomQuestionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RandomQuestionsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RandomQuestionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
