import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CalculatedFieldsComponent } from './calculated-fields.component';

describe('CalculatedFieldsComponent', () => {
  let component: CalculatedFieldsComponent;
  let fixture: ComponentFixture<CalculatedFieldsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CalculatedFieldsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CalculatedFieldsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
