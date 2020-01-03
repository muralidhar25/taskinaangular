import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { LoginDialogService } from '../Auth/login/login-dialog.service';
import { AuthService } from '../services/auth.service';
import { LoaderService } from '../shared/services/loader.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private authSvc: AuthService,
    private router: Router,
    private loginDialogSvc: LoginDialogService,
    private loaderService: LoaderService
    ) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    if (this.authSvc.isLoggedIn) {
      return true;
    }
    else {
      this.loaderService.hide();
      this.router.navigate(['/']);
      this.loginDialogSvc.showDialog('Log in to your account');
      return false;
    }

  }
}
