import {
  HttpClient,
  HttpHeaders,
  HttpParams,
  HttpRequest
} from "@angular/common/http";
import { Injectable } from "@angular/core";
import "rxjs/add/observable/of";
import { Observable } from "rxjs/Observable";
import { map } from "rxjs/operators";
import { environment } from "../../environments/environment";
import { Router } from "@angular/router";
import { User } from '../Auth/signup/model';
import { FacebookLoginProvider } from '../Auth/social/providers/facebook-login-provider';
import { GoogleLoginProvider } from '../Auth/social/providers/google-login-provider';

export enum AuthResult {
  Success = 0,
  InvalidCredentials = 1,
  ServerOffline = 2,
  InternalServerIssue = 3,
  UnprocessableEntity = 4,
  InvalidEmal = 5,
  EmailAlreadyTaken = 6,
  PasswordTooShort = 7,
  UserDoesNotExist = 8,
  UserAccessForbidden = 9,
  GoogleError = 10,
  facebookError = 11,
  BadRequest = 12
}

interface ILoginResponse {
  email: string;
  exp: string;
  first_name: string;
  last_name: string;
  profile_pic: string;
  profile_pic_alt: string;
  profile_pic_present: boolean;
  token: string;
  slug: string;
}

interface ISignupResponse {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  password_digest: string;
  created_at: string;
  updated_at: string;
  reset_password_token: string;
  reset_password_sent_at: string;
  unconfirmed_email: string;
  confirmation_token: string;
  confirmed_at: string;
  confirmation_sent_at: string;
  suburb: string;
  get_things_done: string;
  earn_money: string;
  about_you: string;
  deactivated: boolean;
}

@Injectable()
export class AuthService {
  currentToken: string;
  authTokenStale: string = "stale_auth_token";
  authTokenNew: string = "new_auth_token";
  cachedRequests: Array<HttpRequest<any>> = [];

  constructor(private http: HttpClient, private route: Router) { }

  get userName() {
    return localStorage.getItem(environment.storage.auth.userName);
  }
  get isLoggedIn() {
    return this.accessToken !== null;
  }
  get isLoggedInWithTaskina() {
    return localStorage.getItem(environment.storage.auth.loginWithTaskina);
  }

  set isOnTaskinaSite(v: string) {
    localStorage.setItem(environment.storage.auth.isOnTaskinaSite, v);
  }

  get isOnTaskinaSite() {
    return localStorage.getItem(environment.storage.auth.isOnTaskinaSite);
  }
  set thumbnailImageName(v: string) {
    localStorage.setItem(environment.storage.auth.thumbnailImageName, v);
  }
  get thumbnailImageName() {
    return localStorage.getItem(environment.storage.auth.thumbnailImageName);
  }

  set profile_pic_alt(v: string) {
    localStorage.setItem(environment.storage.auth.profile_pic_alt, v);
  }
  get profile_pic_alt() {
    return localStorage.getItem(environment.storage.auth.profile_pic_alt);
  }

  set userSlug(v: string) {
    localStorage.setItem(environment.storage.auth.userSlug, v);
  }
  get userSlug() {
    return localStorage.getItem(environment.storage.auth.userSlug);
  }

  get bearer() {
    if (!this.isLoggedIn) {
      return null;
    }

    return `Bearer ${this.accessToken}`;
  }

  private get accessToken() {
    return localStorage.getItem(environment.storage.auth.accessToken);
  }

  private get refreshToken() {
    return localStorage.getItem(environment.storage.auth.refreshtoken);
  }

  collectFailedRequest(request): void {
    this.cachedRequests.push(request);
  }

  retryFailedRequests(): void {
    // retry the requests. this method can
    // be called after the token is refreshed
  }

  login(username: string, password: string): Observable<AuthResult> {
    const params = new HttpParams()
      .set("email", username)
      .set("password", password)
      .set("grant_type", "password");

    const headers = new HttpHeaders().set(
      "Content-Type",
      "application/x-www-form-urlencoded"
    );

    return this.http
      .post<ILoginResponse>(environment.endpoints.auth.login, params, {
        headers
      })
      .pipe(map(r => this.onLogin(r)))
      .catch(e => {
        return this.onLoginError(e);
      });
  }
  socialAuth(object: any, provider: string): Observable<AuthResult> {

    const params = new HttpParams()
      .set("uid", object.id)
      .set("first_name", object.firstName)
      .set("last_name", object.lastName)
      .set("auth_token", object.authToken)
      .set("photo_url", object.photoUrl)
      .set("email", object.email);

    const headers = new HttpHeaders().set(
      "Content-Type",
      "application/x-www-form-urlencoded"
    );

    let endpoint = '';
    if(provider === FacebookLoginProvider.PROVIDER_ID){
      endpoint = environment.endpoints.auth.facebookAuth;
    }else if(provider === GoogleLoginProvider.PROVIDER_ID){
      endpoint = environment.endpoints.auth.googleAuth;
    }


    return this.http
      .post<ILoginResponse>(endpoint, params, {
        headers
      })
      .pipe(map(r => this.onLogin(r)))
      .catch(e => {
        return this.onLoginError(e);
      });
  }
  signup(username: string, password: string): Observable<AuthResult> {
    const params = new HttpParams()
      .set("email", username)
      .set("password", password)
      .set("grant_type", "password");

    const headers = new HttpHeaders()
      .set("Content-Type", "application/x-www-form-urlencoded");

    return this.http
      .post<ISignupResponse>(environment.endpoints.auth.signup, params, { headers })
      .pipe(map(r => this.onSignup(r, password)))
      .catch((e) => {
        return this.onSignUpError(e)
      }
      );
  }

  addUserInfoAfterSignup(data: any) {

  }

  getAccessToken() {
    const params = new HttpParams()
      .set("refresh_token", this.refreshToken)
      .set("grant_type", "refresh_token");

    const headers = new HttpHeaders().set(
      "Content-Type",
      "application/x-www-form-urlencoded"
    );

    return this.http
      .post<ILoginResponse>(environment.endpoints.auth.login, params, {
        headers
      })
      .pipe(map(r => this.onRefreshTokenSuccess(r)))
      .catch((error: any) => {
        console.log("error");
        return Observable.throw(error.statusText);
      });
  }

  private onLogin(response: ILoginResponse): AuthResult {
    if (response.token) {
      localStorage.setItem(
        environment.storage.auth.accessToken,
        response.token
      );
      localStorage.setItem(environment.storage.auth.profileId, response.email);
      localStorage.setItem(
        environment.storage.auth.thumbnailImageName,
        response.profile_pic
      );
      localStorage.setItem(
        environment.storage.auth.profile_pic_alt,
        response.profile_pic_alt
      );
      localStorage.setItem(
        environment.storage.auth.fullName,
        `${response.first_name} ${response.last_name}`
      );
      localStorage.setItem(
        environment.storage.auth.firstName,
        `${response.first_name}`
      );
      localStorage.setItem(
        environment.storage.auth.lastName,
        `${response.last_name}`
      );

      localStorage.setItem(
        environment.storage.auth.userSlug,
        `${response.slug}`
      );

      if (this.isLoggedInWithTaskina == "initiate") {
        localStorage.setItem(
          environment.storage.auth.loginWithTaskina,
          "complete"
        );
      }
      return AuthResult.Success;
    } else {
      return AuthResult.InvalidCredentials;
    }
  }

  private onSignup(response: ISignupResponse, password: any): AuthResult {
    if (response.email && password) {
      this.login(response.email, password).subscribe(r => {

      });

      return AuthResult.Success;
    } else {
      return AuthResult.InvalidCredentials;
    }
  }

  logout() {
    this.http
      .post<any>(environment.endpoints.auth.logout, {}, {})
      .pipe(map(r => r))
      .first()
      .subscribe(res => {
        localStorage.clear();
        this.route.navigate(["/"]);
      });
  }

  forgotPassword(email: string) {
    const params = new HttpParams()
      .set("email", email)

    const headers = new HttpHeaders().set(
      "Content-Type",
      "application/x-www-form-urlencoded"
    );
    return this.http
      .post(environment.endpoints.auth.forgotPassword, params, {headers})
      .pipe(map(r => {
        return ['Email sent!'];
      }))
      .catch(e => {
        return Observable.of(e.error.errors);
      });
  }

  resetPassword(model: any) { }
  private onRefreshTokenSuccess(response: ILoginResponse): AuthResult {
    if (response.token) {
      localStorage.setItem(
        environment.storage.auth.accessToken,
        response.token
      );
      localStorage.setItem(environment.storage.auth.profileId, response.email);
      localStorage.setItem(
        environment.storage.auth.thumbnailImageName,
        response.profile_pic
      );
      localStorage.setItem(
        environment.storage.auth.profile_pic_alt,
        response.profile_pic_alt
      );
      localStorage.setItem(
        environment.storage.auth.fullName,
        `${response.first_name}' '${response.last_name}`
      );
      localStorage.setItem(
        environment.storage.auth.firstName,
        `${response.first_name}`
      );
      localStorage.setItem(
        environment.storage.auth.lastName,
        `${response.last_name}`
      );

      localStorage.setItem(
        environment.storage.auth.userSlug,
        `${response.slug}`
      );
      return AuthResult.Success;
    } else {
      return AuthResult.ServerOffline;
    }
  }

  public onSignUpError(error): Observable<any> {

    if (error.status === 400) {
      let errors: Array<string> = error.error.errors;
      if (errors.includes("Email is invalid")) {
        return Observable.of(AuthResult.InvalidEmal);
      } else if (
        errors.includes("Password is too short (minimum is 6 characters)")
      ) {
        return Observable.of(AuthResult.PasswordTooShort);
      } else if (errors.includes("Email has already been taken")) {
        return Observable.of(AuthResult.EmailAlreadyTaken);
      } else {
        return Observable.of(AuthResult.InternalServerIssue);
      }
    } else if (error.status == 503 || error.status == 0) {
      return Observable.of(AuthResult.ServerOffline);
    } else {
      return Observable.of(AuthResult.InternalServerIssue);
    }
  }

  public onLoginError(error): Observable<any> {
    if (error.status == 401) {
      return Observable.of(AuthResult.InvalidCredentials);
    } else if (error.status == 403) {
      return Observable.of(AuthResult.UserAccessForbidden);
    } else if (error.status == 404) {
      return Observable.of(AuthResult.UserDoesNotExist);
    } else if (error.status == 503 || error.status == 0) {
      return Observable.of(AuthResult.ServerOffline);
    } else if(error.status == 400){
      let errors: Array<string> = error.error.errors;
      if(errors.includes("There was an error with google. please try again.")){
        return Observable.of(AuthResult.GoogleError);
      }else{
        return Observable.of(AuthResult.InternalServerIssue);
      }
    }else {
      return Observable.of(AuthResult.InternalServerIssue);
    }
  }

  public onError(error): Observable<any> {
    if (error.status == 401) {
      return Observable.of(AuthResult.InvalidCredentials);
    } else if (error.status == 403) {
      return Observable.of(AuthResult.UserAccessForbidden);
    } else if (error.status == 404) {
      return Observable.of(AuthResult.UserDoesNotExist);
    } else if (error.status == 503 || error.status == 0) {
      return Observable.of(AuthResult.ServerOffline);
    } else {
      return Observable.of(AuthResult.InternalServerIssue);
    }
  }

  public setProfilePic(user: User) {
    let profile_pic_alt: string =
      user.first_name.substring(0, 1)
      + user.last_name.substring(0, 1);

    profile_pic_alt = profile_pic_alt.toUpperCase();

    localStorage.setItem(
      environment.storage.auth.profile_pic_alt,
      profile_pic_alt
    );
    localStorage.setItem(
      environment.storage.auth.firstName,
      user.first_name
    );
    localStorage.setItem(
      environment.storage.auth.lastName,
      user.last_name
    );
  }
}
