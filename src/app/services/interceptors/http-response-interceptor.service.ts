import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpResponse,
} from '@angular/common/http';
import { SpinnerService } from '../spinner.service';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class HttpResponseInterceptorService implements HttpInterceptor {
  constructor(private spinnerService: SpinnerService, private router: Router) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      tap(
        (evt) => {
          if (evt instanceof HttpResponse || evt instanceof HttpErrorResponse) {
            if (!req.url.match('/search/student/')) {
              this.spinnerService.fetchingStatusChanged(false);
            }
          }
        },
        (error) => {
          if (!req.url.match('/search/student/')) {
            this.spinnerService.fetchingStatusChanged(false);
          }
          if (error instanceof HttpErrorResponse) {
            switch (error.status) {
              case 401:
                this.router.navigate(['/login']);
            }
          }
        },
      ),
    );
  }
}
