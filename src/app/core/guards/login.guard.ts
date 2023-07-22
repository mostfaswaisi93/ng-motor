import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { ADMIN_HOME_PAGE, USER_HOME_PAGE } from '../enum/constant';
import { AuthService } from '../services/auth.service';

@Injectable()
export class LoginGuard implements CanActivate {
    constructor(private router: Router, private authService: AuthService) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<boolean> {

        return new Promise((reslove, reject) => {
            if (this.authService.isLoggedIn === undefined) {
                this.authService.isAuthenticated.subscribe((isLoggedIn) => {
                    if (!isLoggedIn) {
                        reslove(true);
                    } else {
                        // this.router.navigateByUrl(ADMIN_HOME_PAGE);
                        this.router.navigateByUrl(USER_HOME_PAGE);
                    }
                })
            } else {
                if (!this.authService.isLoggedIn) {
                    reslove(true);
                } else {
                    // this.router.navigateByUrl(ADMIN_HOME_PAGE);
                    this.router.navigateByUrl(USER_HOME_PAGE);
                }
            }
        });
    }

}
