import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WhatDoWeApplyComponent } from './what-do-we-apply.component';

describe('WhatDoWeApplyComponent', () => {
  let component: WhatDoWeApplyComponent;
  let fixture: ComponentFixture<WhatDoWeApplyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WhatDoWeApplyComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WhatDoWeApplyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
