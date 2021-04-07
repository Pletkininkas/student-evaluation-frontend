import { Component, OnInit } from '@angular/core';
import { StudentService } from '../services/student-service/student.service';
import { Student } from '../model/student';
import { SafeUrl } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth-service.service';
import { ToastrService } from 'ngx-toastr';
import { faEdit, faTrashAlt } from '@fortawesome/free-regular-svg-icons';
import { faClipboardList, faAddressCard, faSortDown, faSortUp, faSort } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-student-list',
  templateUrl: './student-list.component.html',
  styleUrls: ['./student-list.component.css'],
})
export class StudentListComponent implements OnInit {
  public selectedStudentId: number;
  public studentsList: Student[];
  public faTrashAlt = faTrashAlt;
  public faClipboard = faClipboardList;
  public faEdit = faEdit;
  public faSortDown = faSortDown;
  public faSortUp = faSortUp;
  public faSort = faSort;
  public feActive = false;
  public feValue: number;
  private fullStudentsList: Student[];
  public evaluationTableHeaderNames: string[] = [
    'Picture',
    'Student',
    'Backend',
    'Frontend',
    'Testing',
    'Project',
    'Action',
  ];
  public faAddressCard = faAddressCard;
  public sortKey = '';
  public evaluationHeaders: { evaluationKey: string; name: string; key: string }[] = [
    {
      evaluationKey: 'averageEvaluationDetails.streamOverall.fe',
      name: 'Frontend',
      key: 'fe',
    },
    {
      evaluationKey: 'averageEvaluationDetails.streamOverall.be',
      name: 'Backend',
      key: 'be',
    },
    {
      evaluationKey: 'averageEvaluationDetails.streamOverall.qa',
      name: 'Testing',
      key: 'qa',
    },
    {
      evaluationKey: 'averageEvaluationDetails.streamOverall.project',
      name: 'Project',
      key: 'project',
    },
  ];

  constructor(
    private studentService: StudentService,
    private router: Router,
    private auth: AuthService,
    private toastr: ToastrService,
  ) {}

  ngOnInit(): void {
    this.studentService.getAllStudents().subscribe((value) => {
      this.studentsList = value;
      this.fullStudentsList = value;
    });
  }

  getImageTitle(student: Student) {
    if (student.image) {
      return student.image.name;
    } else {
      return 'noImage.jpg';
    }
  }

  getStudentImage(student: Student): SafeUrl {
    return this.studentService.getImage(student);
  }

  filterStudents(searchValue: string) {
    this.studentsList = this.fullStudentsList.filter((student) => {
      return student.name
        .toLowerCase()
        .concat(' ' + student.lastname.toLowerCase())
        .includes(searchValue.toLowerCase());
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
      this.studentsList = this.studentsList.filter((student: Student) => student.id !== event);
      this.toastr.success('Student was deleted', 'Success', { positionClass: 'toast-bottom-center' });
    });
  }

  handleSortKey(key: string) {
    this.sortKey = key;
  }

  selectStudent(studentId) {
    this.selectedStudentId = studentId;
  }
}
