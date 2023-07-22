import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManagementsDetailsComponent } from './managements-details.component';

describe('ManagementsDetailsComponent', () => {
  let component: ManagementsDetailsComponent;
  let fixture: ComponentFixture<ManagementsDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManagementsDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ManagementsDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
