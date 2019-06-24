import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminmodalformComponent } from './adminmodalform.component';

describe('AdminmodalformComponent', () => {
  let component: AdminmodalformComponent;
  let fixture: ComponentFixture<AdminmodalformComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminmodalformComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminmodalformComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
