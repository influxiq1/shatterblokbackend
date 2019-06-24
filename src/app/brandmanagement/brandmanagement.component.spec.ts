import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BrandmanagementComponent } from './brandmanagement.component';

describe('BrandmanagementComponent', () => {
  let component: BrandmanagementComponent;
  let fixture: ComponentFixture<BrandmanagementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BrandmanagementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BrandmanagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
