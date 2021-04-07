import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { StudentService } from '../services/student-service/student.service';
import { Student } from '../model/student';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EvaluationService } from '../services/student-service/evaluation/evaluation.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { EvaluationPost } from '../model/evaluationPost';
import { ActivatedRoute } from '@angular/router';
import {
  streamOptions,
  communicationOptions,
  abilityToLearnOptions,
  directionOptions,
  overallEvaluationOptions,
} from '../shared/evaluation-form-globals';
import { Evaluation } from '../model/evaluation';

@Component({
  selector: 'app-evaluate-student',
  templateUrl: './evaluate-student.component.html',
  styleUrls: ['./evaluate-student.component.css'],
})
export class EvaluateStudentComponent implements OnInit {
  students$: Observable<Student[]>;
  studentId: number;
  evaluationId: number;
  editStudentId: number;
  editEvaluation: Evaluation;

  public evaluationForm: FormGroup;
  public streamOptions: string[] = streamOptions;
  public communicationOptions: { id: number; name: string }[] = communicationOptions;
  public abilityToLearnOptions: { id: number; name: string }[] = abilityToLearnOptions;
  public directionOptions: { id: number; name: string }[] = directionOptions;
  public overallEvaluationOptions: { id: number; name: string }[] = overallEvaluationOptions;

  constructor(
    private formBuilder: FormBuilder,
    private studentService: StudentService,
    private evaluationService: EvaluationService,
    private toastr: ToastrService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
  ) {}

  ngOnInit(): void {
    this.studentId = this.activatedRoute.snapshot.queryParams['student'];
    this.evaluationId = this.activatedRoute.snapshot.queryParams['evaluation'];
    this.editStudentId = this.activatedRoute.snapshot.queryParams['editStudent'];
    this.students$ = this.studentService.getAllStudents();
    this.evaluationForm = this.formBuilder.group({
      student: [
        '',
        {
          validators: [Validators.required],
          updateOn: 'blur',
        },
      ],
      stream: [
        '',
        {
          validators: [Validators.required],
          updateOn: 'blur',
        },
      ],
      communication: [''],
      abilityToLearn: [''],
      direction: [
        '',
        {
          validators: [Validators.required],
          updateOn: 'blur',
        },
      ],
      overallEvaluation: [
        '',
        {
          validators: [Validators.required],
          updateOn: 'blur',
        },
      ],
      comment: [
        '',
        {
          validators: [Validators.maxLength(250)],
        },
      ],
    });

    if (this.studentId) {
      this.student.setValue(this.studentId);
      this.student.disable();
    }

    if (this.evaluationId) {
      this.evaluationService.getEvaluationById(this.evaluationId).subscribe((value) => {
        this.editEvaluation = value;
        this.student.setValue(this.editStudentId);
        this.student.disable();
        this.stream.setValue(this.streamOptions.indexOf(this.editEvaluation.stream));
        this.communication.setValue(this.editEvaluation.communication || '');
        this.abilityToLearn.setValue(this.editEvaluation.learnAbility || '');
        this.direction.setValue(this.editEvaluation.direction);
        this.overallEvaluation.setValue(this.editEvaluation.evaluation);
        this.comment.setValue(this.editEvaluation.comment);
      });
    }
  }

  submitForm() {
    const studentEvaluationForm: EvaluationPost = {
      stream: this.stream.value,
      communication: this.communication.value || undefined,
      learnAbility: this.abilityToLearn.value || undefined,
      direction: this.direction.value,
      evaluation: this.overallEvaluation.value,
      comment: this.comment.value,
    };

    if (this.evaluationForm.valid) {
      if (this.evaluationId) {
        this.evaluationService
          .updateEvaluation(this.editStudentId, this.evaluationId, studentEvaluationForm)
          .subscribe(() => {
            this.router.navigate(['/myevaluations']);
          });
      } else {
        this.evaluationService.postEvaluation(this.student.value, studentEvaluationForm).subscribe((response) => {
          if (response) {
            this.toastr.success('Evaluation was successfully submited!', 'Success', {
              positionClass: 'toast-bottom-center',
            });
            if (this.studentId) {
              this.router.navigate([`/student/${this.studentId}`]);
            } else {
              this.router.navigate(['/main']);
            }
          } else {
            this.toastr.error('Evaluation was not submited', 'Error', { positionClass: 'toast-bottom-center' });
          }
        });
      }
    } else {
      this.toastr.error('Please check your input fields', 'Error', { positionClass: 'toast-bottom-center' });
    }
  }

  deleteEvaluation(evaluationId: number) {
    this.evaluationService.deleteEvaluation(evaluationId).subscribe(() => {
      this.router.navigate(['/main']);
      this.toastr.success('Evaluation was deleted', 'Success', { positionClass: 'toast-bottom-center' });
    });
  }

  get student() {
    return this.evaluationForm.get('student');
  }
  get stream() {
    return this.evaluationForm.get('stream');
  }
  get communication() {
    return this.evaluationForm.get('communication');
  }
  get abilityToLearn() {
    return this.evaluationForm.get('abilityToLearn');
  }
  get direction() {
    return this.evaluationForm.get('direction');
  }
  get overallEvaluation() {
    return this.evaluationForm.get('overallEvaluation');
  }
  get comment() {
    return this.evaluationForm.get('comment');
  }
}
