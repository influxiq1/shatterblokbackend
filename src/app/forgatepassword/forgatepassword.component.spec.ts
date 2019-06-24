import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ForgatepasswordComponent } from './forgatepassword.component';

describe('ForgatepasswordComponent', () => {
  let component: ForgatepasswordComponent;
  let fixture: ComponentFixture<ForgatepasswordComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ForgatepasswordComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ForgatepasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
