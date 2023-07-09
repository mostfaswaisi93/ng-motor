import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpErrorResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { tap, finalize } from 'rxjs/operators';
import { TranslateService } from '@ngx-translate/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Injectable()
export class HttpTokenInterceptor implements HttpInterceptor {

  requestsSentCount = 0;
  requestsFinishedCount = 0;

  constructor(
    private router: Router,
    private authService: AuthService,
    private translateService: TranslateService
  ) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    let request;
    const currentLang = this.translateService.currentLang || 'ar';

    const headersConfig = {
      'Accept': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('accessToken')}`,
      'Accept-Language': currentLang
    };

    request = req.clone({ setHeaders: headersConfig });
    return next.handle(request).pipe(tap((res) => { }, error => {
      if (error instanceof HttpErrorResponse) {
        try {
          if (error.error && +error.error.status === 403) {
            this.authService.reomveAuth();
            this.router.navigateByUrl('/auth/login');
          }
        } catch (e) { }
      }
      return of(error);
    }), finalize(() => { }));
  }

}
