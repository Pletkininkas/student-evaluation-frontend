import { TestBed } from '@angular/core/testing';

import { HttpResponseInterceptorService } from './http-response-interceptor.service';

describe('HttpResponseInterceptorService', () => {
  let service: HttpResponseInterceptorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HttpResponseInterceptorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
