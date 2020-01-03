import { Component, ElementRef, OnDestroy } from "@angular/core";
import { Router } from "@angular/router";
import "rxjs/add/operator/first";
import { ISubscription } from "rxjs/Subscription";
import { PostTaskDialogService } from 'src/app/shared/dialogs/post-task-dialog/post-task-dialog.service';
import { AuthResult, AuthService } from "../../services/auth.service";
import { BaseDialogComponent } from "../../shared/dialogs/BaseDialogComponent";
import { EmailUtils } from "../../utils/email-utils";
import { ForgotDialogService } from "../forgot-password/dialog.service";
import { SignupDialogService } from "../signup/signup-dialog.service";
import { LoginDialogService } from "./login-dialog.service";
import { LoginDialog } from "./model";
import { SocialAuthService } from "./../social/social.auth.service";
import { FacebookLoginProvider } from "./../social/providers/facebook-login-provider";
import { GoogleLoginProvider } from "./../social/providers/google-login-provider";
@Component({
  selector: "taskina-login",
  templateUrl: "./login-dialog.component.html",
  styleUrls: ["./login-dialog.component.scss"]
})
export class LoginDialogComponent extends BaseDialogComponent<LoginDialog>
  implements OnDestroy {
  private dialogSub: ISubscription;
  private title: string;
  credentials: LoginDialog = new LoginDialog();
  error: string;
  success: string;
  submitted: boolean;
  constructor(
    el: ElementRef,
    private dialogSvc: LoginDialogService,
    private signupdialogSvc: SignupDialogService,
    private authService: AuthService,
    private forgortDialogSvc: ForgotDialogService,
    private router: Router,
    private postTaskSvc: PostTaskDialogService,
    private socialAuthService: SocialAuthService
  ) {
    super(LoginDialog, el, null);

    this.dialogSub = this.dialogSvc.showDialog$.subscribe(title => {
      this.title = title;
      this.showDialog();
    });
  }

  signupDialogLink() {
    this.hideDialog();
    this.signupdialogSvc.showDialog("Join Us");
  }

  login(valid: boolean) {
    if (
      !this.credentials.email ||
      !EmailUtils.validEmail(this.credentials.email)
    ) {
      this.error = "Please enter a valid email address.";
      return;
    } else if (
      !this.credentials.password ||
      this.credentials.password.length < 6
    ) {
      this.error = "Password is too short (minimum is 6 characters).";
      return;
    }

    this.error = "";
    this.success = "";
    this.submitted = true;
    this.authService
      .login(this.credentials.email, this.credentials.password)
      .first()
      .subscribe(r => {
        this.onLogin(r);
      });
  }

  private onLogin(result: AuthResult): void {
    this.submitted = false;

    if (result == AuthResult.Success) {
      let dlgToShow = localStorage.getItem('dialogToshow');
      this.error = null;
      this.hideDialog();
      this.router.navigate(['/dashboard']);
      if (dlgToShow == 'postTask') {
        this.postTaskSvc.showDialog('Tell us what you need done?');
      }
      if (dlgToShow == 'browseTask') {
        this.router.navigateByUrl("/browse-tasks");
      }


      // this.router.navigateByUrl("/dashboard");
    } else if (result == AuthResult.InvalidCredentials) {
      this.error = "Email and password doesn't match.";
    } else if (result == AuthResult.UserAccessForbidden) {
      this.error = "Unauthorized user access! Please contact support.";
    } else if (result == AuthResult.UserDoesNotExist) {
      this.error = "User doesn't exist! Please Join Us first.";
    } else if (result == AuthResult.GoogleError) {
      this.error = "There was an error with Google! Please try again.";
    } else if (result == AuthResult.InternalServerIssue) {
      this.error = "Internal server error. Please try again later.";
    } else if (result == AuthResult.ServerOffline) {
      this.error = "The server is offline. Please try again later.";
    }
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
            this.onLogin(r);
          });
      }
    );
  }

  forgotPasword() {
    this.hideDialog();
    this.forgortDialogSvc.showDialog("Forgot Your Password?");
  }
  ngOnDestroy() {
    if (this.dialogSub) {
      this.dialogSub.unsubscribe();
    }
  }
}
