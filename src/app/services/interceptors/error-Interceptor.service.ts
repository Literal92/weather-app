import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';

import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { catchError } from 'rxjs/operators';
import { LoaderService } from '../loader.service';

@Injectable()
export class HttpErrorInterceptor implements HttpInterceptor {
  constructor(
    private loaderService: LoaderService
  ) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      catchError((error) => {
        alert('An error happened during interaction with the server side');
        return throwError(new Error(error));
      }),
    );
  }

}
