import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InfluencersmanagementComponent } from './influencersmanagement.component';

describe('InfluencersmanagementComponent', () => {
  let component: InfluencersmanagementComponent;
  let fixture: ComponentFixture<InfluencersmanagementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InfluencersmanagementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InfluencersmanagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
