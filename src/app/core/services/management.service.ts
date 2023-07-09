import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ManagementService {

  constructor(private http: HttpClient) { }

  createManagement(data) {
    return this.http.post(`${environment.apiUrl}management`, data);
  }

  editManagement(data): Observable<any> {
    return this.http.put(`${environment.apiUrl}management`, data);
  }

  getGeneralManagement(): any {
    return this.http.get(`${environment.apiUrl}management/getGeneralManagement`);
  }

  deleteManagement(_id): any {
    return this.http.delete(`${environment.apiUrl}management/${_id}`);
  }

}
