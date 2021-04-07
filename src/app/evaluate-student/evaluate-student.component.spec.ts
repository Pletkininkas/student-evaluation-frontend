import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EvaluateStudentComponent } from './evaluate-student.component';

describe('EvaluateStudentComponent', () => {
  let component: EvaluateStudentComponent;
  let fixture: ComponentFixture<EvaluateStudentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EvaluateStudentComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EvaluateStudentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
