import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeeB24Component } from './employee-b24.component';

describe('EmployeeB24Component', () => {
  let component: EmployeeB24Component;
  let fixture: ComponentFixture<EmployeeB24Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmployeeB24Component ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EmployeeB24Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
