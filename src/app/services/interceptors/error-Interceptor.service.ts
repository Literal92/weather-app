import { Router, ActivatedRouteSnapshot, ActivatedRoute } from '@angular/router';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';

import { Injectable } from '@angular/core';
import { catchError } from 'rxjs/operators';
import { LoaderService } from '../loader.service';
import * as Sentry from '@sentry/angular-ivy';

@Injectable()
export class HttpErrorInterceptor implements HttpInterceptor {
  constructor(
    private loaderService: LoaderService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      catchError((error) => {
        this.router.navigate(['/service/search']);
        this.loaderService.hide();
        // Capture and send the error to Sentry
        return throwError(Sentry.captureException(error));
      }),
    );
  }

}
