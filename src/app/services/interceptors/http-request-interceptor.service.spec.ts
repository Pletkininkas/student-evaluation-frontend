import { TestBed } from '@angular/core/testing';

import { HttpRequestInterceptorService } from './http-request-interceptor.service';

describe('UserApiInterceptorService', () => {
  let service: HttpRequestInterceptorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HttpRequestInterceptorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
