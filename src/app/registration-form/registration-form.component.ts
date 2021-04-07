import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Location } from '@angular/common';
import { User } from 'src/app/model/user';
import { RegisterService } from '../services/register-service/register.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-registration-form',
  templateUrl: './registration-form.component.html',
  styleUrls: ['./registration-form.component.css'],
})
export class RegistrationFormComponent implements OnInit {
  public registrationForm: FormGroup;
  public streamOptions: string[] = ['Frontend', 'Backend', 'Testing', 'Project'];

  constructor(
    private fb: FormBuilder,
    private location: Location,
    private toastr: ToastrService,
    private registerService: RegisterService,
  ) {}

  ngOnInit(): void {
    this.registrationForm = this.fb.group({
      username: [
        '',
        {
          validators: [Validators.required, Validators.minLength(5), Validators.maxLength(40)],
          updateOn: 'blur',
        },
      ],
      email: [
        '',
        {
          validators: [Validators.required, Validators.pattern('^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\\.[A-Za-z]{2,4}$')],
          updateOn: 'blur',
        },
      ],
      stream: [
        '',
        {
          validators: [Validators.required, Validators.pattern('^(Frontend|Backend|Testing|Project)')],
          updateOn: 'blur',
        },
      ],
      password: ['', [Validators.required, Validators.pattern('^(?=.*[A-Za-z])(?=.*\\d)[A-Za-z\\d]{8,}$')]],
    });
  }

  get username() {
    return this.registrationForm.get('username');
  }

  get email() {
    return this.registrationForm.get('email');
  }

  get stream() {
    return this.registrationForm.get('stream');
  }

  get password() {
    return this.registrationForm.get('password');
  }
  submitForm() {
    const regexEmail = new RegExp('^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\\.[A-Za-z]{2,4}$');
    const regexStream = new RegExp('^(Frontend|Backend|Testing|Project)');
    const regexPassword = new RegExp('^(?=.*[A-Za-z])(?=.*\\d)[A-Za-z\\d]{8,}$');
    if (this.username.value.trim().length < 5 || this.username.value.trim().length > 40) {
      this.toastr.error(
        'Username should be atleast 5 characters long (without spaces) and should not be longer than 40 characters!',
        'Error',
        { positionClass: 'toast-bottom-center' },
      );
    } else if (!regexEmail.test(this.email.value)) {
      this.toastr.error('Please enter valid e-mail address!', 'Error', { positionClass: 'toast-bottom-center' });
    } else if (!regexStream.test(this.stream.value)) {
      this.toastr.error('Please select stream!', 'Error', { positionClass: 'toast-bottom-center' });
    } else if (!regexPassword.test(this.password.value) || this.password.value.length > 50) {
      this.toastr.error(
        'Password should be at least 8 characters long and contain at least one digit and should not be longer than 50 characters!',
        'Error',
        { positionClass: 'toast-bottom-center' },
      );
    } else {
      const user: User = {
        username: this.username.value,
        password: this.password.value,
        stream: this.stream.value,
        email: this.email.value,
      };
      this.registerService.registerUser(user).subscribe((response) => {
        if (response === true) {
          this.toastr.success('Successfully registered!', 'Success', { positionClass: 'toast-bottom-center' });
          this.goBack();
        } else {
          this.toastr.error(response, 'Error', { positionClass: 'toast-bottom-center' });
        }
      });
    }
  }

  goBack() {
    this.location.back();
  }
}
