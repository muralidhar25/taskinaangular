import { Component, ViewChild, OnDestroy, ElementRef, ɵConsole } from '@angular/core';
import { BaseDialogComponent } from '../BaseDialogComponent';
import { PostTaskDialog, Step1, Step2, Step3 } from './model';
import { ISubscription } from 'rxjs/Subscription';
import { PostTaskDialogService } from './post-task-dialog.service';
import { ProfileService } from '../../../services/profile.service';
import { ConfirmationDialogService } from '../confirmation-dialog/confirmation-dialog.service';
import { Router } from '@angular/router';
// import { ngfModule, ngf } from 'angular-file';

enum Steps {
  TaskTitleStep = 1,
  TaskTimeStep = 2,
  TaskPriceStep = 3,
  TaskPostedStep = 4,

}
@Component({
  selector: 'taskina-post-task-dialog',
  styleUrls: ['./style.scss'],
  templateUrl: './post-task-dialog.component.html'
})
export class PostTaskDialogComponent extends BaseDialogComponent<PostTaskDialog> implements OnDestroy {
  @ViewChild('focusable') focusable: ElementRef;
  public stepType = Steps;
  public currentStepNumber: number = 1;
  private dialogSub: ISubscription;
  public step1: Step1;
  public step2: Step2;
  public step3: Step3;
  maximumStep = 4;
  isLoaded: boolean = false;
  e: any;
  private title;
  constructor(el: ElementRef,
    private postTaskDialogSvc: PostTaskDialogService,
    private profileSvc: ProfileService,
    private confirmationSvc: ConfirmationDialogService,
    private router: Router) {

    super(PostTaskDialog, el, null);

    this.dialogSub = this.postTaskDialogSvc.showDialog$.subscribe(title => {
      this.title = title;
      localStorage.setItem('maximumStepCount', this.maximumStep.toString());
      this.currentStepNumber = 1;
      this.step1 = new Step1();
      this.step2 = new Step2();
      this.step3 = new Step3();
      this.showDialog();
    });

  }

  ngOnInit() {
    this.currentStepNumber = 1;

  }
  ngOnDestroy() {
    this.dialogSub.unsubscribe();
  }

  closeDialog() {
    if (localStorage.getItem('dialog-close') == "no") {
      this.hideDialog();
      localStorage.setItem('dialog-close', '');
    } else if (this.currentStepNumber == 4) {
      this.hideDialog();
      localStorage.setItem('dialog-close', '');
      this.router.navigate(['/tasks', 'posted', this.postTaskDialogSvc.slug]);
    } else {
      this.confirmationSvc.showDialog({
        title: 'Are you sure you want to leave?',
        message: 'Sorry to see you Go... You\'re almost done and it\'s free to post a task...',
        taskSlug: this.postTaskDialogSvc.slug ? this.postTaskDialogSvc.slug : null,
        buttonLeft: 'Continue',
        buttonRight: 'Discard & exit'
      });
    }

  }
  skip() {
    return this.dialogSub.closed;
  }
  get currentStep() {
    switch (this.currentStepNumber) {
      case 1:
        return Steps.TaskTitleStep;
      case 2:
        return Steps.TaskTimeStep;
      case 3:
        return Steps.TaskPriceStep;
      case 4:
        return Steps.TaskPostedStep;
    }
  }
  onStepChanged(difference: number) {
    if (this.currentStepNumber >= this.maximumStep && difference == -2) {
      this.currentStepNumber = this.maximumStep - 1;
    } else if (this.currentStepNumber >= this.maximumStep && difference == -1) {
      this.currentStepNumber = this.maximumStep;
    }
    else {
      this.currentStepNumber += difference;
    }
  }

}
