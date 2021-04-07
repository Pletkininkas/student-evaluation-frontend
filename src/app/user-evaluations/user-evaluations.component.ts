import { StudentService } from './../services/student-service/student.service';
import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { EvaluationStudent } from '../model/evaluation-student';
import { EvaluationService } from '../services/student-service/evaluation/evaluation.service';
import { Student } from '../model/student';
import { SafeUrl } from '@angular/platform-browser';
import {
  streamOptions,
  communicationOptions,
  abilityToLearnOptions,
  directionOptions,
  overallEvaluationOptions,
} from '../shared/evaluation-form-globals';
import { Router } from '@angular/router';
import { faTrashAlt, faEdit } from '@fortawesome/free-regular-svg-icons';
import { faAddressCard } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-user-evaluations',
  templateUrl: './user-evaluations.component.html',
  styleUrls: ['./user-evaluations.component.css'],
})
export class UserEvaluationsComponent implements OnInit {
  public selectedEvaluationId: number;
  public userEvaluations: EvaluationStudent[];
  public streamOptions: string[] = streamOptions;
  public communicationOptions: { id: number; name: string }[] = communicationOptions;
  public abilityToLearnOptions: { id: number; name: string }[] = abilityToLearnOptions;
  public directionOptions: { id: number; name: string }[] = directionOptions;
  public overallEvaluationOptions: { id: number; name: string }[] = overallEvaluationOptions;
  public evaluationTableHeaderNames: string[] = [
    'Photo',
    'Student',
    'Stream',
    'Overall evaluation',
    'Direction',
    'Communication',
    'Ability to learn',
    'Comment',
    'Action',
  ];
  public faTrashAlt = faTrashAlt;
  public faEdit = faEdit;
  public faAddressCard = faAddressCard;

  constructor(
    private evaluationService: EvaluationService,
    private toastr: ToastrService,
    private studentService: StudentService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.evaluationService.getAllUserStudentEvaluations().subscribe((value) => {
      this.userEvaluations = value;
    });
  }

  deleteEvaluation(event) {
    this.evaluationService.deleteEvaluation(event).subscribe(() => {
      this.userEvaluations = this.userEvaluations.filter(
        (evaluation: EvaluationStudent) => evaluation.evaluation.id !== event,
      );
      this.toastr.success('Evaluation was deleted', 'Success', { positionClass: 'toast-bottom-center' });
    });
  }

  getStudentImage(student: Student): SafeUrl {
    return this.studentService.getImage(student);
  }

  editEvaluation(evaluationId: number, studentId: number) {
    this.router.navigate(['/evaluate'], { queryParams: { editStudent: studentId, evaluation: evaluationId } });
  }

  selectEvaluation(evaluationId) {
    this.selectedEvaluationId = evaluationId;
  }
}
