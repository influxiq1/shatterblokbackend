import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RecentSignUpComponent } from './recent-sign-up.component';

describe('RecentSignUpComponent', () => {
  let component: RecentSignUpComponent;
  let fixture: ComponentFixture<RecentSignUpComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RecentSignUpComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RecentSignUpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
