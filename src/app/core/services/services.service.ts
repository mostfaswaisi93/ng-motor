import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ServicesService {

  constructor(private http: HttpClient) { }

  getServices(): any {
    return this.http.get(`${environment.apiUrl}service`);
  }

  getServiceId(_id): any {
    return this.http.get(`${environment.apiUrl}service/${_id}`);
  }

  createService(data) {
    return this.http.post(`${environment.apiUrl}service`, data);
  }

  editService(data): Observable<any> {
    return this.http.put(`${environment.apiUrl}service`, data);
  }

  deleteService(_id): any {
    return this.http.delete(`${environment.apiUrl}service/${_id}`);
  }

  // questions
  createQuestion(data) {
    return this.http.post(`${environment.apiUrl}service/question`, data);
  }

  editQuestion(data): Observable<any> {
    return this.http.put(`${environment.apiUrl}service/question`, data);
  }

  deleteQuestion(serviceId, questionId): any {
    return this.http.delete(`${environment.apiUrl}service/question/${serviceId}/${questionId}`);
  }

  getServiceQuestions(serviceId): any {
    return this.http.get(`${environment.apiUrl}service/getServiceQuestions/${serviceId}`);
  }

}