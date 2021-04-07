import { URL } from './../../config';
import { Student } from './../../model/student';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SearchService {
  constructor(private httpClient: HttpClient) {}

  searchStudent(value: string): Observable<Student[]> {
    return this.httpClient.get<Student[]>(`${URL}/search/student/${value}`);
  }
}
