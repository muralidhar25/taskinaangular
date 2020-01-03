import { Component, ElementRef, ViewChild, Output, EventEmitter } from "@angular/core";
import { Router } from "@angular/router";
import { ModalDirective } from 'ngx-bootstrap';
import { ViewTaskService } from "src/app/view-task-page/view-task-page.service";
import { BaseStepComponent } from "../../stepCount/model";
import { PostTaskDialogService } from "../post-task-dialog.service";
import * as dialogutils from '../../../dialogs/dialogs-utils';



@Component({
  selector: "task-posted-step",
  styleUrls: ["../style.scss"],
  templateUrl: "./task-posted-step-4.component.html"
})
export class TaskPostedStepComponent extends BaseStepComponent {
  @ViewChild(ModalDirective) modal: ModalDirective;

  public slug: string;
  @Output() onHideDialog = new EventEmitter<boolean>();


  constructor(
    el: ElementRef,
    private postTaskSvc: PostTaskDialogService,
    private viewTaskSvc: ViewTaskService,
    private router: Router
  ) {
    super();
    this.slug = this.postTaskSvc.slug;

  }
  onTaskViewPage(slug: string) {
    this.viewTaskSvc.taskDisplay(slug);
  }

  hideDialog() {
    dialogutils.addScrolling();
    this.onHideDialog.emit(true);
    this.router.navigate(['/tasks', 'posted', this.slug]);
  }

}

