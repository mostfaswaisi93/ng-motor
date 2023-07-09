import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageOurCommitmentsComponent } from './manage-our-commitments.component';

describe('ManageOurCommitmentsComponent', () => {
  let component: ManageOurCommitmentsComponent;
  let fixture: ComponentFixture<ManageOurCommitmentsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManageOurCommitmentsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageOurCommitmentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
