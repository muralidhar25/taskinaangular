import { Component, OnInit, OnDestroy, ElementRef } from "@angular/core";
import { BaseDialogComponent } from "src/app/shared/dialogs/BaseDialogComponent";
import { ISubscription } from "rxjs/Subscription";
import { Credential } from "./model";
import { SignupDialogService } from "./signup-dialog.service";
import { LoginDialogService } from "../login/login-dialog.service";
import { HeaderComponent } from "src/app/layouts/header/header.component";
import { AuthService, AuthResult } from "src/app/services/auth.service";
import { ProfileDialogService } from "../../shared/dialogs/Profile-dialog/profile-dialog.service";
import { AfterSignupService } from "./after-signup/after-signup-dialog.service";
import { EmailUtils } from '../../utils/email-utils';
import { SocialAuthService } from "./../social/social.auth.service";
import { FacebookLoginProvider } from "./../social/providers/facebook-login-provider";
import { GoogleLoginProvider } from "./../social/providers/google-login-provider";

@Component({
  selector: "taskina-signup",
  templateUrl: "./signup-dialog.component.html",
  styleUrls: ["./signup-dialog.component.scss"]
})
export class SignupDialogComponent extends BaseDialogComponent<Credential>
  implements OnDestroy {
  private dialogSub: ISubscription;
  private title: string;
  error: string = "";
  emailExist: boolean = false;
  success: string = "";
  submitted: boolean;

  constructor(
    el: ElementRef,
    private dialogSvc: SignupDialogService,
    private loginDialogSvc: LoginDialogService,
    private header: HeaderComponent,
    private authService: AuthService,
    private profileDialogService: ProfileDialogService,
    private afterSignupService: AfterSignupService,
    private socialAuthService: SocialAuthService
  ) {
    super(Credential, el, null);

    this.dialogSub = this.dialogSvc.showDialog$.subscribe(title => {
      this.title = title;
      this.showDialog();
    });
  }

  loginDialogLink() {
    this.hideDialog();
    this.loginDialogSvc.showDialog("Log in to your account");
  }

  ngOnDestroy() {
    if (this.dialogSub) {
      this.dialogSub.unsubscribe();
    }
  }

  signup(valid: boolean) {
    this.emailExist = false;
    let data = this.model;
    if (!data.email || !EmailUtils.validEmail(data.email)) {
      this.error = "Please enter a valid email address."
      return;
    } else if (!data.password || data.password.length < 6) {
      this.error = "Password is too short (minimum is 6 characters)."
      return;
    }
    this.error = "";
    this.success = "";
    this.submitted = true;
    this.authService
      .signup(data.email, data.password)
      .first()
      .subscribe(r => {
        this.onSignup(r, data)
      });

  }

  private socialLogin(authProvider) {

    this.error = "";
    this.success = "";
    this.submitted = true;

    let provider = "";
    if ('facebook' === authProvider) {
      provider = FacebookLoginProvider.PROVIDER_ID;
    } else if ('google' === authProvider) {
      provider = GoogleLoginProvider.PROVIDER_ID;
    }

    this.socialAuthService.signIn(provider).then(
      (userData) => {
        this.authService
          .socialAuth(userData, provider)
          .first()
          .subscribe(r => {
            this.onSignup(r, userData);
          });
      }
    );
  }


  private onSignup(result: AuthResult, data: any): void {
    this.submitted = false;
    if (result == AuthResult.Success) {
      this.error = null;
      this.emailExist = false;
      this.hideDialog();
      this.afterSignupService.showDialog(data);
    } else if (result == AuthResult.InvalidEmal) {
      this.error = "Please enter a valid email address.";
    } else if (result == AuthResult.EmailAlreadyTaken) {
      this.emailExist = true;
    } else if (result == AuthResult.PasswordTooShort) {
      this.error = "Password is too short (minimum is 6 characters).";
    } else if (result == AuthResult.GoogleError) {
      this.error = "There was an error with Google! Please try again.";
    } else if (result == AuthResult.InternalServerIssue) {
      this.error = "Internal server error. Please try again later.";
    } else if (result == AuthResult.ServerOffline) {
      this.error = "The server is offline. Please try again later.";
    }
  }
}
