import { Component, ViewChild, OnDestroy, ElementRef, ɵConsole } from '@angular/core';
import { BaseDialogComponent } from '../BaseDialogComponent';
import { ProfileDialog } from './model';
import { ISubscription } from 'rxjs/Subscription';
import { ProfileDialogService } from './profile-dialog.service';
import { ProfileService } from '../../../services/profile.service';
import { Router } from "@angular/router";


enum Steps {
  Profile1 = 1,
  Profile2 = 2,
  Profile3 = 3,
  Profile4 = 4,
  Profile5 = 5,
  Profile6 = 6
}
@Component({
  selector: 'taskina-profile-dialog',
  styleUrls: ['./style.scss'],
  templateUrl: './profile.component.html'
})
export class ProfileDialogComponent extends BaseDialogComponent<ProfileDialog> implements OnDestroy {
  @ViewChild('focusable') focusable: ElementRef;
  public stepType = Steps;
  public currentStepNumber: number = 1;
  private dialogSub: ISubscription;
  maximumStep = 6;
  isLoaded: boolean = false;
  e: any;
  private title;
  constructor(el: ElementRef,
    private profileDialogSvc: ProfileDialogService,
    private profileSvc: ProfileService,
    private router: Router) {
    super(ProfileDialog, el, null);
    this.dialogSub = this.profileDialogSvc.showDialog$.subscribe(title => {
      this.title = title;
      this.currentStepNumber = 1;
      localStorage.setItem('maximumStepCount', this.maximumStep.toString());
      this.showDialog();
    });

  }
  ngOnInit() {
  }
  ngOnDestroy() {

  }


  skip() {
    return this.dialogSub.closed;
  }

  get currentStep() {
    switch (this.currentStepNumber) {
      case 1:
        return Steps.Profile1;
      case 2:
        return Steps.Profile2;
      case 3:
        return Steps.Profile3;
      case 4:
        return Steps.Profile4;
      case 5:
        return Steps.Profile5;
      case 6:
        return Steps.Profile6;
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

  closeDialog(){
    this.dialogVisible = false;
    this.router.navigate(["/dashboard"]);
  }

}
