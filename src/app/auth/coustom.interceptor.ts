import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse,
} from '@angular/common/http';
import { catchError, Observable, switchMap, throwError } from 'rxjs';
import { AuthService } from './services/auth.service';
import { Router } from '@angular/router';

@Injectable()
export class CoustomInterceptor implements HttpInterceptor {
  constructor(private authService: AuthService, private router: Router) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    const localToken = localStorage.getItem('token');
    if (localToken) {
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${localToken}`,
        },
      });
    }

    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {
        const isRefreshRequest = request.url.includes('/auth/refresh');
        if (error.status === 401 && !isRefreshRequest) {
          return this.authService.refreshToken().pipe(
            switchMap((response: any) => {
              localStorage.setItem('token', response.accessToken);
              localStorage.setItem('refreshToken', response.refreshToken);
              const newAuthReq = request.clone({
                setHeaders: {
                  Authorization: `Bearer ${response.accessToken}`,
                },
              });
              return next.handle(newAuthReq);
            }),
            catchError((refreshError) => {
              localStorage.removeItem('token');
              localStorage.removeItem('refreshToken');
              this.router.navigateByUrl('/login');
              return throwError(() => refreshError);
            })
          );
        }
        return throwError(() => error);
      })
    );
  }
}
