import { Injectable, Injector } from '@angular/core';
import { AuthService, AuthResult } from '../services/auth.service';
import { environment } from '../../environments/environment';
import { LoginDialogService } from '../Auth/login/login-dialog.service';
import { 
    HttpInterceptor, 
    HttpRequest, 
    HttpHandler, 
    HttpSentEvent, 
    HttpHeaderResponse, 
    HttpProgressEvent, 
    HttpResponse, 
    HttpUserEvent, 
    HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Router } from '@angular/router';

import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/finally';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/take';


@Injectable()
export class AuthTokenInterceptor implements HttpInterceptor {
        
    private authSvc: AuthService;
    private isRefreshingToken: boolean = false;
    constructor (
        private inj: Injector,
        private router: Router,
        private loginDialogSvc: LoginDialogService
    ) { }


    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpSentEvent | 
                                                        HttpHeaderResponse | 
                                                        HttpProgressEvent | 
                                                        HttpResponse<any> | 
                                                        HttpUserEvent<any>> {
        this.authSvc = this.inj.get(AuthService);

        const isSiteApi = req.url && req.url.startsWith(environment.site.api);
        const isAuthUrl = req.url && req.url == environment.endpoints.auth.login;

        if (this.authSvc.bearer && !req.headers.get('Authorization') && isSiteApi && !isAuthUrl) {
            const newAuthReq = req.clone({ headers: req.headers.set('Authorization', this.authSvc.bearer) });

            return next.handle(newAuthReq).catch(error => {
                if (error instanceof HttpErrorResponse) {
                    switch ((<HttpErrorResponse>error).status) {
                        case 401:
                            return this.handle401Error(req, next);
                        default:
                            return Observable.throw(error);
                    }
                } else {
                    return Observable.throw(error);
                }
            });
        }
        else {
            return next.handle(req);
        }
    }

    handle401Error(req: HttpRequest<any>, next: HttpHandler) {
        if (!this.isRefreshingToken) {
            this.isRefreshingToken = true;

            // Reset here so that the following requests wait until the token
            return this.authSvc.getAccessToken()
                .switchMap((result: AuthResult) => {
                    if (result == AuthResult.Success) {
                        const newAuthReq = req.clone({ headers: req.headers.set('Authorization', this.authSvc.bearer) });
                        return next.handle(newAuthReq);
                    }

                    // If we don't get a new token, we are in trouble so logout.
                    this.authSvc.logout();
                    // this.loginDialogSvc.showDialog('Log in to your account');
                })
                .catch((error) => {
                    // If there is an exception calling 'refreshToken', bad news so logout.
                    this.authSvc.logout();
                    // this.loginDialogSvc.showDialog('Log in to your account');
                    return Observable.throw(error);
                })
                .finally(() => {
                    this.isRefreshingToken = false;
                });
        } else {
            const newAuthReq = req.clone({ headers: req.headers.set('Authorization', this.authSvc.bearer) });
            return next.handle(newAuthReq);
        }
    }
}