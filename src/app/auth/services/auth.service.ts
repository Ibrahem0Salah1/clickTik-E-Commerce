import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}
  private LogInapiUrl = 'https://dummyjson.com/auth/login';
  private authMe = 'https://dummyjson.com/auth/me';
  private refreshTokenApi = 'https://dummyjson.com/auth/refresh';
  onLogin(obj: any) {
    return this.http.post(this.LogInapiUrl, obj);
  }
  getAndAuthorizeCurrentUser() {
    const localToken = localStorage.getItem('token');
    return this.http.get(this.authMe, {
      headers: {
        Authorization: `Bearer ${localToken}`,
      },
    });
  }
  refreshToken() {
    const refreshToken = localStorage.getItem('refreshToken');
    return this.http.post(this.refreshTokenApi, {
      refreshToken: refreshToken,
      expiresInMins: 30,
    });
  }
}
