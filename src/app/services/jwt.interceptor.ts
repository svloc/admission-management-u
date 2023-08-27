import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse,
} from '@angular/common/http';
import { catchError } from 'rxjs/operators';

import { Observable, throwError } from 'rxjs';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { AuthService } from './auth.service';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
  public flag: boolean = false;
  constructor(private authService: AuthService, private router: Router) {}
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const tokens = localStorage.getItem('accessToken');
    // const tokens = this.authService.accessToken$;
    const isApiUrl = request.url.startsWith(environment.apiUrl);
    
    if (isApiUrl) {
      if (request.url.includes('/admission/makePayment')) {
        request = request.clone({
          setHeaders: {
            Authorization: 'Bearer ' + tokens,
            'X-Frontend-Base-Url': window.location.origin,
          },
        });
      } else {
        request = request.clone({
          setHeaders: {
            Authorization: 'Bearer ' + tokens,
          },
        });
      }
    }
    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {
        console.log('error from JwtInterceptor', error);
        return throwError(error);
      })
    );
  }
}
