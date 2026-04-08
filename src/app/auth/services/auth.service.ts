import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
<<<<<<< HEAD
import { Observable, throwError } from 'rxjs';

=======
>>>>>>> 9d0bc879dbfa2144d6e38b7402ea0f2148b95ad2
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}
<<<<<<< HEAD

  private readonly logInApiUrl = 'https://dummyjson.com/auth/login';
  private readonly authMe = 'https://dummyjson.com/auth/me';
  private readonly refreshTokenApi = 'https://dummyjson.com/auth/refresh';

  onLogin(obj: { username: string; password: string }): Observable<any> {
    return this.http.post(this.logInApiUrl, obj);
  }

  getAndAuthorizeCurrentUser(): Observable<any> {
=======
  private LogInapiUrl = 'https://dummyjson.com/auth/login';
  private authMe = 'https://dummyjson.com/auth/me';
  private refreshTokenApi = 'https://dummyjson.com/auth/refresh';
  onLogin(obj: any) {
    return this.http.post(this.LogInapiUrl, obj);
  }
  getAndAuthorizeCurrentUser() {
>>>>>>> 9d0bc879dbfa2144d6e38b7402ea0f2148b95ad2
    const localToken = localStorage.getItem('token');
    return this.http.get(this.authMe, {
      headers: {
        Authorization: `Bearer ${localToken}`,
      },
    });
  }
<<<<<<< HEAD

  refreshToken(): Observable<any> {
    const refreshToken = localStorage.getItem('refreshToken');
    if (!refreshToken) {
      return throwError(() => new Error('Missing refresh token'));
    }

    return this.http.post(this.refreshTokenApi, {
      refreshToken,
=======
  refreshToken() {
    const refreshToken = localStorage.getItem('refreshToken');
    return this.http.post(this.refreshTokenApi, {
      refreshToken: refreshToken,
>>>>>>> 9d0bc879dbfa2144d6e38b7402ea0f2148b95ad2
      expiresInMins: 30,
    });
  }
}
