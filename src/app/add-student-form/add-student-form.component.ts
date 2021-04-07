import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { RxwebValidators } from '@rxweb/reactive-form-validators';
import { ToastrService } from 'ngx-toastr';
import { map } from 'rxjs/operators';
import { Student } from '../model/student';
import { StudentService } from '../services/student-service/student.service';

@Component({
  selector: 'app-add-student-form',
  templateUrl: './add-student-form.component.html',
  styleUrls: ['./add-student-form.component.css'],
})
export class AddStudentFormComponent implements OnInit {
  @ViewChild('inputFile')
  myInputVariable: ElementRef;
  imageSrc: SafeUrl = '/assets/imgnotfound.png';
  editMode = false;
  studentId: number;

  public studentForm: FormGroup;
  constructor(
    private formBuilder: FormBuilder,
    private toastr: ToastrService,
    private studentService: StudentService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private sanitizer: DomSanitizer,
  ) {}

  ngOnInit() {
    this.studentForm = this.formBuilder.group({
      name: [
        '',
        {
          validators: [Validators.maxLength(256), Validators.pattern(/^[\p{L} ]*$/u), Validators.required],
        },
      ],
      lastname: [
        '',
        {
          validators: [Validators.maxLength(256), Validators.pattern(/^[\p{L}\- ]*$/u), Validators.required],
        },
      ],
      university: [''],
      comment: ['', [Validators.maxLength(250)]],
      file: [
        '',
        [
          RxwebValidators.extension({ extensions: ['png', 'jpg', 'jpeg'] }),
          RxwebValidators.fileSize({ maxSize: 500000 }),
        ],
      ],
      fileSource: [null],
    });
    this.activatedRoute.paramMap.pipe(map((paramMap) => paramMap.get('studentId'))).subscribe((value) => {
      this.studentId = +value;
      this.loadStudent();
    });
  }
  loadStudent() {
    if (this.studentId) {
      this.editMode = true;
      this.studentService.getStudentById(this.studentId).subscribe((student) => {
        this.studentForm.get('name').setValue(student.name);
        this.studentForm.get('lastname').setValue(student.lastname);
        this.studentForm.get('university').setValue(student.university);
        this.studentForm.get('comment').setValue(student.comment);
        this.imageSrc = this.getImage(student);
      });
    }
  }

  submitForm() {
    if (this.studentForm.valid) {
      const formData = new FormData();
      formData.append('student', new Blob([JSON.stringify(this.studentForm.value)], { type: 'application/json' }));
      formData.append('image', this.studentForm.get('fileSource').value);
      this.studentService.addStudent(formData).subscribe(
        () => {
          this.toastr.success('Student was added', 'Success', { positionClass: 'toast-bottom-center' });
          this.studentForm.reset();
          this.myInputVariable.nativeElement.value = '';
          this.imageSrc = '/assets/imgnotfound.png';
        },
        () => this.toastr.error('Student was not added', 'Error', { positionClass: 'toast-bottom-center' }),
      );
    } else {
      this.toastr.error('Student was not added. Check your inputs', 'Error', { positionClass: 'toast-bottom-center' });
    }
  }

  updateStudent() {
    if (this.studentForm.valid) {
      const formData = new FormData();
      formData.append('student', new Blob([JSON.stringify(this.studentForm.value)], { type: 'application/json' }));
      if (this.studentForm.get('fileSource').value != null)
        formData.append('image', this.studentForm.get('fileSource').value);
      this.studentService.updateStudent(formData, this.studentId).subscribe(
        () => {
          this.toastr.success('Student was updated', 'Success', { positionClass: 'toast-bottom-center' });
          this.router.navigate(['/main']);
        },
        () => this.toastr.error('Student was not updated', 'Error', { positionClass: 'toast-bottom-center' }),
      );
    } else {
      this.toastr.error('Student was not updated. Check your inputs', 'Error', {
        positionClass: 'toast-bottom-center',
      });
    }
  }

  onFileChange(event) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.studentForm.patchValue({
        fileSource: file,
      });
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.imageSrc = e.target.result;
      };
      reader.readAsDataURL(event.target.files[0]);
    }
  }

  clearPhoto() {
    this.imageSrc = '/assets/imgnotfound.png';
    this.myInputVariable.nativeElement.value = '';
    this.studentForm.get('file').setValue('');
  }

  get name() {
    return this.studentForm.get('name');
  }
  get lastname() {
    return this.studentForm.get('lastname');
  }
  get university() {
    return this.studentForm.get('university');
  }
  get comment() {
    return this.studentForm.get('comment');
  }
  get file() {
    return this.studentForm.get('file');
  }

  getImage(student: Student) {
    if (student.image) {
      const objectURL = 'data:image/png;base64,' + student.image.imgByte;
      return this.sanitizer.bypassSecurityTrustUrl(objectURL);
    } else {
      return '/assets/imgnotfound.png';
    }
  }
  deleteStudent() {
    this.studentService.deleteStudent(this.studentId).subscribe(() => {
      this.router.navigate(['/main']);
      this.toastr.success('Student was deleted', 'Success', { positionClass: 'toast-bottom-center' });
    });
  }
}
