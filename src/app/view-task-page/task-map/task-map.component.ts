import { Component, Input, Output } from "@angular/core";


import { Router } from "@angular/router";
import { SubjectSubscriber } from "rxjs/internal/Subject";
import { ITaskResponse } from 'src/app/shared/dialogs/post-task-dialog/post-task-dialog.service';
import { ViewTaskService, IDisplayTask } from '../view-task-page.service';

@Component({
    selector: "task-map",
    templateUrl: "./task-map.component.html",
    styleUrls: ["../view-task-page.component.scss"]
})
export class MapComponent {

    @Input() taskData: IDisplayTask;

    constructor(
        private route: Router,
        private viewTaskSvc: ViewTaskService
    ) { }



    ngOnInit() { }
}
