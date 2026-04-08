import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}

  private readonly logInApiUrl = 'https://dummyjson.com/auth/login';
  private readonly authMe = 'https://dummyjson.com/auth/me';
  private readonly refreshTokenApi = 'https://dummyjson.com/auth/refresh';

  onLogin(obj: { username: string; password: string }): Observable<any> {
    return this.http.post(this.logInApiUrl, obj);
  }

  getAndAuthorizeCurrentUser(): Observable<any> {
    const localToken = localStorage.getItem('token');
    return this.http.get(this.authMe, {
      headers: {
        Authorization: `Bearer ${localToken}`,
      },
    });
  }

  refreshToken(): Observable<any> {
    const refreshToken = localStorage.getItem('refreshToken');
    if (!refreshToken) {
      return throwError(() => new Error('Missing refresh token'));
    }

    return this.http.post(this.refreshTokenApi, {
      refreshToken,
      expiresInMins: 30,
    });
  }
}
