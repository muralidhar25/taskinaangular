import { Component } from "@angular/core";
import { PostTaskDialogService } from '../../dialogs/post-task-dialog/post-task-dialog.service';




@Component({
    selector: "task-norecord",
    templateUrl: "./task-norecord.component.html"
})
export class TaskNorecordComponent {

    constructor(private postTaskSvc: PostTaskDialogService) { }

    ngOnChanges() {
    }

    postTaskDialog() {
        this.postTaskSvc.showDialog("Tell us what you need done?");
    }
}
