import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class GeneralService {

  constructor(private http: HttpClient) { }

  generalHeader(data): Observable<any> {
    return this.http.put(`${environment.apiUrl}general/header`, data);
  }

  generalWhoWeAre(data): Observable<any> {
    return this.http.put(`${environment.apiUrl}general/whoWeAre`, data);
  }

  generalSocialMedia(data): Observable<any> {
    return this.http.put(`${environment.apiUrl}general/socialMedia`, data);
  }

  generalWhatDoWeApply(data): Observable<any> {
    return this.http.put(`${environment.apiUrl}general/whatDoWeApply`, data);
  }

  generalContactUs(data): Observable<any> {
    return this.http.put(`${environment.apiUrl}general/contactUs`, data);
  }

  getGeneralHeader(): Observable<any> {
    return this.http.get(`${environment.apiUrl}general/header`);
  }

  getGeneralWhoWeAre(): Observable<any> {
    return this.http.get(`${environment.apiUrl}general/whoWeAre`);
  }

  getGeneralSocialMedia(): Observable<any> {
    return this.http.get(`${environment.apiUrl}general/socialMedia`);
  }

  getGeneralWhatDoWeApply(): Observable<any> {
    return this.http.get(`${environment.apiUrl}general/whatDoWeApply`);
  }

  getGeneralContactUs(): Observable<any> {
    return this.http.get(`${environment.apiUrl}general/contactUs`);
  }

}
