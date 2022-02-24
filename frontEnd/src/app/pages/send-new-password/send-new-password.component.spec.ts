import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SendNewPasswordComponent } from './send-new-password.component';

describe('SendNewPasswordComponent', () => {
  let component: SendNewPasswordComponent;
  let fixture: ComponentFixture<SendNewPasswordComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SendNewPasswordComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SendNewPasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
