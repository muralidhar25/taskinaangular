import { Component, OnInit, ElementRef, OnDestroy, ViewChild } from '@angular/core';
import { ISubscription } from 'rxjs/Subscription';
import { BaseDialogComponent } from '../BaseDialogComponent';
import { ConfirmationDialog } from './model';
import { ConfirmationDialogService } from './confirmation-dialog.service';
import { NgForm } from '@angular/forms';
import * as $ from 'jquery'
import { Router } from '@angular/router'
import 'rxjs/add/operator/first';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'confirmation-dialog',
  templateUrl: './confirmation-dialog.component.html',
  styleUrls: ['./dialog.component.scss']
})
export class ConfirmationDialogComponent extends BaseDialogComponent<ConfirmationDialog> implements OnDestroy {
  @ViewChild('focusable') focusable: ElementRef;
  private dialogSub: ISubscription;
  private obj: any;
  constructor(el: ElementRef,
    private dialogSvc: ConfirmationDialogService,
    private router: Router,
    private authService: AuthService) {

    super(ConfirmationDialog, el, null);

    this.dialogSub = this.dialogSvc.showDialog$.subscribe(obj => {
      this.obj = obj;
      this.buildModel();
    });
  }

  ngOnDestroy() {
    if (this.dialogSub) {
      this.dialogSub.unsubscribe();
    }
  }

  protected onSend(form: NgForm) {
    if (!form.valid) {
      this.focusable.nativeElement.focus();
      return;
    }
  }

  leaveOperation() {
    if(this.obj && this.obj.taskSlug){
      this.dialogSvc.deleteTask(this.obj.taskSlug)
      .first()
      .subscribe(res => res);
    }else if(this.obj.userSign){
      this.authService.logout();
    }
    localStorage.setItem('dialog-close', "no");
    this.hideDialog();
    $('#closeButton').click();

  }
  private buildModel() {
    this.model = this.newModel();
    this.submitted = false;
    this.showDialog();
  }

}
