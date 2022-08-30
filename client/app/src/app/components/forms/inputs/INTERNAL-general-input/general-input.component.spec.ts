import { ComponentFixture, TestBed } from '@angular/core/testing';

import { _GeneralInputComponent } from './general-input.component';

describe('GeneralInputComponent', () => {
  let component: _GeneralInputComponent;
  let fixture: ComponentFixture<_GeneralInputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ _GeneralInputComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(_GeneralInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
