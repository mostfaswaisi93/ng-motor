import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(private router: Router, private authService: AuthService) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<boolean> {
        return new Promise((reslove, reject) => {
            this.authService.isAuthenticated.subscribe((isLoggedIn) => {
                if (isLoggedIn) {
                    reslove(true);
                } else {
                    this.router.navigateByUrl('/auth/login');
                    reslove(false);
                }
            }, (error) => {
                this.router.navigateByUrl('/auth/login');
                reslove(false);
            });
        });
    }

}
