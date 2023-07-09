import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable()
export class ModuleGuard implements CanActivate {
    constructor(private router: Router, private authService: AuthService) { }
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<any> {
        return new Promise((resolve, reject) => {
            this.authService.isAuthenticated.subscribe((isLoggedIn) => {
                if (isLoggedIn) {
                    resolve(true);
                } else {
                    this.router.navigateByUrl('/auth/login');
                    resolve(false);
                }
            }, (error) => {
                this.router.navigateByUrl('/auth/login');
                resolve(false);
            });
        });
    }

}
