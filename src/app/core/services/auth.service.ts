import { Injectable } from '@angular/core';
import { ReplaySubject, Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { User } from '../models/User';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  isLoggedIn = undefined;
  private userObject: User = null;
  private isAuthenticatedSubject = new ReplaySubject<boolean>(1);
  public isAuthenticated = this.isAuthenticatedSubject.asObservable();

  private isUserInfoChangedSubject = new Subject<User>();
  public isUserInfoChanged = this.isUserInfoChangedSubject.asObservable();
  constructor(private http: HttpClient, private router: Router) { }

  login(data) {
    return this.http.post(`${environment.apiUrl}auth/login`, data);
  }

  setAuth(user: User, accessToken, userId) {
    this.isLoggedIn = true;
    localStorage.setItem('accessToken', accessToken);
    localStorage.setItem('userId', userId);
    this.updateUserInfo = user;
    this.isAuthenticatedSubject.next(this.isLoggedIn);
  }

  checkLogin() {
    let userId = localStorage.getItem('userId');
    if (localStorage.getItem('accessToken')) {
      this.http.get(`${environment.apiUrl}user/profile/${userId}`, {}).subscribe((user: User) => {
        if (user) {
          this.setAuth(user, localStorage.getItem('accessToken'), localStorage.getItem('userId'));
        }
      }, error => {
        this.reomveAuth();
      })
    } else {
      this.isLoggedIn = false;
      this.isAuthenticatedSubject.next(this.isLoggedIn);
    }
  }

  register(user: User) {
    return this.http.post(`${environment.apiUrl}auth/register`, { ...user });
  }

  changePassword(data) {
    return this.http.post(`${environment.apiUrl}auth/changePassword`, data);
  }

  set updateUserInfo(user: User) {
    this.userObject = user;
    this.isUserInfoChangedSubject.next(user);
  }

  get user() {
    return this.userObject;
  }

  reomveAuth() {
    this.isLoggedIn = false;
    localStorage.removeItem('accessToken');
    localStorage.removeItem('userId');
    this.isAuthenticatedSubject.next(this.isLoggedIn);
  }

}
