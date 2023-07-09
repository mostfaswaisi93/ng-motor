import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageManagementComponent } from './manage-management.component';

describe('ManageManagementComponent', () => {
  let component: ManageManagementComponent;
  let fixture: ComponentFixture<ManageManagementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManageManagementComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
