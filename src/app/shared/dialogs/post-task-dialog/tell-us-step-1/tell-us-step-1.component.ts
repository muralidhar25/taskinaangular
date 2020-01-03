import { Component, ElementRef, Input } from '@angular/core';
import { NgForm } from '@angular/forms';
import { BaseStepComponent } from '../../stepCount/model';
import { Step1 } from '../model';
import { PostTaskDialogService } from '../post-task-dialog.service';
// import { ngfModule, ngf } from 'angular-file';


@Component({
  selector: 'tell-us-step',
  styleUrls: ['../style.scss'],
  templateUrl: './tell-us-step-1.component.html'
})
export class TellUsStepComponent extends BaseStepComponent {

  @Input() tasks: Step1;
  slug: string;
  public ngForm: NgForm = null;
  valid: boolean = true;
  constructor(el: ElementRef, private taskSvc: PostTaskDialogService) {
    super();
  }
  onSendData(form: NgForm) {
    ///API CALL

    this.tasks.taskTitle = this.tasks.taskTitle.trim();
    this.tasks.taskDetails = this.tasks.taskDetails.trim();
    
    if (form.invalid || this.tasks.taskDetails === "" || this.tasks.taskTitle === "") {
      this.valid = false;
      return;
    }
    this.taskSvc
      .tasksTitle(this.tasks.taskTitle, this.tasks.taskDetails)
      .first()
      .subscribe(res => res);


    this.onNextStep();
  }

}