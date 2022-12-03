import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskListB24Component } from './task-list-b24.component';

describe('TaskListB24Component', () => {
  let component: TaskListB24Component;
  let fixture: ComponentFixture<TaskListB24Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TaskListB24Component ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TaskListB24Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
