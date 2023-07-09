import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageOurGoalsComponent } from './manage-our-goals.component';

describe('ManageOurGoalsComponent', () => {
  let component: ManageOurGoalsComponent;
  let fixture: ComponentFixture<ManageOurGoalsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManageOurGoalsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageOurGoalsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
