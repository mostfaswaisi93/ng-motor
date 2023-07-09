import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageServicesFormComponent } from './manage-services-form.component';

describe('ManageServicesFormComponent', () => {
  let component: ManageServicesFormComponent;
  let fixture: ComponentFixture<ManageServicesFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManageServicesFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageServicesFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
