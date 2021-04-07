import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { StudentService } from '../services/student-service/student.service';
import { Student } from '../model/student';
import { forkJoin, Observable, of } from 'rxjs';
import { ParamMap } from '@angular/router';
import { SafeUrl } from '@angular/platform-browser';
import { EvaluationService } from '../services/student-service/evaluation/evaluation.service';
import { Evaluation } from '../model/evaluation';
import { AuthService } from '../services/auth-service.service';
import domtoimage from 'dom-to-image';
import * as FileSaver from 'file-saver';
import {
  streamOptions,
  communicationOptions,
  abilityToLearnOptions,
  directionOptions,
  overallEvaluationOptions,
} from '../shared/evaluation-form-globals';
import { faEdit, faTrashAlt } from '@fortawesome/free-regular-svg-icons';
import { faClipboard, faAddressCard } from '@fortawesome/free-solid-svg-icons';
import { ToastrService } from 'ngx-toastr';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-student-details',
  templateUrl: './student-details.component.html',
  styleUrls: ['./student-details.component.css'],
})
export class StudentDetailsComponent implements OnInit {
  student$: Observable<Student>;
  evaluationList$: Observable<Evaluation[]>;
  studentId: number;
  public streamOptions: string[] = streamOptions;
  public communicationOptions: { id: number; name: string }[] = communicationOptions;
  public abilityToLearnOptions: { id: number; name: string }[] = abilityToLearnOptions;
  public directionOptions: { id: number; name: string }[] = directionOptions;
  public overallEvaluationOptions: { id: number; name: string }[] = overallEvaluationOptions;
  public faTrashAlt = faTrashAlt;
  public faAddressCard = faAddressCard;
  public faEdit = faEdit;
  public faClipboard = faClipboard;

  constructor(
    private route: ActivatedRoute,
    private studentService: StudentService,
    private evaluationService: EvaluationService,
    private auth: AuthService,
    private router: Router,
    private toastr: ToastrService,
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params: ParamMap) => {
      this.studentId = +params.get('studentId');
      forkJoin([
        this.studentService.getStudentById(+this.studentId),
        this.evaluationService.getAllStudentEvaluations(this.studentId),
      ]).subscribe(([student, evaluations]) => {
        this.student$ = of(student);
        this.evaluationList$ = of(evaluations);
      });
    });
  }

  evaluateStudent(studentId: number) {
    this.router.navigate(['/evaluate'], { queryParams: { student: studentId } });
  }

  isAdmin() {
    return this.auth.getSessionUserRole() === 'ADMIN';
  }

  deleteStudent(event) {
    this.studentService.deleteStudent(event).subscribe(() => {
      this.student$ = this.student$.pipe(filter((student: Student) => student.id !== event));
      this.router.navigate(['/students']);
      this.toastr.success('Student was deleted', 'Success', { positionClass: 'toast-bottom-center' });
    });
  }

  isEvaluationDeletable(evaluation: Evaluation) {
    return this.auth.getSessionUserRole() === 'ADMIN' || evaluation.userId.toString() === this.auth.getSessionUserId();
  }

  deleteEvaluation(evaluation: Evaluation) {
    this.evaluationService.deleteEvaluation(evaluation.id).subscribe(() => {
      this.evaluationList$ = this.evaluationService.getAllStudentEvaluations(this.studentId);
    });
  }

  exportCard(student: Student) {
    domtoimage.toBlob(document.getElementById('student-details')).then(function (blob) {
      FileSaver.saveAs(blob, `${student.name} ${student.lastname}.png`);
    });
  }

  getStudentImage(student: Student): SafeUrl {
    return this.studentService.getImage(student);
  }
}
