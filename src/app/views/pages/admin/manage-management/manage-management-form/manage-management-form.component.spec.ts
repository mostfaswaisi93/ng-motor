import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageManagementFormComponent } from './manage-management-form.component';

describe('ManageManagementFormComponent', () => {
  let component: ManageManagementFormComponent;
  let fixture: ComponentFixture<ManageManagementFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManageManagementFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageManagementFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
