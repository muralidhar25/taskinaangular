import { Injectable, Injector } from '@angular/core';
import { AuthService, AuthResult } from '../services/auth.service';
import { environment } from '../../environments/environment';
import { HttpInterceptor,
         HttpRequest,
         HttpHandler, 
         HttpSentEvent, 
         HttpHeaderResponse, 
         HttpProgressEvent, 
         HttpResponse, 
         HttpUserEvent, 
         HttpErrorResponse } from "@angular/common/http";
import { Observable } from "rxjs/Observable";
import { BehaviorSubject } from "rxjs/BehaviorSubject";
import { Router } from '@angular/router';
import { LoginDialogService } from '../Auth/login/login-dialog.service';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/finally';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/take';

@Injectable()
export class Auth401Interceptor implements HttpInterceptor {
    authService: AuthService;
    private isRefreshingToken: boolean = false;

    constructor(
        private inj: Injector,
        private router: Router,
        private loginDialogSvc: LoginDialogService
    ) { }
    intercept(req: HttpRequest<any>,
         next: HttpHandler): Observable<HttpSentEvent | HttpHeaderResponse | HttpProgressEvent | HttpResponse<any> | HttpUserEvent<any>> {
        return next.handle(req).do(event => { }, err => {
            if (err instanceof HttpErrorResponse && err.status == 401) {
                console.log('401')
                this.authService = this.inj.get(AuthService);
                if (!this.isRefreshingToken) {
                    this.isRefreshingToken = true;
                    // Reset here so that the following requests wait until the token
                    return this.authService.getAccessToken()
                        .switchMap((result: AuthResult) => {
                            if (result == AuthResult.Success) {
                                const newAuthReq = req.clone({ headers: req.headers.set('Authorization', this.authService.bearer) });
                                return next.handle(newAuthReq);
                            }

                            // If we don't get a new token, we are in trouble so logout.
                            this.authService.logout();
                            // this.loginDialogSvc.showDialog('Log in to your account');
                        })
                        .catch((error) => {
                            // If there is an exception calling 'refreshToken', bad news so logout.
                            this.authService.logout();
                            // this.loginDialogSvc.showDialog('Log in to your account');
                            return Observable.throw(error);
                        })
                        .finally(() => {
                            this.isRefreshingToken = false;
                        });
                } else {
                    const newAuthReq = req.clone({ headers: req.headers.set('Authorization', this.authService.bearer) });
                    return next.handle(newAuthReq);
                }
            }
        });
    }
}