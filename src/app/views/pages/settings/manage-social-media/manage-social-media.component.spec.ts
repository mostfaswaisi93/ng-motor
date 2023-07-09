import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageSocialMediaComponent } from './manage-social-media.component';

describe('ManageSocialMediaComponent', () => {
  let component: ManageSocialMediaComponent;
  let fixture: ComponentFixture<ManageSocialMediaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManageSocialMediaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageSocialMediaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
