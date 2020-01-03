import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable()
export class NoAuthGuard implements CanActivate {
    constructor(
        private authSvc: AuthService,
        private router: Router
    ) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        // logic that determines true or false
        if (!this.authSvc.isLoggedIn) {
            return true;
        } else {
            this.router.navigate(['/dashboard']);
            return false;
        }
    }
}