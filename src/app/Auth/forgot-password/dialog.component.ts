import { Component, OnInit, ElementRef, OnDestroy, ViewChild } from '@angular/core';
import { ISubscription } from 'rxjs/Subscription';
import { BaseDialogComponent } from '../../shared/dialogs/BaseDialogComponent';
import { ForgotPasswordDialog } from './model';
import { ForgotDialogService } from './dialog.service';
import { SignupDialogService } from '../signup/signup-dialog.service';
import { NgForm } from '@angular/forms';
import { AuthService, AuthResult } from '../../services/auth.service';
import { environment } from '../../../environments/environment';
import { Router } from '@angular/router'
import 'rxjs/add/operator/first';
import { LoginDialogService } from '../login/login-dialog.service';
@Component({
  selector: 'forgot-password',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss']
})
export class ForgotDialogComponent extends BaseDialogComponent<ForgotPasswordDialog> implements OnDestroy {
  @ViewChild('focusable') focusable: ElementRef;
  private dialogSub: ISubscription;
  private title: string;
  private error: string = null;
  constructor(el: ElementRef,
    private dialogSvc: ForgotDialogService,
    private loginDialogSvc: LoginDialogService,
    private authService: AuthService,
    private router: Router) {

    super(ForgotPasswordDialog, el, null);

    this.dialogSub = this.dialogSvc.showDialog$.subscribe(title => {
      this.title = title;
      this.error = null;
      this.buildModel();
    });
  }

  ngOnDestroy() {
    if (this.dialogSub) {
      this.dialogSub.unsubscribe();
    }
  }

  onSend(form: NgForm) {

    if (!form.valid) {
      this.focusable.nativeElement.focus();
      return;
    }

    this.authService.forgotPassword(this.model.email).first().subscribe(x => {
      this.error = null;
      if (x && x.includes('Email not present')) {
        this.error = 'Email doesn\'t exist';
      } else {
        this.submitted = true;
      }
    });
  }

  private buildModel() {
    this.model = this.newModel();
    this.submitted = false;
    this.showDialog();
  }

  loginDialogLink() {

    this.hideDialog();
    this.loginDialogSvc.showDialog('Log in to your account');
  }

}
