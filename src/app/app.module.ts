import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { AddStudentFormComponent } from './add-student-form/add-student-form.component';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { RegistrationFormComponent } from './registration-form/registration-form.component';
import { LoginFormComponent } from './login-form/login-form.component';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RxReactiveFormsModule } from '@rxweb/reactive-form-validators';
import { StudentListComponent } from './student-list/student-list.component';
import { NavbarComponent } from './navbar/navbar.component';
import { HttpRequestInterceptorService } from './services/interceptors/http-request-interceptor.service';
import { MainLayoutComponent } from './main-layout/main-layout.component';
import { EvaluateStudentComponent } from './evaluate-student/evaluate-student.component';
import { StudentDetailsComponent } from './student-details/student-details.component';
import { UserEvaluationsComponent } from './user-evaluations/user-evaluations.component';
import { SearchComponent } from './search/search.component';
import { SpinnerComponent } from './spinner/spinner.component';
import { HttpResponseInterceptorService } from './services/interceptors/http-response-interceptor.service';
import { SortDirective } from './directive/sort.directive';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { DeletionModalComponent } from './deletion-modal/deletion-modal.component';

@NgModule({
  declarations: [
    AppComponent,
    AddStudentFormComponent,
    LoginFormComponent,
    RegistrationFormComponent,
    StudentListComponent,
    NavbarComponent,
    MainLayoutComponent,
    EvaluateStudentComponent,
    StudentDetailsComponent,
    UserEvaluationsComponent,
    SearchComponent,
    SpinnerComponent,
    SortDirective,
    DeletionModalComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot({
      tapToDismiss: false,
    }),
    FormsModule,
    ReactiveFormsModule,
    RxReactiveFormsModule,
    FontAwesomeModule,
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: HttpRequestInterceptorService, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: HttpResponseInterceptorService, multi: true },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
