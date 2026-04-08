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
<<<<<<< HEAD
import { Router } from '@angular/router';

@Injectable()
export class CoustomInterceptor implements HttpInterceptor {
  constructor(private authService: AuthService, private router: Router) {}
=======

@Injectable()
export class CoustomInterceptor implements HttpInterceptor {
  constructor(private authService: AuthService) {}
>>>>>>> 9d0bc879dbfa2144d6e38b7402ea0f2148b95ad2

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    const localToken = localStorage.getItem('token');
    if (localToken) {
<<<<<<< HEAD
=======
      // passing the local token to the request then in the request handler in line 30 we will catch the error if aythorized or not
>>>>>>> 9d0bc879dbfa2144d6e38b7402ea0f2148b95ad2
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${localToken}`,
        },
      });
    }
<<<<<<< HEAD

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
=======
    //handling the request
    return next.handle(request).pipe(
      //catching the error if the 401 (unauthorized then we need to refresh token)
      catchError((error: HttpErrorResponse) => {
        if (error.status === 401) {
          // using authService to acsess the refreshToken function
          return this.authService.refreshToken().pipe(
            switchMap((response: any) => {
              // Update the token in local storage. response.token is the new token the response of refreshing token
              localStorage.setItem('token', response.accessToken);
              localStorage.setItem('refreshToken', response.refreshToken);
              // Retry the failed request with the new token
              const newAuthReq = request.clone({
                setHeaders: {
                  Authorization: `Bearer ${response.token}`,
>>>>>>> 9d0bc879dbfa2144d6e38b7402ea0f2148b95ad2
                },
              });
              return next.handle(newAuthReq);
            }),
<<<<<<< HEAD
            catchError((refreshError) => {
              localStorage.removeItem('token');
              localStorage.removeItem('refreshToken');
              this.router.navigateByUrl('/login');
              return throwError(() => refreshError);
            })
          );
        }
        return throwError(() => error);
=======
            catchError((err) => {
              console.error('Refresh token failed', err);
              return throwError(err);
            })
          );
        }
        return throwError(error);
>>>>>>> 9d0bc879dbfa2144d6e38b7402ea0f2148b95ad2
      })
    );
  }
}
