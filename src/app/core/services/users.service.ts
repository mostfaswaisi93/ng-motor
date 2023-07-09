import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { User } from '../models/User';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(private http: HttpClient) { }

  getUser(userId): any {
    return this.http.get(`${environment.apiUrl}user/profile/${userId}`);
  }

  updateUser(user): Observable<User> {
    return this.http.put<User>(`${environment.apiUrl}user/profile`, user);
  }

  deleteUser(userId): any {
    return this.http.delete(`${environment.apiUrl}user/profile/${userId}`);
  }

}
